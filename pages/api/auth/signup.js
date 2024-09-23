import { createUser } from "../../../lib/auth/user";
import getDbConnection from "../../../lib/provider/db";

/**
 *
 * @param {import('@vercel/node').VercelRequest} request
 * @param {import('@vercel/node').VercelResponse} response
 * @returns
 */
export default async function signup(request, response) {
  if (parseInt(process.env.NEXT_PUBLIC_ENABLE_SIGNUP)) {
    const connectorPromise = getDbConnection();
    try {
      await createUser(connectorPromise, request.body);
      response.redirect("/api/auth/login");
    } catch (error) {
      console.error(error);
      response.status(500).json({
        message: error.message,
      });
    }
  } else {
    response
      .status(500)
      .json({ message: "Sign up not available at the moment" });
  }
}
