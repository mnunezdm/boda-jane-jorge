import crypto from "crypto";

import { User } from "../db/user";
import { getLoginSession, UnknownUser } from "./auth";

export async function createUser({ username, password, firstName, lastName }) {
  // Here you should create the user and save the salt and hashed password (some dbs may have
  // authentication methods that will do it for you so you don't have to worry about it):
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");

  const user = Object.assign(new User(), {
    username,
    password: hash,
    firstName,
    lastName,
    salt,
  });

  // This is an in memory store for users, there is no data persistence without a proper DB

  await user.insert();

  return { username, createdAt: Date.now() };
}

export function validatePassword(user, inputPassword) {
  const inputHash = crypto
    .pbkdf2Sync(inputPassword, user.salt, 1000, 64, "sha512")
    .toString("hex");
  return user.password === inputHash;
}

export async function getCurrentUser(request) {
  const session = await getLoginSession(request);

  const user = (session && (await User.fromUsername(session.username))) ?? null;

  if (!user) {
    throw new UnknownUser(`Could not find user with name ${session.username}`);
  }

  return user;
}
