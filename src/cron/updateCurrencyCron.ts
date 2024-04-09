import { coinCronService } from "../lib/coinCronService";
import cron from "node-cron";

export class CurrencyUpdater {
  constructor() {
    cron.schedule("0 0 * * *", async () => {
      try {
        await coinCronService.syncCoinData();
      } catch (error) {
        console.error(error);
      }
    });
  }
}
