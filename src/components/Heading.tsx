import { useRef, useEffect } from "react";
import gsap from "gsap";

const Heading = ({ title }: { title: string }) => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (titleRef.current && lineRef.current) {
      const tl = gsap.timeline();

      tl.fromTo(
        titleRef.current,
        { x: -100, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: "power4.out" }
      );

      tl.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          transformOrigin: "left center",
          duration: 1,
          ease: "power3.out",
        },
        "-=0.5"
      );

      tl.to(
        titleRef.current,
        {
          textShadow: "0 0 10px rgba(255,255,255,0.6)",
          duration: 0.5,
          repeat: 1,
          yoyo: true,
        },
        "-=0.3"
      );
    }
  }, []);

  return (
    <div className="w-full flex justify-start items-end gap-4 my-6">
      <h1
        ref={titleRef}
        className="whitespace-nowrap text-3xl lg:text-7xl text-start font-bold"
      >
        {title}
      </h1>
      <span
        ref={lineRef}
        className="w-full flex-1 h-px bg-gray-200 rounded-full"
      />
    </div>
  );
};

export default Heading;
