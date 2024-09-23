import { DateTime } from "luxon";
import { writeFileXLSX, utils } from "xlsx";

import { normalizeText } from "normalize-text";

export class Confirmation {
  /**
   * @type {string}
   */
  get relativeCreatedDate() {
    return DateTime.fromISO(this.createdDate).toRelativeCalendar();
  }

  /**
   * @type {string}
   */
  get formattedCreatedDate() {
    return DateTime.fromISO(this.createdDate)
      .setLocale("es")
      .toFormat("dd 'de' MMMM");
  }

  toJson() {
    return {
      NOMBRE: this.confirmationMembers[0].name,
      "FECHA CONFIRMACIÓN": new Date(this.createdDate),
      "AUTOBUS DE VUELTA": Boolean(this.needBusToCity),
      "AUTOBUS DE IDA": Boolean(this.needBusToRestaurant),
      CANCIÓN: this.mustHaveSong,
      DETALLES: this.extraInformation,
    };
  }

  /**
   * @param {ConfirmationInterface} confirmationData
   * @returns {Confirmation}
   */
  static fromJson(confirmationData) {
    const confirmation = Object.assign(new Confirmation(), confirmationData);

    confirmation.confirmationMembers = ConfirmationMembers.fromJson(
      confirmationData.confirmationMembers
    );

    return confirmation;
  }

  static fromState(state) {
    const confirmation = new Confirmation();

    confirmation.confirmationMembers = [
      {
        firstName: state.firstName.trim(),
        lastName: state.lastName.trim(),
      },
    ];

    confirmation.needBusToCity = state.needBusToCity;
    confirmation.needBusToRestaurant = state.needBusToRestaurant;
    confirmation.extraInformation = state?.extraInformation?.trim();
    confirmation.mustHaveSong = state?.mustHaveSong?.trim();

    return confirmation;
  }

  /**
   *
   * @param {string} text
   * @returns {boolean}
   */
  matchesText(text) {
    let normalizedSearch = normalizeText(text);
    return this.confirmationMembers.some((member) =>
      member.normalizedName.includes(normalizedSearch)
    );
  }
}

/**
 * @type {ConfirmationMember}
 */
export class ConfirmationMember {
  get firstName() {
    return this._firstName;
  }
  set firstName(firstName) {
    this._normfirstName = normalizeText(firstName || "");
    this._firstName = firstName;
  }

  get lastName() {
    return this._lastName;
  }
  set lastName(lastName) {
    this._normlastName = normalizeText(lastName || "");
    this._lastName = lastName;
  }

  get name() {
    return [this.firstName, this.lastName].filter((e) => e).join(" ");
  }

  get normalizedName() {
    return [this._normfirstName, this._normlastName].filter((e) => e).join(" ");
  }

  /**
   * @param {ConfirmationMemberInterface} memberData
   * @returns {ConfirmationMember}
   */
  static fromJson(memberData) {
    return Object.assign(new ConfirmationMember(), memberData);
  }
}

export class ConfirmationMembers extends Array {
  /**
   * @param {Array<ConfirmationMemberInterface>} membersData
   * @returns {Array<ConfirmationMember>}
   */
  static fromJson(membersData) {
    const members = new ConfirmationMembers();

    members.push(...membersData.map(ConfirmationMember.fromJson));

    return members;
  }
}

/**
 * @extends {Array<Confirmation>}
 */
export class Confirmations extends Array {
  /**
   * @type {number}
   */
  get totalConfirmationMembers() {
    return this.reduce(
      (prev, current) => prev + current.confirmationMembers.length,
      0
    );
  }

  /**
   * @type {number}
   */
  get totalBusToRestaurant() {
    return this.reduce(
      (prev, current) =>
        prev + current.confirmationMembers.length * current.needBusToRestaurant,
      0
    );
  }

  /**
   * @type {number}
   */
  get totalBusToCity() {
    return this.reduce(
      (prev, current) =>
        prev + current.confirmationMembers.length * current.needBusToCity,
      0
    );
  }

  download() {
    const sheet = utils.json_to_sheet(this.map((e) => e.toJson()));
    sheet["!cols"] = [30, 20, 20, 20, 30, 60].map((e) => ({ width: e }));

    const workbook = utils.book_new();

    utils.book_append_sheet(workbook, sheet, "Confirmaciones");

    return writeFileXLSX(
      workbook,
      `confirmaciones-${DateTime.now().toFormat("YYMMDD")}.xlsx`
    );
  }

  /**
   * @param {Array<ConfirmationInterface>} confirmationsData
   * @returns {Confirmations}
   */
  static fromJson(confirmationsData) {
    const confirmations = new Confirmations();

    confirmations.push(...confirmationsData.map(Confirmation.fromJson));

    return confirmations;
  }
}
