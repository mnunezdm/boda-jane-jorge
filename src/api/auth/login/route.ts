import passport from "passport";
import nextConnect from "next-connect";
import {
  localStrategy,
  InvalidPasswordError,
} from "../../../lib/auth/password-local";
import { setLoginSession } from "../../../lib/auth/auth";

import { ResourceNotFoundError } from "../../../lib/db/base";

const authenticate = (method, request, response) =>
  new Promise((resolve, reject) => {
    passport.authenticate(method, { session: false }, (error, token) => {
      if (error) {
        reject(error);
      } else {
        resolve(token);
      }
    })(request, response);
  });

passport.use(localStrategy);

export default nextConnect()
  .use(passport.initialize())
  .post(async (request, response) => {
    try {
      const user = await authenticate("local", request, response);
      // session is the payload to save in the token, it may contain basic info about the user
      const session = { ...user };

      await setLoginSession(response, session);

      response.status(200).json({ done: true });
    } catch (error) {
      console.error(error);
      if (
        error instanceof ResourceNotFoundError ||
        error instanceof InvalidPasswordError
      ) {
        response.status(401).json({ message: "Invalid username or password" });
      } else {
        response.status(401).json({ message: error.message });
      }
    }
  });
