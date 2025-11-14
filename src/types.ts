// types.ts
export interface CoinLinks {
  website?: string | null;
  whitepaper?: string | null;
  twitter?: string | null;
  reddit?: string | null;
  telegram?: string | null;
  [key: string]: string | null | undefined;
}

export interface CoinDelta {
  hour: number;
  day: number;
  week: number;
  month: number;
  quarter: number;
  year: number;
}

export interface Coin {
  age: number;
  allTimeHighUSD: number;
  cap: number;
  categories: string[];
  circulatingSupply: number;
  code: string;
  color: string;
  delta: CoinDelta;
  exchanges: number;
  links: CoinLinks;
  liquidity?: number | null;
  markets: number;
  maxSupply?: number;
  name: string;
  pairs: number;
  png32: string;
  png64: string;
  rank: number;
  rate: number;
  symbol?: string;
  totalSupply: number;
  volume: number;
  webp32: string;
  webp64: string;
}
