import { User } from "../models/user";

export const getCurrentUser = async () => {
  const response = await fetch(`/api/auth/me`, {
    credentials: "include",
  });

  if (response.status !== 200) {
    throw await response.json();
  }

  const body = await response.json();

  return User.fromJson(body.data);
};

/**
 *
 * @param {string} username
 * @param {string} password
 */
export const loginUser = async (username, password) => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const response = await fetch(`/api/auth/login`, {
    credentials: "include",
    headers,
    method: "POST",
    body: JSON.stringify({
      username,
      password,
    }),
  });

  let body;

  try {
    body = await response.json();
  } catch (_) {
    throw new Error("UNHANDLED_ERROR");
  }

  if (response.status !== 200) {
    throw new Error(body.message);
  }
};

export const logoutUser = async () => {
  const response = await fetch(`/api/auth/logout`, {
    method: "DELETE",
    credentials: "include",
  });

  if (response.status !== 204) {
    throw new Error("Could not logout");
  }
};

/**
 *
 */
export const signUpUser = async (userData) => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const response = await fetch(`/api/auth/signup`, {
    credentials: "include",
    headers,
    method: "POST",
    body: JSON.stringify(userData),
  });

  let body;

  try {
    body = await response.json();
  } catch (_) {
    throw new Error("UNHANDLED_ERROR");
  }

  if (response.status !== 200) {
    throw new Error(body.message);
  }
};
