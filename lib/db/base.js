import chalk from "chalk";
import { escape } from "mysql2";

export class BaseDbObject {
  static get sqlFields() {
    return Object.fromEntries(
      Object.keys(this.fields).map((field) => [
        this.fields[field].sqlField || field,
        field,
      ])
    );
  }

  /**
   * @type {String[]}
   */
  get insertFields() {
    return Object.keys(this.constructor.fields).filter(
      (field) => this.constructor.fields[field].insertable
    );
  }

  /**
   * @type {String[]}
   */
  get queryFields() {
    return Object.keys(this.constructor.fields).map(
      (field) => this.constructor.fields[field].sqlField || field
    );
  }

  /**
   * @type {String}
   */
  get insertString() {
    return `INSERT INTO ${this.constructor.table} (${this.insertFields
      .map((field) => this.constructor.fields[field].sqlField || field)
      .join(", ")}) VALUES (${this.insertFields
      .map((key) => this.getDbValue(key))
      .join(", ")});`;
  }

  toRow() {
    return Object.keys(this.constructor.fields)
      .filter((field) => this.constructor.fields[field].insertable)
      .map((field) => this[field]);
  }

  /**
   * @type {String}
   */
  get queryString() {
    return `SELECT ${this.queryFields.join(", ")} FROM ${
      this.constructor.table
    }`;
  }

  insertSync(db) {
    const row = this.toRow();
    console.info(
      chalk.dim(
        `[FINE] Inserting to ${this.constructor.table} with '${this.insertString}'`
      )
    );
    const { id } = db.querySync(this.insertString, row)[0];
    this.id = id;
  }

  async insert(db) {
    const row = this.toRow();
    console.info(
      chalk.dim(
        `[FINE] Inserting to ${this.constructor.table} with '${this.insertString}'`
      )
    );
    const { insertId } = (await db.query(this.insertString, row))[0];

    console.info(chalk.dim(`[FINE] Returned id '${insertId}'`));

    this.id = insertId;
  }

  static async fromId(db, id) {
    const object = new this();
    object.id = id;
    await object.fetch(db);
    return object;
  }

  async fetch(db, byField = "id", orderBy = "") {
    const orderByString = `ORDER BY ${orderBy}`;

    const queryString = `${this.queryString} WHERE ${byField} = ${escape(
      this[byField]
    )}${(orderBy && orderByString) || ""};`;

    const [rows] = await db.query(queryString);

    if (!rows.length) {
      throw new ResourceNotFoundError(
        `${this.constructor.table} with ${byField} ${this[byField]} not found`
      );
    }

    this.fromRow(rows[0]);

    this._dbStatus = "queried";
  }

  fromRow(payload) {
    const sqlFieldsMapper = this.constructor.sqlFields;
    Object.keys(payload).forEach((dbFieldName) => {
      const fieldName = sqlFieldsMapper[dbFieldName];
      const fieldMetadata = this.constructor.fields[fieldName];
      const value = payload[dbFieldName];
      this[fieldName] =
        (fieldMetadata?.deserialize && fieldMetadata.deserialize(value)) ??
        value;
    });
    return this;
  }

  getDbValue(field) {
    let dbValue = this[field];

    console.info(
      chalk.dim(`[FINR] Getting db value for ${field} and value ${dbValue}`)
    );

    if (dbValue === null || dbValue === undefined) {
      dbValue = "null";
    } else if (this.constructor.fields[field].type === Boolean) {
      dbValue = dbValue ? 1 : 0;
    } else if (this.constructor.fields[field].type === Date) {
      dbValue = `'${dbValue.toISOString()}'`;
    } else if (this.constructor.fields[field].type === String) {
      dbValue = `'${dbValue}'`;
    } else if (this.constructor.fields[field].type === Object) {
      dbValue = `'${JSON.stringify(dbValue)}'`;
    }
    return dbValue;
  }

  async update(db, fields) {
    await db.query(
      `UPDATE ${this.constructor.table} SET ${fields
        .map(
          (field) =>
            `${
              this.constructor.fields[field].sqlField || field
            } = ${this.getDbValue(field)}`
        )
        .join(", ")} WHERE id = ${this.id}`
    );
  }

  static async count(db, field = "id", filters = "") {
    console.info(
      chalk.dim(
        `[FINE] Counting ${field} in ${this.table}`,
        filters && `matching [${filters}]`
      )
    );

    const response = await db.query(
      queryBuilder(`COUNT(${field})`, this.table, filters)
    );

    return response[0][0][`count(${field})`];
  }

  /**
   * Returns a serialized version of the object (based on the field metadata)
   */
  toJson() {
    return Object.fromEntries(
      Object.entries(this).filter(
        ([field]) => this.constructor.fields[field]?.serializable
      )
    );
  }
}

export class ResourceNotFoundError extends Error {}

export function queryBuilder(fields, table, filters, orderBy, limit) {
  return (
    [
      "SELECT",
      fields,
      `FROM ${table}`,
      filters ? `WHERE ${filters}` : "",
      orderBy ? `ORDER BY ${orderBy}` : "",
      limit ? `LIMIT ${limit}` : "",
    ]
      .filter((e) => e)
      .join(" ") + ";"
  );
}
