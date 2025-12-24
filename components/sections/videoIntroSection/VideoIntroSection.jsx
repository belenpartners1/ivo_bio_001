"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const VideoIntroSection = () => {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const locale = useLocale();
  const [scrollTriggerInstance, setScrollTriggerInstance] = useState(null);

  // Dil seçimine göre video URL'i
  const videoUrl =
    locale === "tr"
      ? "https://www.youtube.com/embed/tmL8ju7AKmU?si=6qmqy8ti4Bbu7yva&rel=0&modestbranding=1&fs=1"
      : "https://www.youtube.com/embed/1gNb2H6JAtk?si=jOReELlEUVOG3mEW&rel=0&modestbranding=1&fs=1";

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;

    if (!section || !video) return;

    // Pin animasyonu - section yukarıda sabitlenir
    const pinTrigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "+=100%",
      pin: true,
      pinSpacing: true,
      scrub: 1,
    });

    setScrollTriggerInstance(pinTrigger);

    // Video scale ve opacity animasyonu (opsiyonel)
    gsap.fromTo(
      video,
      {
        scale: 0.95,
        opacity: 0.9,
      },
      {
        scale: 1,
        opacity: 1,
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=100%",
          scrub: 1,
        },
      }
    );

    // Fullscreen değişikliklerini dinle
    const handleFullscreenChange = () => {
      if (document.fullscreenElement) {
        // Tam ekrana geçildiğinde ScrollTrigger'ı devre dışı bırak
        ScrollTrigger.getAll().forEach((trigger) => {
          trigger.disable();
        });
      } else {
        // Tam ekrandan çıkıldığında ScrollTrigger'ı yeniden etkinleştir
        ScrollTrigger.getAll().forEach((trigger) => {
          trigger.enable();
        });
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("MSFullscreenChange", handleFullscreenChange);

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "mozfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "MSFullscreenChange",
        handleFullscreenChange
      );
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className="h-screen w-full flex items-center justify-center p-4 relative"
      id="tanitim-filmi"
    >
      <iframe
        ref={videoRef}
        width="100%"
        height="100%"
        src={videoUrl}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        className="h-full w-full object-cover rounded-4xl shadow-xl border-0"
      />
    </div>
  );
};

export default VideoIntroSection;
