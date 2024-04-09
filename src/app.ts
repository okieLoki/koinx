import express, { Express } from "express";
import morgan from "morgan";
import { config } from "./config";
import { DBConnect } from "./database/dbConnect";
import { CurrencyUpdater } from "./cron/updateCurrency";
import { coinRoute } from "./routes/coin.route";
import { errorHandler } from "./lib/errorHandler";

const app: Express = express();

// check env
config.verifyConfigData();

// database connection
DBConnect.connect();

// cron job
new CurrencyUpdater();

app.use(morgan("dev"));
app.use(express.json());

// routes
app.use("/", coinRoute.routes());

app.use(errorHandler);

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});
