import { useRef, useEffect } from "react";
import gsap from "gsap";
import type { Coin } from "../types";
import { FaTwitter, FaGlobe } from "react-icons/fa";
import { Link } from "react-router-dom";

interface CoinCardProps {
  coin: Coin;
  index: number;
}

const CoinCard = ({ coin, index }: CoinCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef.current && glowRef.current && contentRef.current) {
      gsap.set([cardRef.current, glowRef.current, contentRef.current.children], {
        opacity: 0,
        y: 30
      });

      gsap.timeline({ delay: index * 0.15 })
        .to(cardRef.current, {
          opacity: 1,
          scale: 1,
          rotationX: 0,
          duration: 0.8,
          ease: "back.out(1.7)"
        })
        .to(glowRef.current, {
          opacity: 0.7,
          duration: 0.5,
          ease: "power2.out"
        }, "-=0.5")
        .to(contentRef.current.children, {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          duration: 0.6,
          ease: "power2.out"
        }, "-=0.4");
    }
  }, [index]);

  const handleMouseEnter = () => {
    if (cardRef.current && glowRef.current) {
      gsap.to(cardRef.current, {
        scale: 1.08,
        y: -10,
        rotationY: 10,
        rotationX: -5,
        duration: 0.5,
        ease: "power3.out"
      });

      gsap.to(glowRef.current, {
        opacity: 1,
        scale: 1.15,
        duration: 0.5,
        ease: "power3.out"
      });
    }
  };

  const handleMouseLeave = () => {
    if (cardRef.current && glowRef.current) {
      gsap.to(cardRef.current, {
        scale: 1,
        y: 0,
        rotationY: 0,
        rotationX: 0,
        duration: 0.5,
        ease: "power3.out"
      });

      gsap.to(glowRef.current, {
        opacity: 0.3,
        scale: 1,
        duration: 0.5,
        ease: "power3.out"
      });
    }
  };

  const getGradient = (color: string) => `linear-gradient(135deg, ${color}20, ${color}60)`;

  return (
    <Link to={`/coins/${coin.code}`}>
    <div
    className="relative p-4" style={{ perspective: 1200 }}>
      <div
        ref={glowRef}
        className="absolute inset-0 rounded-3xl opacity-30"
        style={{
          background: getGradient(coin.color),
          filter: "blur(25px)",
          zIndex: -1,
        }}
      />

      <div
        ref={cardRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative bg-gray-900 rounded-3xl shadow-2xl p-6 flex flex-col items-center cursor-pointer overflow-hidden border border-white/20 backdrop-blur-sm"
        style={{ transformStyle: "preserve-3d", borderTop: `6px solid ${coin.color}` }}
      >
        <div className="absolute inset-0 opacity-10" 
             style={{ background: `radial-gradient(circle at 30% 20%, ${coin.color}50, transparent 60%)` }}
        />
        <div ref={contentRef} className="relative z-10 flex flex-col items-center w-full">
          <div className="relative mb-4">
            <div className="absolute inset-0 rounded-full blur-md opacity-40" style={{ background: coin.color }} />
            <img src={coin.png64} alt={coin.name} className="w-20 h-20 relative z-10 drop-shadow-2xl" />
          </div>

          <div className="text-center mb-4">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-200 via-gray-400 to-gray-600 bg-clip-text text-transparent">
              {coin.name}
            </h2>
            <p className="text-gray-400 font-medium text-sm uppercase tracking-wider">{coin.symbol || coin.code}</p>
          </div>

          <div className="w-full space-y-2 mb-5">
            <InfoRow label="Rank" value={`#${coin.rank}`} />
            <InfoRow label="Price" value={`$${coin.rate.toLocaleString()}`} />
            <InfoRow label="Market Cap" value={`$${coin.cap?.toLocaleString() || "N/A"}`} />
          </div>

          <div className="flex space-x-4 mt-2">
            {coin.links.website && <CoinLink link={coin.links.website} icon={<FaGlobe />} color="gray-700" />}
            {coin.links.twitter && <CoinLink link={coin.links.twitter} icon={<FaTwitter />} color="blue-500" />}
          </div>
        </div>
      </div>
    </div>
    </Link>
  );
};

export default CoinCard;

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between items-center w-full">
    <span className="text-gray-400 text-sm">{label}</span>
    <span className="font-semibold text-gray-100 text-sm">{value}</span>
  </div>
);

const CoinLink = ({ link, icon, color }: { link: string; icon: React.ReactNode; color: string }) => (
  <Link
    to={link}
    target="_blank"
    rel="noopener noreferrer"
    className={`flex items-center justify-center w-10 h-10 rounded-full bg-${color} hover:scale-110 transition-transform duration-300 text-white`}
  >
    {icon}
  </Link>
);
