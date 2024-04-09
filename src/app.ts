import express, { Express, Request, Response } from "express";
import morgan from "morgan";
import { config } from "./config";
import { DBConnect } from "./database/dbConnect";
import { CurrencyUpdater } from "./cron/updateCurrencyCron";
import { coinRoute } from "./routes/coinRoute";
import { errorHandler } from "./middleware/errorHandler";

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
app.use("/coin", coinRoute.routes());
app.all("*", (req: Request, res: Response) => {
  res.status(404).json({
    message: "Invalid route",
  });
});

app.use(errorHandler);

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});
