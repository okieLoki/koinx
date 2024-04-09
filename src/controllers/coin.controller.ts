import { config } from "../config";
import { NextFunction, Request, Response } from "express";
import { z } from "zod";

const requestValidator = z.object({
  fromCurrency: z.string().min(1),
  toCurrency: z.string().min(1),
  date: z
    .string()
    .regex(
      /^(\d{2})-(\d{2})-(\d{4})$/,
      "Invalid date format. Expected format: DD-MM-YYYY"
    )
    .transform((dateStr) => {
      const [day, month, year] = dateStr.split("-");
      const date = new Date(`${year}-${month}-${day}`);
      if (date <= new Date()) {
        return dateStr;
      } else {
        throw new Error("Date cannot be in the future");
      }
    }),
});

export class CoinController {
  public async getConversionRate(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { fromCurrency, toCurrency, date } = requestValidator.parse(
        req.body
      );

      const [historicalDataFrom, historicalDataTo] = await Promise.all([
        config.axiosInstance.get(`/${fromCurrency}/history`, {
          params: {
            date,
          },
        }),
        config.axiosInstance.get(`/${toCurrency}/history`, {
          params: {
            date,
          },
        }),
      ]);

      return res.json({
        exchangeRate:
          historicalDataFrom.data.market_data.current_price.usd /
          historicalDataTo.data.market_data.current_price.usd,
      });
    } catch (error) {
      next(error);
    }
  }
}
