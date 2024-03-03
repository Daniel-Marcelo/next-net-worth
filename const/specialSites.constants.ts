export type SiteOverride = {
  searchText: readonly string[];
  site: string;
};

export type CryptoSiteOverride = SiteOverride & {
  ticker: string;
};

export const specialIndexFundSites: readonly SiteOverride[] = [
  {
    searchText: ["vanguard"],
    site: "vanguardinvestor.co.uk",
  },
  { searchText: ["fidelity"], site: "fidelity.co.uk" },
  { searchText: ["ishares"], site: "ishares.com" },
  { searchText: ["blackrock"], site: "blackrock.com" },
  { searchText: ["spdr"], site: "spdrs.com" },
  { searchText: ["invesco"], site: "invesco.com" },
  { searchText: ["lyxor"], site: "lyxoretf.co.uk" },
  { searchText: ["wisdomtree"], site: "wisdomtree.eu" },
  { searchText: ["amundi"], site: "amundietf.co.uk" },
  { searchText: ["xtrackers"], site: "xtrackers.com" },
  { searchText: ["db x-trackers"], site: "xtrackers.com" },
  { searchText: ["db xtrackers"], site: "xtrackers.com" },
] as const;

export const cryptoWebsites: readonly SiteOverride[] = [
  { searchText: ["Bitcoin", "BTC"], site: "bitcoin.org" },
  { searchText: ["monero", "XMR"], site: "getmonero.org" },
  { searchText: ["Ethereum", "ETH"], site: "ethereum.org" },
  { searchText: ["Ripple", "XRP"], site: "ripple.com" },
  { searchText: ["Litecoin", "LTC"], site: "litecoin.org" },
  { searchText: ["Cardano", "ADA"], site: "cardano.org" },
  { searchText: ["Polkadot", "DOT"], site: "polkadot.network" },
  { searchText: ["Chainlink", "LINK"], site: "chain.link" },
  { searchText: ["Stellar", "XLM"], site: "stellar.org" },
  { searchText: ["Uniswap", "UNI"], site: "uniswap.org" },
  { searchText: ["Aave", "AAVE"], site: "aave.com" },
  { searchText: ["Compound", "COMP"], site: "compound.finance" },
  { searchText: ["Maker", "MKR"], site: "makerdao.com" },
  { searchText: ["Yearn", "YFI"], site: "yearn.finance" },
  { searchText: ["Sushi", "SUSHI"], site: "sushi.com" },
  { searchText: ["Synthetix", "SNX"], site: "synthetix.io" },
  { searchText: ["Curve", "CRV"], site: "curve.fi" },
  { searchText: ["Balancer", "BAL"], site: "balancer.finance" },
  { searchText: ["Ren", "REN"], site: "renproject.io" },
  { searchText: ["Kyber", "KNC"], site: "kyber.network" },
  { searchText: ["Loopring", "LRC"], site: "loopring.org" },
  { searchText: ["1inch", "1INCH"], site: "1inch.io" },
  { searchText: ["Zcash", "ZEC"], site: "zcash.com" },
  { searchText: ["Tezos", "XTZ"], site: "tezos.com" },
  { searchText: ["Algorand", "ALGO"], site: "algorand.com" },
  { searchText: ["Dai", "DAI"], site: "makerdao.com" },
  { searchText: ["Tether", "USDT"], site: "tether.to" },
  { searchText: ["USD Coin", "USDC"], site: "centre.io" },
  { searchText: ["Binance USD", "BUSD"], site: "binance.com" },
  { searchText: ["Paxos", "PAX"], site: "paxos.com" },
  { searchText: ["TrueUSD", "TUSD"], site: "trusttoken.com" },
  { searchText: ["Hedera", "HBAR"], site: "hedera.com" },
  { searchText: ["NEM", "XEM"], site: "nem.io" },
  { searchText: ["VeChain", "VET"], site: "vechain.com" },
  { searchText: ["ICON", "ICX"], site: "icon.foundation" },
  { searchText: ["Ontology", "ONT"], site: "ont.io" },
  { searchText: ["Qtum", "QTUM"], site: "qtum.org" },
  { searchText: ["Waves", "WAVES"], site: "waves.tech" },
  { searchText: ["Decred", "DCR"], site: "decred.org" },
  { searchText: ["Horizen", "ZEN"], site: "horizen.global" },
  { searchText: ["Nano", "NANO"], site: "nano.org" },
  { searchText: ["Nervos", "CKB"], site: "nervos.org" },
  { searchText: ["Zcoin", "XZC"], site: "zcoin.io" },
  { searchText: ["Aeternity", "AE"], site: "aeternity.com" },
  { searchText: ["Lisk", "LSK"], site: "lisk.com" },
  { searchText: ["Nebulas", "NAS"], site: "nebulas.io" },
  { searchText: ["Nxt", "NXT"], site: "nxt.org" },
  { searchText: ["Steem", "STEEM"], site: "steem.com" },
  { searchText: ["Stratis", "STRAT"], site: "stratisplatform.com" },
  { searchText: ["Syscoin", "SYS"], site: "syscoin.org" },
  { searchText: ["WAX", "WAXP"], site: "wax.io" },
  { searchText: ["Zencash", "ZEN"], site: "horizen.global" },
  { searchText: ["ZClassic", "ZCL"], site: "zclassic.org" },
  { searchText: ["Zilliqa", "ZIL"], site: "zilliqa.com" },
] as const;
