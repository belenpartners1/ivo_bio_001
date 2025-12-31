"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import VideoModal from "../../video/VideoModal";
import { useTranslations } from "next-intl";

gsap.registerPlugin(ScrollTrigger);

const TechnicalSection = () => {
  const sectionRef = useRef(null);
  const panelsRef = useRef([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // JSON'dan tüm technicalData array'ini çek
  const t = useTranslations();
  const technicalDataRaw = t.raw("technicalData");

  // Array'e dönüştür ve id ekle
  const technicalData = Array.isArray(technicalDataRaw)
    ? technicalDataRaw.map((item, index) => ({
        ...item,
        id: index + 1,
      }))
    : [];

  useEffect(() => {
    // Mobil kontrolü
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    // Mobilde animasyon çalıştırma
    if (isMobile) {
      window.removeEventListener("resize", checkMobile);
      return;
    }

    const ctx = gsap.context(() => {
      const panels = panelsRef.current;

      // İlk paneli başlangıçta göster
      gsap.set(panels[0], { zIndex: 1 });
      gsap.set(panels[0].querySelector(".left-content"), { y: 0 });
      gsap.set(panels[0].querySelector(".right-content"), { y: 0 });

      panels.forEach((panel, i) => {
        if (i === 0) return; // İlk panel zaten görünür

        const leftContent = panel.querySelector(".left-content");
        const rightContent = panel.querySelector(".right-content");

        // Her panel için scroll trigger - daha uzun scrub ile smooth animasyon
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: () => `top+=${(i - 0.5) * window.innerHeight} top`,
          end: () => `top+=${i * window.innerHeight} top`,
          scrub: 2.5, // Daha yüksek scrub değeri = daha smooth animasyon
          onUpdate: (self) => {
            const progress = self.progress;

            // Panel z-index ayarla
            if (progress > 0.01) {
              gsap.set(panel, { zIndex: i + 1 });
            }

            // Sol taraf animasyonu - power2.inOut easing ile smooth geçiş
            gsap.to(leftContent, {
              y: `${100 - progress * 100}%`,
              ease: "power2.inOut",
              duration: 0,
            });

            // Sağ taraf animasyonu - çok daha geç başlama ve smooth easing
            // Delay artırıldı: 0.4'ten sonra başlıyor (önceden 0.2)
            const delayedProgress = Math.max(0, (progress - 0.4) / 0.6);
            gsap.to(rightContent, {
              y: `${100 - delayedProgress * 100}%`,
              ease: "power2.inOut", // Smooth easing
              duration: 0,
            });
          },
          onLeaveBack: () => {
            gsap.set(panel, { zIndex: 0 });
          },
        });
      });

      // Ana container'ı pin'le
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${panels.length * window.innerHeight}`,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
      });
    }, sectionRef);

    return () => {
      window.removeEventListener("resize", checkMobile);
      ctx.revert();
    };
  }, [isMobile]);

  return (
    <div
      ref={sectionRef}
      className={`w-full p-1 sm:p-2 font-quicksand bg-white ${
        isMobile ? "min-h-screen" : "h-screen relative"
      }`}
      id="teknik"
    >
      {technicalData.map((item, index) => (
        <div
          key={item.id}
          ref={(el) => (panelsRef.current[index] = el)}
          className={`w-full p-1 sm:p-2 ${
            isMobile
              ? "relative min-h-screen"
              : "absolute inset-0 h-full"
          }`}
          style={{
            zIndex: isMobile ? "auto" : index === 0 ? 1 : 0,
          }}
        >
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-1 sm:gap-2 ${isMobile ? "min-h-screen" : "h-full"}`}>
            {/* Sol Kolon - Yazı */}
            <div
              className="left-content col-span-1 px-4 pt-4 sm:px-6 sm:pt-8 md:px-10 md:pt-24 bg-white flex flex-col justify-center h-full relative overflow-y-auto md:overflow-visible"
              style={{
                transform: isMobile ? "translateY(0%)" : (index === 0 ? "translateY(0%)" : "translateY(100%)"),
              }}
            >
              <h1 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl text-start font-extrabold text-gray-700 my-2 md:my-4">
                {item.title}
              </h1>

              <div className="w-48 md:w-80 h-[1px] sm:h-[2px] bg-gray-300 my-2 md:my-4 "></div>

              <div className="flex flex-col items-center my-2 md:my-4">
                <p
                  className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-gray-700 text-start leading-relaxed "
                  dangerouslySetInnerHTML={{ __html: item.description }}
                />
              </div>
            </div>

            {/* Sağ Kolon - Görsel veya Video */}
            <div
              className="right-content col-span-1 md:col-span-2 bg-white h-full relative flex justify-center items-center overflow-hidden"
              style={{
                transform: isMobile ? "translateY(0%)" : (index === 0 ? "translateY(0%)" : "translateY(100%)"),
              }}
            >
              {item.video ? (
                <video
                  src={item.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-contain"
                />
              ) : (
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-contain"
                />
              )}
            </div>
          </div>
        </div>
      ))}

      <VideoModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedVideo(null);
        }}
        videoUrl={selectedVideo?.url}
      />
    </div>
  );
};

export default TechnicalSection;
