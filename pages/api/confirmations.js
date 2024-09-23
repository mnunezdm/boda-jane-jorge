import {
  Confirmation,
  Confirmations,
  MissingRequiredFieldsError,
} from "../../lib/db/confirmation";
import { getCurrentUser } from "../../lib/auth/user.js";
import {
  InvalidTokenError,
  NoAuthenticationProvidedError,
} from "../../lib/auth/auth.js";
import { removeTokenCookie } from "../../lib/auth/auth-cookies.js";

/**
 *
 * @param {import('@vercel/node').VercelRequest} request
 * @param {import('@vercel/node').VercelResponse} response
 * @returns
 */
export default async function confirmations(request, response) {
  const { method } = request;
  switch (method) {
    case "GET":
      try {
        // assure user is connected
        await getCurrentUser(request);
        response.statusCode = 200;
        response.json(await Confirmations.getConfirmations());
      } catch (e) {
        if (e instanceof InvalidTokenError) {
          removeTokenCookie(response);
          response.status(403).json({
            message: "Invalid credential token, deleting it",
          });
        } else if (e instanceof NoAuthenticationProvidedError) {
          response.status(403).json({
            code: "NOT_AUTHENTICATED",
            message: "Need to be logged in to get confirmations",
          });
        } else {
          console.error(e);
          response.status(500).json({
            message: "An error occurred while connecting to the database",
          });
        }
      }
      break;
    case "POST":
      const { body } = request;

      try {
        Confirmation.validate(body);
        const confirmation = Confirmation.fromJson(body);

        await confirmation.insert();
        response.statusCode = 201;
        response.json(confirmation);
      } catch (e) {
        console.error(e);
        if (e instanceof MissingRequiredFieldsError) {
          response.status(400).json({
            message: e.message,
            fields: e.fields,
          });
        } else {
          response.status(500).json({
            message: "An error occurred while connecting to the database",
          });
        }
      }
      break;
    default:
      response.setHeader("Allow", ["GET", "PUT"]);
      response.status(405).end(`Method ${method} Not Allowed`);
  }
}
