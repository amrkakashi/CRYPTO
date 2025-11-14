import React, { useRef, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getCoinData } from "../helpers/getData";
import type { Coin } from "../types";
import gsap from "gsap";
import Loading from "../components/Loading";
import ErrorComp from "../components/ErrorComp";

const CoinPage = () => {
    const noData = "N/A";
  const { coin } = useParams<{ coin: string }>();
  const { data, isLoading, error } = useQuery<Coin>({
    queryKey: ["coin", coin],
    queryFn: () => getCoinData(coin!),
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const rankRef = useRef<HTMLParagraphElement>(null);
  const infoRefs = useRef<(HTMLDivElement | null)[]>([]);
  const deltaRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!data) return;

    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );

    gsap.fromTo(
      logoRef.current,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, ease: "elastic.out(1, 0.5)" }
    );

    gsap.fromTo(
      [titleRef.current, rankRef.current],
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 }
    );

    gsap.fromTo(
      infoRefs.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 }
    );

    gsap.fromTo(
      deltaRefs.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 }
    );
  }, [data]);

  if (isLoading) return <Loading message="Loading Coin Data..." />;
  if (error) return <ErrorComp message={(error as Error).message} />;
  if (!data) return null;

  return (
    <div
      ref={containerRef}
      className="min-h-screen p-4 md:p-8 flex justify-center items-start relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${data.color}33 0%, #0f172a 50%, ${data.color}22 100%)`,
      }}
    >
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ zIndex: 0 }}
      >
        <div
          className="absolute top-10 left-10 w-80 h-80 rounded-full opacity-20 blur-3xl"
          style={{ backgroundColor: data.color }}
        />
        <div
          className="absolute bottom-10 right-10 w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{ backgroundColor: data.color }}
        />
      </div>

      <div
        ref={cardRef}
        className="relative bg-gray-900/90 backdrop-blur-xl text-white rounded-3xl shadow-2xl p-6 md:p-10 max-w-6xl w-full border border-gray-700/50 z-10"
      >
        <div className="relative w-32 h-32 mx-auto mb-6">
          <img
            ref={logoRef}
            src={data.png64}
            alt={data.name}
            className="relative w-full h-full rounded-full border-4 border-gray-700 shadow-xl"
            style={{ borderColor: `${data.color}80` }}
          />
        </div>

        <h1
          ref={titleRef}
          className="text-4xl md:text-5xl font-black mb-3 text-center"
          style={{
            background: `linear-gradient(135deg, ${data.color}, #60a5fa)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {data.name || noData}
        </h1>

        <p
          ref={rankRef}
          className="text-center px-4 py-1.5 rounded-full text-sm font-bold mb-6"
          style={{
            background: `linear-gradient(135deg, ${data.color}20, ${data.color}40)`,
            border: `2px solid ${data.color}60`,
          }}
        >
          Rank #{data.rank || noData}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {[
            { label: "Price", value: `$${data.rate.toLocaleString()}`, highlight: true },
            { label: "Market Cap", value: `$${data.cap.toLocaleString()}` },
            { label: "All Time High", value: `$${data.allTimeHighUSD.toLocaleString()}` },
            { label: "Total Supply", value: data.totalSupply.toLocaleString() },
            { label: "Circulating Supply", value: data.circulatingSupply.toLocaleString() },
            { label: "Liquidity", value: data.liquidity?.toLocaleString() },
          ].map((item, i) => (
            <Info
              key={item.label}
              ref={(el) => { infoRefs.current[i] = el; }}
              label={item.label}
              value={item.value || "N/A"}
              highlight={item.highlight}
              color={data.color}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[
            { label: "Exchanges", value: data.exchanges.toString() },
            { label: "Markets", value: data.markets.toString() },
            { label: "Pairs", value: data.pairs.toString() },
          ].map((item, i) => (
            <Info
              key={item.label}
              ref={(el) => { infoRefs.current[i + 6] = el; }}
              label={item.label}
              value={item.value || "N/A"}
              color={data.color}
            />
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {Object.entries(data.delta).map(([key, value], i) => (
            <PriceDelta
              key={key}
              ref={(el) => { deltaRefs.current[i] = el; }}
              period={key}
              value={value}
              color={data.color}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoinPage;

const Info = React.forwardRef<
  HTMLDivElement,
  { label: string; value: string; highlight?: boolean; color: string }
>(({ label, value, highlight, color }, ref) => (
  <div
    ref={ref}
    className="group relative bg-gray-800/80 p-5 rounded-2xl shadow-lg backdrop-blur-sm border border-gray-700/50 hover:scale-105 transition-all duration-300 overflow-hidden"
  >
    <div className="relative flex flex-col items-center text-center gap-2">
      <span className="text-gray-100 text-xs uppercase tracking-wider font-semibold">{label}</span>
      <span className={`font-bold text-lg ${highlight ? "text-2xl" : ""}`} style={highlight ? { color } : {}}>{value}</span>
    </div>
  </div>
));

const PriceDelta = React.forwardRef<
  HTMLDivElement,
  { period: string; value: number; color?: string }
>(({ period, value, color }, ref) => {
  const isPositive = value >= 1;
  const percentage = ((value - 1) * 100)?.toFixed(2) || "N/A";
  return (
    <div
      ref={ref}
      className="group relative bg-gray-800/80 p-4 rounded-xl shadow-lg backdrop-blur-sm border border-gray-700/50 hover:scale-110 transition-all duration-300 overflow-hidden"
    >
      <div className="relative flex flex-col items-center text-center gap-1 " style={{ color }}>
        <span className="text-gray-100 text-xs uppercase tracking-wider font-bold">{period}</span>
        <span className={`font-black text-xl ${isPositive ? "text-green-400" : "text-red-400"}`}>{isPositive ? "+" : ""}{percentage}%</span>
        <span className="text-gray-500 text-xs">{value?.toFixed(4) || "N/A"}x</span>
      </div>
    </div>
  );
});
