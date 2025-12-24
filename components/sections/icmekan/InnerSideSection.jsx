"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";

gsap.registerPlugin(ScrollTrigger);

const InnerSideSection = () => {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const titleRef = useRef(null);
  const t = useTranslations("innerside");

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    const title = titleRef.current;

    // Pin the section
    ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "+=100%",
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
    });

    // Animate title
    gsap.fromTo(
      title,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );

    // Video fade in animation
    gsap.fromTo(
      video,
      {
        opacity: 0.8,
      },
      {
        opacity: 1,
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=50%",
          scrub: 1,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden font-quicksand my-40"
      id="ic-mekan"
    >
      {/* Background Video - Full Screen */}
      <video
        ref={videoRef}
        src="/icmekan_video.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark overlay for better text visibility */}
      <div className="absolute inset-0 bg-black/5" />

      {/* Content - Title on top of video */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 md:px-6 lg:px-8">
        <h2
          ref={titleRef}
          className="text-center text-4xl md:text-6xl lg:text-[100px] font-bold text-white/80 mb-2 md:mb-4 drop-shadow-2xl opacity-90"
        >
          {t("title")}
        </h2>
      </div>
    </div>
  );
};

export default InnerSideSection;
