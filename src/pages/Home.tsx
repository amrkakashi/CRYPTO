import CoinCard from "../components/CoinCard";
import Heading from "../components/Heading";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getDataByPage } from "../helpers/getData";
import Loading from "../components/Loading";
import ErrorComp from "../components/ErrorComp";

const Home = () => {
  const limit = 20;

  const {
    data,
    isLoading,
    isFetchingNextPage,
    error,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["coins"],
    queryFn: ({ pageParam = 0 }) => getDataByPage(pageParam, limit),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === limit ? allPages.length * limit : undefined;
    },
    initialPageParam: 0,
  });

  const allCoins = data?.pages.flat() ?? [];

  if (isLoading) return <Loading message="Loading Coins..." />;
  if (error) return <ErrorComp message={(error as Error).message} />;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <Heading title="All Coins" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-8xl">
        {allCoins.map((coin, index) => (
          <CoinCard key={coin.code} coin={coin} index={index} />
        ))}
      </div>

      {allCoins.length > 0 && (
        <button
          className="mt-12 px-8 py-3 bg-blue-500 cursor-pointer text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage || !hasNextPage}
        >
          {isFetchingNextPage ? "Loading..." : hasNextPage ? "Load More" : "No More Coins"}
        </button>
      )}
    </div>
  );
};

export default Home;
