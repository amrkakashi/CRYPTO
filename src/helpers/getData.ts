import axios from "axios";
import type { Coin } from "../types";



export const getDataByPage = async (offset: number, limit: number = 50): Promise<Coin[]> => {
  const response = await axios.post(
    "https://api.livecoinwatch.com/coins/list",
    {
      currency: "USD",
      sort: "rank",
      order: "ascending",
      offset,
      limit,
      meta: true,
    },
    {
      headers: {
        "content-type": "application/json",
        "x-api-key": import.meta.env.VITE_LCW_KEY,
      },
    }
  );

  return response.data;
};

export const getCoinData = async (coin: string): Promise<Coin> => {
  const response = await axios.post(
    "https://api.livecoinwatch.com/coins/single",
    {
      currency: "USD",
      code: coin,
      meta: true,
    },
    {
      headers: {
        "content-type": "application/json",
        "x-api-key": import.meta.env.VITE_LCW_KEY,
      },
    }
  );

  return response.data;
};
