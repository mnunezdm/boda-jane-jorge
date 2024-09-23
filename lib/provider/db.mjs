import { env } from "process";
import { PSDB } from "planetscale-node";

const getDbConnection = async () => {
  console.log(
    `INFO: Using psdb connector with branch '${env.PLANETSCALE_BRANCH}'`
  );

  return new PSDB(env.PLANETSCALE_BRANCH, {
    timezone: "Z",
  });
};

export default getDbConnection;
