import { CoinController } from "../controllers/coin.controller";
import { Router } from "express";

class CoinRoute {
  public router: Router;

  constructor() {
    this.router = Router();
  }

  public routes(): Router {
    this.router.get("/", CoinController.prototype.getConversionRate);
    return this.router;
  }
}

export const coinRoute: CoinRoute = new CoinRoute();
