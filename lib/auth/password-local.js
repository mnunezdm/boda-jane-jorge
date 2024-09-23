import Local from "passport-local";
import { validatePassword } from "./user";
import { User } from "../db/user";

export const localStrategy = new Local.Strategy((username, password, done) => {
  User.fromUsername(username)
    .then((user) => {
      if (user && validatePassword(user, password)) {
        done(null, user);
      } else {
        done(
          new InvalidPasswordError("Invalid username and password combination")
        );
      }
    })
    .catch((error) => {
      done(error);
    });
});

export class InvalidPasswordError extends Error {}
