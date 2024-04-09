import { AxiosError } from "axios";
import { config } from "../config";
import { CoinModel, CoinType } from "../models/coinModel";
import { z } from "zod";

const coinValidator = z.object({
  id: z.string(),
  symbol: z.string().optional(),
  name: z.string(),
});

class CoinCronService {
  private async fetchCoinData() {
    try {
      const response = await config.axiosInstance.get("/coins/list");
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError || error instanceof Error) {
        console.error(error.message);
      }
    }
  }

  public async syncCoinData() {
    try {
      const coinDataFromAPI: CoinType[] = await this.fetchCoinData();
      const validCoins: CoinType[] = [];

      for (const coin of coinDataFromAPI) {
        try {
          coinValidator.parse(coin);
          validCoins.push(coin);
        } catch (error) {
          console.error(`Invalid coin data: ${JSON.stringify(coin)}`);
        }
      }

      if (validCoins.length > 0) {
        await CoinModel.deleteMany({});
        await CoinModel.insertMany(validCoins);

        console.log("Data updated successfully");
      }

      return validCoins;
    } catch (error) {
      console.error(error);
    }
  }
}

export const coinCronService: CoinCronService = new CoinCronService();
