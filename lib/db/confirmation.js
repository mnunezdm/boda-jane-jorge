import { BaseDbObject } from "./base";

import { sql } from "@vercel/postgres";

export class Confirmation extends BaseDbObject {
  constructor() {
    super();
    this.confirmationMembers = [];
  }

  static get table() {
    return "confirmation";
  }

  static get fields() {
    return {
      id: {
        type: Number,
        serializable: true,
      },
      needBusToCity: {
        type: Boolean,
        sqlField: "need_bus_to_city",
        insertable: true,
        serializable: true,
        serialize: (value) => (value && 1) || 0,
      },
      needBusToRestaurant: {
        type: Boolean,
        sqlField: "need_bus_to_restaurant",
        insertable: true,
        serializable: true,
        serialize: (value) => (value && 1) || 0,
      },
      createdDate: {
        type: Date,
        sqlField: "created_date",
        insertable: false,
        serializable: true,
      },
      extraInformation: {
        type: String,
        sqlField: "extra_information",
        insertable: true,
        serializable: true,
      },
      mustHaveSong: {
        type: String,
        sqlField: "must_have_song",
        insertable: true,
        serializable: true,
      },
    };
  }

  static fromJson(data) {
    const confirmation = Object.assign(new Confirmation(), data);
    confirmation.confirmationMembers = data.confirmationMembers.map((member) =>
      Object.assign(new ConfirmationMember(), member)
    );
    return confirmation;
  }

  static createNew(data) {
    const confirmation = Confirmation.fromJson(data);
    confirmation.createdDate = new Date();
    return confirmation;
  }

  async insert() {
    await super.insert();

    await Promise.all(
      this.confirmationMembers.map((member) => {
        member.confirmationId = this.id;
        return member.insert();
      })
    );
  }

  static fromRow(payload) {
    const confirmation = new Confirmation();
    confirmation.fromRow(payload);
    return confirmation;
  }

  static validate(payload) {
    const fields = [];
    console.log(payload);

    if (!payload?.confirmationMembers[0]?.firstName.trim()) {
      fields.push("firstName");
    }
    if (!payload?.confirmationMembers[0]?.lastName.trim()) {
      fields.push("lastName");
    }

    if (fields.length) {
      throw new MissingRequiredFieldsError(fields);
    }
  }
}

export class ConfirmationMember extends BaseDbObject {
  static get table() {
    return "confirmation_member";
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
      confirmationId: {
        type: String,
        sqlField: "confirmation_id",
        insertable: true,
        serializable: true,
      },
    };
  }

  static fromRow(payload) {
    const confirmationMember = new ConfirmationMember();
    confirmationMember.fromRow(payload);
    return confirmationMember;
  }
}

export class Confirmations extends Array {
  /**
   * devuelve una lista de confirmaciones
   * @param {*} dbConnector
   * @returns {Promise<Confirmations>}
   */
  static async getConfirmations() {
    const { rows } = await sql.query(
      "SELECT confirmation.id confirmation_id, confirmation.created_date confirmation_created_date, confirmation.need_bus_to_city confirmation_need_bus_to_city, confirmation.need_bus_to_restaurant confirmation_need_bus_to_restaurant, confirmation.extra_information confirmation_extra_information, confirmation.must_have_song confirmation_must_have_song, confirmation_member.id member_id, confirmation_member.first_name member_first_name, confirmation_member.last_name member_last_name, confirmation_member.confirmation_id member_confirmation_id FROM confirmation LEFT OUTER JOIN confirmation_member ON confirmation.id = confirmation_member.confirmation_id ORDER BY confirmation.created_date DESC;"
    );

    const confirmations = new Map();
    for (let row of rows) {
      const id = row.confirmation_id;

      if (!confirmations.has(id)) {
        const confirmationFields = Object.keys(row)
          .filter((key) => key.startsWith("confirmation_"))
          .reduce(
            (o, key) => ({
              ...o,
              [key.replace("confirmation_", "")]: row[key],
            }),
            {}
          );

        confirmations.set(id, Confirmation.fromRow(confirmationFields));
      }

      const confirmationMemberFields = Object.keys(row)
        .filter((key) => key.startsWith("member_"))
        .reduce(
          (o, key) => ({ ...o, [key.replace("member_", "")]: row[key] }),
          {}
        );

      confirmations
        .get(id)
        .confirmationMembers.push(
          ConfirmationMember.fromRow(confirmationMemberFields)
        );
    }

    return [...confirmations.values()];
  }
}

export class MissingRequiredFieldsError extends Error {
  constructor(fields) {
    super(`Missing required fields: ${fields.join(", ")}`);
    this.fields = fields;
  }
}
