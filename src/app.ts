import express, { Express } from "express";
import { config } from "./config";
import { DBConnect } from "./database/dbConnect";
import morgan from "morgan";
import { CurrencyUpdater } from "./cron/updateCurrency";
import { coinRoute } from "./routes/coin.route";


const app: Express = express();

// check env
config.verifyConfigData()

// database connection
DBConnect.connect();

// cron job
new CurrencyUpdater();

app.use(morgan("dev"));
app.use(express.json());

app.use('/', coinRoute.routes())

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});
