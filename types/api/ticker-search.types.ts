export interface YFQuote {
  exchange: string;
  shortname: string;
  quoteType: QuoteType;
  symbol: string;
  index?: string;
  score?: number;
  typeDisp: string;
  longname: string;
  exchDisp?: string;
  sector?: string;
  sectorDisp?: string;
  industry?: string;
  industryDisp?: string;
  dispSecIndFlag?: boolean;
  isYahooFinance: boolean;
  website?: string;
}

export enum QuoteType {
  Equity = "EQUITY",
  Etf = "ETF",
  MutualFund = "MUTUALFUND",
  Index = "INDEX",
  Currency = "CURRENCY",
  Cryptocurrency = "CRYPTOCURRENCY",
  Option = "OPTION",
}

interface ThumbnailResolution {
  url: string;
  width: number;
  height: number;
  tag: string;
}

interface Thumbnail {
  resolutions: ThumbnailResolution[];
}

interface NewsItem {
  uuid: string;
  title: string;
  publisher: string;
  link: string;
  providerPublishTime: string;
  type: string;
  thumbnail: Thumbnail;
  relatedTickers?: string[];
}

export interface TickerSearchResponse {
  explains: any[];
  count: number;
  quotes: YFQuote[];
  news: NewsItem[];
  nav: any[];
  lists: any[];
  researchReports: any[];
  screenerFieldResults: any[];
  totalTime: number;
  timeTakenForQuotes: number;
  timeTakenForNews: number;
  timeTakenForAlgowatchlist: number;
  timeTakenForPredefinedScreener: number;
  timeTakenForCrunchbase: number;
  timeTakenForNav: number;
  timeTakenForResearchReports: number;
  timeTakenForScreenerField: number;
  timeTakenForCulturalAssets: number;
}

export interface Quote {
  sectorVisibility: boolean;
  exchangeDisplayName: string;
  exchangeCode: string;
  quoteCollection: string;
  productIndustry: string;
  industryDisplay: string;
  financeDataSource: boolean;
  companyFullName: string;
  equityType: string;
  relevanceScore: number;
  businessSector: string;
  sectorDisplay: string;
  companyShortName: string;
  tickerSymbol: string;
  displayType: string;
  companyWebsite: string;
}
