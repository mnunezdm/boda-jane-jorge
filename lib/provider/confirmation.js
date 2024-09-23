import { Confirmations } from "../controllers/confirmation";

/**
 *
 * @returns {Confirmations}
 */
export const getConfirmations = async () => {
  const requestOptions = {
    method: "GET",
    credentials: "include",
    redirect: "follow",
  };

  const response = await fetch(`/api/confirmations`, requestOptions);

  if (response.status === 200) {
    const body = await response.json();
    return Confirmations.fromJson(body);
  } else if (response.status === 403) {
    const body = await response.json();
    throw new UnauthenticatedUser(body.code);
  } else {
    const body = await response.text();
    throw new Error(body);
  }
};

/**
 *
 * @param {import("../controllers/confirmation").Confirmation} confirmation
 */
export const createConfirmation = async (confirmation) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(confirmation),
    redirect: "follow",
  };

  const response = await fetch(`/api/confirmations`, requestOptions);
  const responseBody = await response.json();

  if (response.status !== 201) {
    throw new Error(
      responseBody?.message ||
        "An error occured while creating confirmation, please try again"
    );
  }

  return responseBody;
};

export class UnauthenticatedUser extends Error {}
