import Iron from "@hapi/iron";
import { MAX_AGE, setTokenCookie, getTokenCookie } from "./auth-cookies";

const TOKEN_SECRET = process.env.TOKEN_SECRET;

export async function setLoginSession(response, session) {
  const createdAt = Date.now();
  // Create a session object with a max age that we can validate later
  const obj = { ...session, createdAt, maxAge: MAX_AGE };
  const token = await Iron.seal(obj, TOKEN_SECRET, Iron.defaults);

  setTokenCookie(response, token);
}

export async function getLoginSession(request) {
  const token = getTokenCookie(request);

  if (!token) {
    throw new NoAuthenticationProvidedError();
  }

  let session;
  try {
    session = await Iron.unseal(token, TOKEN_SECRET, Iron.defaults);
  } catch (error) {
    throw new InvalidTokenError(error.message);
  }

  const expiresAt = session.createdAt + session.maxAge * 1000;

  // Validate the expiration date of the session
  if (Date.now() > expiresAt) {
    throw new ExpiredTokenError();
  }

  if (!session?.username) {
    throw new InvalidTokenError(`Invalid session token`);
  }

  return session;
}

export class NotAuthenticatedError extends Error {}
export class NoAuthenticationProvidedError extends NotAuthenticatedError {}
export class InvalidTokenError extends NotAuthenticatedError {}
export class UnknownUser extends InvalidTokenError {}
export class ExpiredTokenError extends InvalidTokenError {}
