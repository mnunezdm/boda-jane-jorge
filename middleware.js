import { NextResponse } from "next/server";

import { getTokenCookieMiddleware } from "./src/lib/auth/auth-cookies";

const LOCATIONS = {
  admin: "admin",
  login: "login",
};

const META_PATTERN = new URLPattern({ pathname: `/images/*` });

const PATTERNS = Object.keys(LOCATIONS).map((key) => [
  new URLPattern({ pathname: `/${LOCATIONS[key]}` }),
  () => ({ location: LOCATIONS[key] }),
]);

const params = (url) => {
  const input = url.split("?")[0];
  let result = {};

  for (const [pattern, handler] of PATTERNS) {
    const patternResult = pattern.exec(input);
    if (patternResult !== null && "pathname" in patternResult) {
      result = handler(patternResult);
      break;
    }
  }
  return result;
};

/**
 *
 * @param {import('next/server').NextRequest} request
 * @param {import('next/server').NextFetchEvent} event
 * @returns
 */
export function middleware(request) {
  let next = NextResponse.next();
  if (META_PATTERN.exec(request.url)) return next;

  const { location } = params(request.url);
  const token = getTokenCookieMiddleware(request);

  switch (location) {
    case LOCATIONS.admin:
      if (!token) {
        next = NextResponse.redirect(
          new URL(`/${LOCATIONS.login}?redirect=${location}`, request.url)
        );
      }
      break;
    case LOCATIONS.login:
      if (token) {
        const redirecTo =
          request.nextUrl.searchParams.get("redirect") || LOCATIONS.admin;
        next = NextResponse.redirect(new URL(`/${redirecTo}`, request.url));
      }
      break;
  }
  return next;
}
