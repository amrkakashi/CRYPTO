import axios from "axios";

export const getData = async () => {
  const response = await axios.get(
    "https://api.livecoinwatch.com/coins/list",
    {
      params: {
        currency: "USD",
        sort: "rank",
        order: "ascending",
        offset: 0,
        limit: 50,
        meta: true,
      },
    }
  );

  return response.data;
};
