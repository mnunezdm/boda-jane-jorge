export class ConfirmationBase {
  /**
   * @type {number}
   */
  get id() {
    return this._id;
  }
  set id(id) {
    this._id = id;
  }

  /**
   * @type {boolean}
   */
  get needBusToCity() {
    return this._needBusToCity;
  }
  set needBusToCity(needBusToCity) {
    this._needBusToCity = needBusToCity;
  }

  /**
   * @type {boolean}
   */
  get needBusToRestaurant() {
    return this._needBusToRestaurant;
  }
  set needBusToRestaurant(needBusToRestaurant) {
    this._needBusToRestaurant = needBusToRestaurant;
  }

  /**
   * @type {string}
   */
  get extraInformation() {
    return this._extraInformation;
  }
  set extraInformation(extraInformation) {
    this._extraInformation = extraInformation;
  }

  /**
   * @type {Array<ConfirmationMemberBase>}
   */
  get confirmationMembers() {
    return this._confirmationMembers;
  }
  set confirmationMembers(confirmationMembers) {
    this._confirmationMembers = confirmationMembers;
  }

  /**
   * @type {string}
   */
  get mustHaveSong() {
    return this._mustHaveSong;
  }
  set mustHaveSong(mustHaveSong) {
    this._mustHaveSong = mustHaveSong;
  }
}

export class ConfirmationMemberBase {
  /**
   * @type {number}
   */
  get id() {
    return this._id;
  }
  set id(id) {
    this._id = id;
  }

  /**
   * @type {string}
   */
  get firstName() {
    return this._firstName;
  }
  set firstName(firstName) {
    this._firstName = firstName;
  }

  /**
   * @type {string}
   */
  get lastName() {
    return this._lastName;
  }
  set lastName(lastName) {
    this._lastName = lastName;
  }
}
