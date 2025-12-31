"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useTranslations } from "next-intl";

gsap.registerPlugin(ScrollTrigger);

const TwoTypeSection = () => {
  const sectionRef = useRef(null);
  const leftImageRef = useRef(null);
  const rightImageRef = useRef(null);
  const leftTextRef = useRef(null);
  const rightTextRef = useRef(null);
  const [activeHover, setActiveHover] = useState(null);

  const t = useTranslations("twoType");

  useEffect(() => {
    // Mobil kontrolü
    const isMobile = window.innerWidth <= 768;

    // Mobilde animasyon çalıştırma
    if (isMobile) return;

    const section = sectionRef.current;

    ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "+=100%",
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  useEffect(() => {
    // Mobil kontrolü
    const isMobile = window.innerWidth <= 768;

    // Mobilde hover animasyonları çalıştırma
    if (isMobile) return;

    if (activeHover === "left") {
      // Left expansion animation
      gsap.to(leftImageRef.current, {
        clipPath: "polygon(0% 0%, 80% 0%, 60% 100%, 0% 100%)",
        duration: 0.8,
        ease: "power3.out",
      });
      gsap.to(rightImageRef.current, {
        clipPath: "polygon(80% 0%, 100% 0%, 100% 100%, 60% 100%)",
        duration: 0.8,
        ease: "power3.out",
      });
      gsap.to(leftTextRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: 0.3,
        ease: "power2.out",
      });
      gsap.to(rightTextRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.3,
        ease: "power2.in",
      });
    } else if (activeHover === "right") {
      // Right expansion animation
      gsap.to(rightImageRef.current, {
        clipPath: "polygon(40% 0%, 100% 0%, 100% 100%, 20% 100%)",
        duration: 0.8,
        ease: "power3.out",
      });
      gsap.to(leftImageRef.current, {
        clipPath: "polygon(0% 0%, 40% 0%, 20% 100%, 0% 100%)",
        duration: 0.8,
        ease: "power3.out",
      });
      gsap.to(rightTextRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: 0.3,
        ease: "power2.out",
      });
      gsap.to(leftTextRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.3,
        ease: "power2.in",
      });
    } else {
      // Reset to center state - diagonal "/" with top and bottom corners rounded to right
      gsap.to(leftImageRef.current, {
        clipPath:
          "path('M 0,0 L 55%,0 Q 62%,0 60%,8% L 45%,92% Q 43%,100% 36%,100% L 0,100 Z')",
        duration: 0.8,
        ease: "power3.inOut",
      });
      gsap.to(rightImageRef.current, {
        clipPath:
          "path('M 55%,0 Q 62%,0 60%,8% L 45%,92% Q 43%,100% 36%,100% L 100%,100% L 100%,0 Z')",
        duration: 0.8,
        ease: "power3.inOut",
      });
      gsap.to([leftTextRef.current, rightTextRef.current], {
        opacity: 0,
        y: 20,
        duration: 0.4,
        ease: "power2.in",
      });
    }
  }, [activeHover]);

  return (
    <>
      {/* Main season balance section */}
      <div
        ref={sectionRef}
        className="relative h-screen w-full overflow-hidden font-quicksand"
      >
        <div className="absolute inset-2 sm:inset-4 overflow-hidden rounded-3xl sm:rounded-4xl">
          {/* Summer (Left) Image - Full coverage */}
          <div
            ref={leftImageRef}
            className="absolute inset-0"
            style={{ clipPath: "polygon(0% 0%, 60% 0%, 40% 100%, 0% 100%)" }}
            onMouseEnter={() => setActiveHover("left")}
            onMouseLeave={() => setActiveHover(null)}
          >
            <Image
              src="/yandan.webp"
              alt="Summer"
              className="w-full h-full object-cover"
              width={1920}
              height={1080}
            />

            {/* Summer Text Overlay */}
            <div
              ref={leftTextRef}
              className="hidden md:block absolute bottom-4 left-4 sm:bottom-8 sm:left-8 md:bottom-12 md:left-12 p-3 sm:p-5 md:p-8 max-w-xs sm:max-w-sm md:max-w-md bg-white/15 backdrop-blur-2xl border border-white/20 rounded-2xl sm:rounded-3xl shadow-2xl opacity-0 translate-y-5"
            >
              <p className="text-white/90 font-bold text-xs sm:text-sm md:text-base leading-relaxed drop-shadow-md">
                {t("summer")}
              </p>
            </div>

            {/* Temperature indicator - Top Left */}
            <div className="absolute left-4 sm:left-6 top-2/5  md:top-1/4 md:left-14">
              <p className="text-white/80 font-bold text-4xl md:text-[100px] drop-shadow-lg opacity-80">
                +60°C
              </p>
            </div>
          </div>

          {/* Winter (Right) Image - Full coverage */}
          <div
            ref={rightImageRef}
            className="absolute inset-0"
            style={{
              clipPath: "polygon(60% 0%, 100% 0%, 100% 100%, 40% 100%)",
            }}
            onMouseEnter={() => setActiveHover("right")}
            onMouseLeave={() => setActiveHover(null)}
          >
            <Image
              src="/yandan_kis.webp"
              alt="Winter"
              className="w-full h-full object-cover"
              width={1920}
              height={1080}
            />

            {/* Winter Text Overlay */}
            <div
              ref={rightTextRef}
              className="hidden md:block absolute bottom-4 right-4 sm:bottom-8 sm:right-8 md:bottom-12 md:right-12 p-3 sm:p-5 md:p-8 max-w-xs sm:max-w-sm md:max-w-md bg-white/15 backdrop-blur-2xl border border-white/20 rounded-2xl sm:rounded-3xl shadow-2xl opacity-0 translate-y-5"
            >
              <p className="text-white/90 font-bold text-xs sm:text-sm md:text-base leading-relaxed drop-shadow-md">
                {t("winter")}
              </p>
            </div>

            {/* Temperature indicator - Top Right */}
            <div className="absolute right-4 sm:right-6 top-2/5  md:top-1/4 md:right-14">
              <p className="text-white/80 font-bold text-4xl md:text-[100px] drop-shadow-lg opacity-80">
                -50°C
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TwoTypeSection;
