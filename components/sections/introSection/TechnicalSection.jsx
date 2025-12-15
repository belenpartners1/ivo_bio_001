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

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="h-screen w-full p-1 sm:p-2 relative bg-gri font-quicksand"
      id="teknik"
    >
      {technicalData.map((item, index) => (
        <div
          key={item.id}
          ref={(el) => (panelsRef.current[index] = el)}
          className="absolute inset-0 w-full h-full p-1 sm:p-2"
          style={{
            zIndex: index === 0 ? 1 : 0,
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-1 sm:gap-2 h-full">
            {/* Sol Kolon - Yazı */}
            <div
              className="left-content col-span-1 px-3 py-4 sm:px-4 sm:py-8 md:px-6 md:py-24 bg-white rounded-2xl sm:rounded-3xl flex flex-col justify-between h-full relative border border-gri/90 overflow-y-auto md:overflow-visible"
              style={{
                transform: index === 0 ? "translateY(0%)" : "translateY(100%)",
              }}
            >
              <h1 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl text-center font-extrabold text-gray-700">
                {item.title}
              </h1>
              <div className="w-full h-[1px] sm:h-[2px] bg-gray-300 mt-1 sm:mt-2"></div>

              <div className="flex flex-col items-center my-1 sm:my-2">
                <p
                  className="font-bold text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-kahverengi text-start leading-relaxed my-2 sm:my-4 md:my-8 lg:my-16"
                  dangerouslySetInnerHTML={{ __html: item.description }}
                />
                <div className="w-20 sm:w-32 md:w-40 h-[1px] sm:h-[2px] bg-gray-300 my-2 sm:my-4 md:my-6"></div>
              </div>

              {/* Alt dekoratif çizgiler - mobilde gizle */}
              <div className="hidden md:block absolute w-[2px] h-20 bg-gray-300 bottom-0 left-20"></div>
              <div className="hidden md:block absolute w-[2px] h-20 bg-gray-300 bottom-0 right-20"></div>

              {/* Sayfa numarası */}
              <div className="absolute bottom-2 sm:bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 text-kahverengi font-bold border-b-2 text-xs sm:text-sm md:text-base">
                {index + 1} / {technicalData.length}
              </div>
            </div>

            {/* Sağ Kolon - Görsel veya Video */}
            <div
              className="right-content col-span-1 md:col-span-2 bg-white h-full relative flex justify-center items-center overflow-hidden rounded-2xl sm:rounded-3xl"
              style={{
                transform: index === 0 ? "translateY(0%)" : "translateY(100%)",
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
