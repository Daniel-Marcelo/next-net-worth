import { Portfolio } from "../types/api/portfolio.types";
import { FirebaseService } from "./firebase-service";

class PortfolioService extends FirebaseService<Portfolio> {
  constructor() {
    super("portfolios");
  }
}
export const portfolioService = new PortfolioService();
