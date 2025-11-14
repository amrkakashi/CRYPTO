import axios from "axios";

export const getData = async () => {
  const response = await axios.get(
    "https://api.livecoinwatch.com/coins/list",
    {
      currency: "USD",
      sort: "rank",
      order: "ascending",
      offset: 0,
      limit: 50,
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
