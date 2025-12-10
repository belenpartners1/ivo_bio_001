"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const VideoIntroSection = () => {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (!document.fullscreenElement) {
        videoRef.current.requestFullscreen().catch((err) => {
          console.error("Tam ekran hatası:", err);
        });
      } else {
        document.exitFullscreen();
      }
    }
  };

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;

    // Pin animasyonu - section yukarıda sabitlenir
    ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "+=100%", // Ekran yüksekliği kadar pin'li kalır
      pin: true,
      pinSpacing: true,
      scrub: 1,
    });

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

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className="h-screen w-full flex items-center justify-center p-4 relative"
      id="tanitim-filmi"
    >
      <video
        ref={videoRef}
        src="/ivovideo01.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="h-full w-full object-cover rounded-4xl shadow-xl"
      />

      {/* Video Kontrolleri */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
        {/* Ses Kontrolü */}
        <button
          onClick={toggleMute}
          className="bg-white/90 hover:bg-white backdrop-blur-sm p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
          aria-label={isMuted ? "Sesi Aç" : "Sesi Kapat"}
        >
          {isMuted ? (
            // Ses Kapalı İkonu
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-800"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
              />
            </svg>
          ) : (
            // Ses Açık İkonu
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-800"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
              />
            </svg>
          )}
        </button>

        {/* Tam Ekran Kontrolü */}
        <button
          onClick={toggleFullscreen}
          className="bg-white/90 hover:bg-white backdrop-blur-sm p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
          aria-label="Tam Ekran"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-800"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default VideoIntroSection;
