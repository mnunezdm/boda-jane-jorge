import { BaseDbObject } from "./base";

export class User extends BaseDbObject {
  static get table() {
    return "user_";
  }

  static get fields() {
    return {
      id: {
        type: Number,
        serializable: true,
      },
      firstName: {
        type: String,
        sqlField: "first_name",
        insertable: true,
        serializable: true,
      },
      lastName: {
        type: String,
        sqlField: "last_name",
        insertable: true,
        serializable: true,
      },
      username: {
        type: String,
        sqlField: "username",
        insertable: true,
        serializable: true,
      },
      password: {
        type: String,
        sqlField: "password",
        insertable: true,
      },
      salt: {
        type: String,
        sqlField: "salt",
        insertable: true,
      },
    };
  }

  static async fromUsername(db, username) {
    const dbConnection = await db;
    const user = new User();
    user.username = username;
    await user.fetch(dbConnection, User.fields.username.sqlField);
    return user;
  }
}
