import {
  Confirmation,
  Confirmations,
  MissingRequiredFieldsError,
} from "../../lib/db/confirmation.js";
import { getCurrentUser } from "../../lib/auth/user.js";
import {
  InvalidTokenError,
  NoAuthenticationProvidedError,
} from "../../lib/auth/auth.js";
import { removeTokenCookie } from "../../lib/auth/auth-cookies.js";
import { NextResponse, type NextRequest } from "next/server.js";

export async function GET(request: NextRequest) {
  try {
    // assure user is connected
    await getCurrentUser(request);

    return NextResponse.json(await Confirmations.getConfirmations(), {
      status: 200,
    });
  } catch (e) {
    if (e instanceof InvalidTokenError) {
      removeTokenCookie(NextResponse.next());

      return NextResponse.json(
        {
          message: "Invalid credential token, deleting it",
        },
        {
          status: 200,
        }
      );
    } else if (e instanceof NoAuthenticationProvidedError) {
      return NextResponse.json(
        {
          code: "NOT_AUTHENTICATED",
          message: "Need to be logged in to get confirmations",
        },
        {
          status: 403,
        }
      );
    } else {
      return NextResponse.json(
        {
          message: "An error occurred while connecting to the database",
        },
        {
          status: 500,
        }
      );
    }
  }
}

export async function POST(request: NextRequest) {
  const { body } = request;

  try {
    Confirmation.validate(body);
    const confirmation = Confirmation.fromJson(body);

    await confirmation.insert();

    return NextResponse.json(confirmation, { status: 201 });
  } catch (e) {
    console.error(e);
    if (e instanceof MissingRequiredFieldsError) {
      return NextResponse.json(
        {
          message: e.message,
          fields: e.fields,
        },
        { status: 400 }
      );
    } else {
      return NextResponse.json(
        {
          message: "An error occurred while connecting to the database",
        },
        { status: 500 }
      );
    }
  }
}
