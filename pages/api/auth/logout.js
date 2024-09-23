import { removeTokenCookie } from "../../../lib/auth/auth-cookies";

/**
 *
 * @param {import('@vercel/node').VercelRequest} _
 * @param {import('@vercel/node').VercelResponse} response
 * @returns
 */
export default async function logout(_, response) {
  removeTokenCookie(response);
  response.status(204).end();
}
