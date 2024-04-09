import { CoinController } from "../controllers/coin.controller";
import { Router } from "express";

class CoinRoute {
  public router: Router;

  constructor() {
    this.router = Router();
  }

  public routes(): Router {
    this.router.get("/conversion", CoinController.prototype.getConversionRate);
    this.router.get("/company/:coin", CoinController.prototype.getCompanyData);
    
    return this.router;
  }
}

export const coinRoute: CoinRoute = new CoinRoute();
