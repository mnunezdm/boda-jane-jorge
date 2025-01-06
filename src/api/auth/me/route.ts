import {
  InvalidTokenError,
  NoAuthenticationProvidedError,
} from "../../../lib/auth/auth";

import { removeTokenCookie } from "../../../lib/auth/auth-cookies";
import { getCurrentUser } from "../../../lib/auth/user";

/**
 *
 * @param {import('@vercel/node').VercelRequest} _
 * @param {import('@vercel/node').VercelResponse} response
 * @returns
 */
export default async function me(request, response) {
  try {
    const user = await getCurrentUser(request);

    response.status(200).json({ data: user.toJson(), isLogged: true });
  } catch (error) {
    if (error instanceof InvalidTokenError) {
      console.error("error: detected invalid cookie, clearing it");
      removeTokenCookie(response);
      response.status(403).json({
        message: "Authentication token is invalid, please sign in again",
      });
    } else if (error instanceof NoAuthenticationProvidedError) {
      response.status(403).json({
        message: "No authentication provided",
      });
    } else {
      console.error(error);
      response.status(500).json({
        message: "An error occured while retrieving current user",
      });
    }
  }
}
