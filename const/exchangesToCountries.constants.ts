export interface StockExchangeCountry {
  exchangeLongName: string;
  exchangeShortName: string;
  countryName: string;
  countryCode: string;
}

export const stockExchangeCountries = [
  {
    exchangeLongName: "New York Stock Exchange",
    exchangeShortName: "NYSE",
    countryName: "United States",
    countryCode: "US",
  },
  {
    exchangeLongName: "NASDAQ",
    exchangeShortName: "NASDAQ",
    countryName: "United States",
    countryCode: "US",
  },
  {
    exchangeLongName: "Tokyo Stock Exchange",
    exchangeShortName: "TSE",
    countryName: "Japan",
    countryCode: "JP",
  },
  {
    exchangeLongName: "Shanghai Stock Exchange",
    exchangeShortName: "SSE",
    countryName: "China",
    countryCode: "CN",
  },
  {
    exchangeLongName: "Hong Kong Stock Exchange",
    exchangeShortName: "HKEX",
    countryName: "Hong Kong",
    countryCode: "HK",
  },
  {
    exchangeLongName: "Euronext",
    exchangeShortName: "Euronext",
    countryName: "European Union",
    countryCode: "EU",
  },
  {
    exchangeLongName: "London Stock Exchange",
    exchangeShortName: "LSE",
    countryName: "United Kingdom",
    countryCode: "GB",
  },
  {
    exchangeLongName: "Toronto Stock Exchange",
    exchangeShortName: "TSX",
    countryName: "Canada",
    countryCode: "CA",
  },
  {
    exchangeLongName: "Bombay Stock Exchange",
    exchangeShortName: "BSE",
    countryName: "India",
    countryCode: "IN",
  },
  {
    exchangeLongName: "National Stock Exchange of India",
    exchangeShortName: "NSE",
    countryName: "India",
    countryCode: "IN",
  },
  {
    exchangeLongName: "Deutsche Börse",
    exchangeShortName: "DB1",
    countryName: "Germany",
    countryCode: "DE",
  },
  {
    exchangeLongName: "Australian Securities Exchange",
    exchangeShortName: "ASX",
    countryName: "Australia",
    countryCode: "AU",
  },
  {
    exchangeLongName: "JSE Limited",
    exchangeShortName: "JSE",
    countryName: "South Africa",
    countryCode: "ZA",
  },
  {
    exchangeLongName: "BM&F Bovespa",
    exchangeShortName: "B3",
    countryName: "Brazil",
    countryCode: "BR",
  },
  {
    exchangeLongName: "Korea Exchange",
    exchangeShortName: "KRX",
    countryName: "South Korea",
    countryCode: "KR",
  },
  {
    exchangeLongName: "Swiss Exchange",
    exchangeShortName: "SIX",
    countryName: "Switzerland",
    countryCode: "CH",
  },
  {
    exchangeLongName: "Taiwan Stock Exchange",
    exchangeShortName: "TWSE",
    countryName: "Taiwan",
    countryCode: "TW",
  },
  {
    exchangeLongName: "Borsa İstanbul",
    exchangeShortName: "BIST",
    countryName: "Turkey",
    countryCode: "TR",
  },
  {
    exchangeLongName: "Moscow Exchange",
    exchangeShortName: "MOEX",
    countryName: "Russia",
    countryCode: "RU",
  },
  {
    exchangeLongName: "Saudi Stock Exchange",
    exchangeShortName: "Tadawul",
    countryName: "Saudi Arabia",
    countryCode: "SA",
  },
  {
    exchangeLongName: "BME Spanish Exchanges",
    exchangeShortName: "BME",
    countryName: "Spain",
    countryCode: "ES",
  },
  {
    exchangeLongName: "Italian Stock Exchange",
    exchangeShortName: "MTA",
    countryName: "Italy",
    countryCode: "IT",
  },
  {
    exchangeLongName: "Prague Stock Exchange",
    exchangeShortName: "PRA",
    countryName: "Czech Republic",
    countryCode: "CZ",
  },
  {
    exchangeLongName: "Vienna Stock Exchange",
    exchangeShortName: "VIE",
    countryName: "Austria",
    countryCode: "AT",
  },
  {
    exchangeLongName: "Cboe Europe",
    exchangeShortName: "CXE",
    countryName: "United Kingdom",
    countryCode: "GB",
  },
] as const;
