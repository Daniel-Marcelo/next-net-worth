import { Portfolio } from "../types/api/portfolio.types";
import { FirebaseService } from "./firebase-service";

class HoldingService extends FirebaseService<{ symbol: string }> {
  constructor() {
    super("holding");
  }
}
export const holdingService = new HoldingService();
