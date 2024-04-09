import { coinService } from "../lib/coinService";
import cron from "node-cron";

export class CurrencyUpdater {
  constructor() {
    cron.schedule("0 0 * * *", async () => {
      try {
        await coinService.syncCoinData();
      } catch (error) {
        console.error(error);
      }
    });
  }
}
