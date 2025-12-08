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
      top: "55%",
      left: "28%",
      title: "Yaşam Alanı - 28.50 m²",
      desc: "Geniş ve ferah yaşam alanı, doğal ışığın hâkim olduğu konforlu bir atmosfer sunar.",
    },
    {
      id: 2,
      top: "45%",
      left: "50%",
      title: "Giriş Holü, Koridor - 8.50 m²",
      desc: "Evin ilk izlenimini güçlendiren fonksiyonel ve rahat bir karşılama alanıdır.",
    },
    {
      id: 3,
      top: "65%",
      left: "52%",
      title: "Yatak Odası - 7.00 m²",
      desc: "Dinlenme odaklı kompakt yapısıyla düzenli ve sakin bir yaşam alanı oluşturur.",
    },
    {
      id: 4,
      top: "65%",
      left: "68%",
      title: "Banyo - 6.00 m²",
      desc: "Modern ve ergonomik tasarımıyla günlük ihtiyaçlara pratik çözümler sunar.",
    },
    {
      id: 5,
      top: "48%",
      left: "78%",
      title: "Ebeveyn Yatak Odası - 13.00 m²",
      desc: "Geniş kullanım alanı ve düzenli depolama fırsatlarıyla konforlu bir özel yaşam odasıdır.",
    },
    {
      id: 6,
      top: "42%",
      left: "68%",
      title: "Teknik Odası - 3.00 m²",
      desc: "Erişime uygun teknik alan.",
    },
    {
      id: 7,
      top: "32%",
      left: "58%",
      title: "Giriş Sahanlığı - 6.00 m²",
      desc: "",
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
            duration: 0.8,
            ease: "elastic.out(1, 0.75)",
          });
        } else {
          gsap.to(el, {
            autoAlpha: 0,
            scale: 0.9,
            y: -10,
            rotateX: -15,
            duration: 0.5,
            ease: "power2.in",
          });
        }
      });
    },
    { dependencies: [hovered], scope: containerRef }
  );

  return (
    <div className="flex flex-col justify-center items-center" id="plan">
      <div className="text-center text-white font-quicksand">
        <h2 className="text-5xl md:text-[100px] font-bold mb-4">
          <span className="text-yesil">İVO Bio</span> Yerleşim Planı
        </h2>
        {/* <p className="text-4xl">Yerleşim Planı</p> */}
      </div>

      <div className="text-center text-kahverengi text-2xl font-quicksand max-w-4xl mt-10">
        <p>
          72.00 m² net kullanım alanına sahip İVO Bio, 90.00 m² brüt alana
          sahiptir. 2+1 açık mutfak konseptinde özenle tasarlanmıştır. Ferah
          oturma alanı ve işlevsel depolama çözümleriyle konforlu bir yaşam
          sunacak şekilde planlanmıştır.
        </p>
      </div>
      <div
        ref={containerRef}
        className="relative w-full mx-auto aspect-[3/2] flex flex-col justify-center items-center"
      >
        {/* Container'a aspect-ratio ekleyerek responsive boyutlandırma */}
        <Image
          src="/kesitler/plan-3-arkaplansiz2.webp"
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
              <div className="absolute inset-0 w-8 h-8 bg-sari rounded-full animate-ping opacity-75" />
              <div
                className="relative flex justify-center items-center w-8 h-8 bg-sari   rounded-full shadow-lg border-2 border-white 
              hover:scale-125 hover:bg-yesil transition-all duration-300 select-none"
              >
                <p className="text-kahverengi">{spot.id}</p>
              </div>
            </div>

            {/* Information Box - 3D transform ve glassmorphism */}

            <div
              ref={(el) => (infoRef.current[index] = el)}
              className="absolute left-1/2 -translate-x-1/2 mt-6
    w-64 
    bg-gradient-to-br from-gray-900/70 to-gray-800/40
    backdrop-blur-xl border border-white/10
    shadow-2xl rounded-2xl p-5 text-white
    opacity-0 pointer-events-none
    before:absolute before:inset-0 before:rounded-2xl
    before:bg-gradient-to-br before:from-gray-700/40 before:to-transparent
    before:opacity-0 hover:before:opacity-100 before:transition-opacity"
              style={{
                transformStyle: "preserve-3d",
                perspective: "1000px",
              }}
            >
              <div className="relative z-10">
                <h3
                  className="text-lg font-bold tracking-wide mb-2
      bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
                >
                  {spot.title}
                </h3>

                <p className="leading-relaxed text-white/90">{spot.desc}</p>

                {/* Dekoratif element */}
                <div
                  className="absolute -top-1 -right-1 w-12 h-12
      bg-gradient-to-br from-red-500/30 to-transparent
      rounded-full blur-xl"
                />
              </div>
            </div>
          </div>
        ))}

        <div className="absolute -translate-x-1/2 -translate-y-1/2 top-5/6 left-1/2 text-gray-800 font-quicksand font-bold mt-2">
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-1 rounded-2xl p-2">
            <li className="p-2 flex items-center justify-center border-b md:border-b-0 md:border-r border-yesil">
              1-) Yaşam Alanı 28.50 m²
            </li>

            <li className="p-2 flex items-center justify-center border-b md:border-b-0 md:border-r border-yesil">
              2-) Giriş Holü - Koridor 8.50 m²
            </li>

            <li className="p-2 flex items-center justify-center">
              3-) Yatak Odası 6.90 m²
            </li>

            <li className="p-2 flex items-center justify-center border-b md:border-b-0 md:border-r border-yesil">
              4-) Banyo 6.00 m²
            </li>

            <li className="p-2 flex items-center justify-center border-b md:border-b-0 md:border-r border-yesil">
              5-) Ebeveyn Y.Odası 13.00 m²
            </li>
            <li className="p-2 flex items-center justify-center ">
              6-) Teknik Odası 3.00 m²
            </li>
            <li className="p-2 flex items-center justify-center border-b md:border-b-0 md:border-r border-yesil">
              7-) Giriş Sahanlığı 6.00 m²
            </li>
            <li className="p-2 flex items-center justify-center border-b md:border-b-0 md:border-r border-yesil">
              8-) Net 72.00 m²
            </li>
            <li className="p-2 flex items-center justify-center ">
              9-) Brüt 90.00 m²
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
