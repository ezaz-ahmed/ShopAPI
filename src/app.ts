import createServer from "./utils/server";
import config from "config";
import connect from "./utils/connect";
import logger from "./utils/logger";
import routes from "./utils/routes";

const port = config.get<number>("port");

const app = createServer();

app.listen(port, async () => {
  logger.info(`App is running on http://localhost:${port}`);
  await connect();
});
