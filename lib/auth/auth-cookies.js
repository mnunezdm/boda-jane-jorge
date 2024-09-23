import { serialize, parse } from "cookie";

export const TOKEN_NAME = "token";

export const MAX_AGE = 60 * 60 * 8; // 8 hours

export function setTokenCookie(res, token, cookieName = TOKEN_NAME) {
  const cookie = serialize(cookieName, token, {
    maxAge: MAX_AGE,
    expires: new Date(Date.now() + MAX_AGE * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
  });

  res.setHeader("Set-Cookie", cookie);
}

export function removeTokenCookie(res, cookieName = TOKEN_NAME) {
  const cookie = serialize(cookieName, "", {
    maxAge: -1,
    path: "/",
  });

  res.setHeader("Set-Cookie", cookie);
}

export function parseCookies(req, cookieName = TOKEN_NAME) {
  // For API Routes we don't need to parse the cookies.
  if (req.cookies[cookieName]) return req.cookies;

  // For pages we do need to parse the cookies.
  const cookie = req.headers?.cookie;
  return parse(cookie || "");
}

export function getTokenCookie(req, cookieName = TOKEN_NAME) {
  const cookies = parseCookies(req);
  return cookies[cookieName];
}

export function setTokenCookieMiddleware(
  response,
  token,
  cookieName = TOKEN_NAME
) {
  response.cookies.set(cookieName, token, {
    maxAge: MAX_AGE,
    expires: new Date(Date.now() + MAX_AGE * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
  });
}

export function removeTokenCookieMiddleware(response, cookieName = TOKEN_NAME) {
  response.cookies.delete(cookieName);
}

export function getTokenCookieMiddleware(request, cookieName = TOKEN_NAME) {
  // For API Routes we don't need to parse the cookies.
  if (!request.cookies.getWithOptions) return;
  const { value } = request.cookies.getWithOptions(cookieName);
  if (value) return value;

  // For pages we do need to parse the cookies.
  return request.headers?.cookie;
}
