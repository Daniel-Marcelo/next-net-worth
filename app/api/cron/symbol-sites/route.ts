import prisma from "lib/prisma";
import { NextResponse } from "next/server";
import yahooFinance from "yahoo-finance2";

const getWebsite = async (symbol: string) => {
  try {
    const innerResponse = await yahooFinance.quoteSummary(symbol, {
      modules: ["summaryProfile"],
    });

    let website = innerResponse.summaryProfile?.website;
    if (website) {
      website = innerResponse.summaryProfile?.website
        ?.replaceAll("https://", "")
        .replaceAll("http://", "")
        .replaceAll("www.", "");
      return website;
    }
  } catch {
    console.error("Error getting data for " + symbol);
  }
  return "";
};

export async function GET() {
  const symbolWebsites = await prisma.symbolWebsite.findMany();

  for await (const symbolWebsite of symbolWebsites) {
    const site = await getWebsite(symbolWebsite.symbol);
    console.log("Got website for symbol");
    if (site) {
      await prisma.symbolWebsite.update({
        where: {
          symbol: symbolWebsite.symbol,
        },
        data: {
          website: site,
        },
      });
    }
  }
}
