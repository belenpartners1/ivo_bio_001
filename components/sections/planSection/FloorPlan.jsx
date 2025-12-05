"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function FloorPlan() {
  const [hovered, setHovered] = useState(null);
  const infoRef = useRef([]);
  const containerRef = useRef(null);

  const hotspots = [
    {
      id: 1,
      top: "30%",
      left: "40%",
      title: "Oturma Alanı",
      desc: "Geniş ve ferah oturma alanı, doğal ışıkla bütünleşen bir tasarım sunar.",
    },
    {
      id: 2,
      top: "60%",
      left: "70%",
      title: "Mutfak Çözümü",
      desc: "Ergonomik ve kompakt mutfak düzeni, verimli kullanım alanı sağlar.",
    },
    {
      id: 3,
      top: "45%",
      left: "20%",
      title: "Depolama Alanı",
      desc: "Eşyalar için akıllı depolama çözümü, düzenli bir yaşam alanı oluşturur.",
    },
  ];

  // GSAP hover animasyonu - useGSAP kullanarak daha performanslı
  useGSAP(
    () => {
      hotspots.forEach((spot, index) => {
        const el = infoRef.current[index];
        if (!el) return;

        if (hovered === spot.id) {
          gsap.to(el, {
            autoAlpha: 1,
            scale: 1,
            y: 0,
            rotateX: 0,
            duration: 0.6,
            ease: "elastic.out(1, 0.75)",
          });
        } else {
          gsap.to(el, {
            autoAlpha: 0,
            scale: 0.9,
            y: -10,
            rotateX: -15,
            duration: 0.3,
            ease: "power2.in",
          });
        }
      });
    },
    { dependencies: [hovered], scope: containerRef }
  );

  return (
    <div ref={containerRef} className="relative w-full  mx-auto aspect-[3/2]">
      {/* Container'a aspect-ratio ekleyerek responsive boyutlandırma */}
      <Image
        src="/plan.png"
        alt="İç mimari plan"
        fill
        className="object-contain"
        priority
      />

      {hotspots.map((spot, index) => (
        <div
          key={spot.id}
          style={{ top: spot.top, left: spot.left }}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          onMouseEnter={() => setHovered(spot.id)}
          onMouseLeave={() => setHovered(null)}
        >
          {/* Hotspot - Pulse animasyonu ekleyelim */}
          <div className="relative">
            <div className="absolute inset-0 w-6 h-6 bg-white rounded-full animate-ping opacity-75" />
            <div
              className="relative flex justify-center items-center w-6 h-6 bg-yesil rounded-full shadow-lg border-2 border-white 
              hover:scale-125 hover:bg-yesil transition-all duration-300"
            >
              <p>{spot.id}</p>
            </div>
          </div>

          {/* Information Box - 3D transform ve glassmorphism */}
          <div
            ref={(el) => (infoRef.current[index] = el)}
            className="absolute left-1/2 -translate-x-1/2 mt-6
              w-64 bg-gradient-to-br from-white/25 to-white/10
              backdrop-blur-2xl border border-white/40
              shadow-2xl rounded-2xl p-5 text-white
              opacity-0 pointer-events-none
              before:absolute before:inset-0 before:rounded-2xl
              before:bg-gradient-to-br before:from-white/20 before:to-transparent
              before:opacity-0 hover:before:opacity-100 before:transition-opacity"
            style={{
              transformStyle: "preserve-3d",
              perspective: "1000px",
            }}
          >
            <div className="relative z-10">
              <h3
                className="text-base font-bold tracking-wide mb-2
                bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent"
              >
                {spot.title}
              </h3>
              <p className="text-sm leading-relaxed text-gray-100/90">
                {spot.desc}
              </p>
              {/* Dekoratif element */}
              <div
                className="absolute -top-1 -right-1 w-12 h-12
                bg-gradient-to-br from-red-500/20 to-transparent
                rounded-full blur-xl"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
