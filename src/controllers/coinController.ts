import axios from "axios";
import { config } from "../config";
import { NextFunction, Request, Response } from "express";
import { z } from "zod";

const conversionReqValidator = z.object({
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

const coinReqValidator = z
  .string()
  .min(1)
  .refine((value) => value === "bitcoin" || value === "ethereum", {
    message: "Invalid coin name. Expected values: bitcoin, ethereum",
  });

export class CoinController {
  public async getConversionRate(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { fromCurrency, toCurrency, date } = conversionReqValidator.parse(
        req.query
      );

      const [historicalDataFrom, historicalDataTo] = await Promise.all([
        config.axiosInstance.get(`/coins/${fromCurrency}/history`, {
          params: {
            date,
          },
        }),
        config.axiosInstance.get(`/coins/${toCurrency}/history`, {
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

  public async getCompanyData(req: Request, res: Response, next: NextFunction) {
    try {
      const coin = coinReqValidator.parse(req.params.coin);
      const companyData = await config.axiosInstance.get(
        `/companies/public_treasury/${coin}`
      );
      return res.json(companyData.data);
    } catch (error) {
      next(error);
    }
  }
}
