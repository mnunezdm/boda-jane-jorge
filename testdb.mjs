import { PSDB } from "planetscale-node";
// import dotenv from "dotenv";
// dotenv.config();

const conn = new PSDB("main");

async function main() {
  const [rows, fields] = await conn.query("select * from confirmation");
  console.log(rows, fields);
}

main();
