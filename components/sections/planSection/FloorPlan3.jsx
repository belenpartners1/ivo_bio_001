"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useTranslations } from "next-intl";

export default function FloorPlan3() {
  const [hovered, setHovered] = useState(null);
  const infoRef = useRef([]);
  const containerRef = useRef(null);
  const t = useTranslations("floorPlan3");

  const hotspots = [
    {
      id: 1,
      top: "32%",
      left: "65%",
      title: t("hotspots.0.title"),
      area: t("hotspots.0.area"),
      desc: t("hotspots.0.desc"),
    },
    {
      id: 2,
      top: "32%",
      left: "56%",
      title: t("hotspots.1.title"),
      area: t("hotspots.1.area"),
      desc: t("hotspots.1.desc"),
    },
    {
      id: 3,
      top: "34%",
      left: "44%",
      title: t("hotspots.2.title"),
      area: t("hotspots.2.area"),
      desc: t("hotspots.2.desc"),
    },
    {
      id: 4,
      top: "50%",
      left: "40%",
      title: t("hotspots.3.title"),
      area: t("hotspots.3.area"),
      desc: t("hotspots.3.desc"),
    },
    {
      id: 5,
      top: "46%",
      left: "34%",
      title: t("hotspots.4.title"),
      area: t("hotspots.4.area"),
      desc: t("hotspots.4.desc"),
    },
    {
      id: 6,
      top: "62%",
      left: "40%",
      title: t("hotspots.5.title"),
      area: t("hotspots.5.area"),
      desc: t("hotspots.5.desc"),
    },
    {
      id: 7,
      top: "68%",
      left: "47%",
      title: t("hotspots.6.title"),
      area: t("hotspots.6.area"),
      desc: t("hotspots.6.desc"),
    },
    {
      id: 8,
      top: "82%",
      left: "52%",
      title: t("hotspots.7.title"),
      area: t("hotspots.7.area"),
      desc: t("hotspots.7.desc"),
    },
    {
      id: 9,
      top: "84%",
      left: "70%",
      title: t("hotspots.8.title"),
      area: t("hotspots.8.area"),
      desc: t("hotspots.8.desc"),
    },
    {
      id: 10,
      top: "91%",
      left: "58%",
      title: t("hotspots.9.title"),
      area: t("hotspots.9.area"),
      desc: t("hotspots.9.desc"),
    },
    {
      id: 11,
      top: "90%",
      left: "46%",
      title: t("hotspots.10.title"),
      area: t("hotspots.10.area"),
      desc: t("hotspots.10.desc"),
    },
    {
      id: 12,
      top: "86%",
      left: "26%",
      title: t("hotspots.11.title"),
      area: t("hotspots.11.area"),
      desc: t("hotspots.11.desc"),
    },
    {
      id: 13,
      top: "86%",
      left: "36%",
      title: t("hotspots.12.title"),
      area: t("hotspots.12.area"),
      desc: t("hotspots.12.desc"),
    },
    {
      id: 14,
      top: "94%",
      left: "38%",
      title: t("hotspots.13.title"),
      area: t("hotspots.13.area"),
      desc: t("hotspots.13.desc"),
    },
    {
      id: 15,
      top: "19%",
      left: "45%",
      title: t("hotspots.14.title"),
      area: t("hotspots.14.area"),
      desc: t("hotspots.14.desc"),
    },
    {
      id: 16,
      top: "15%",
      left: "26%",
      title: t("hotspots.15.title"),
      area: t("hotspots.15.area"),
      desc: t("hotspots.15.desc"),
    },
    {
      id: 17,
      top: "15%",
      left: "35%",
      title: t("hotspots.16.title"),
      area: t("hotspots.16.area"),
      desc: t("hotspots.16.desc"),
    },
    {
      id: 18,
      top: "6%",
      left: "36%",
      title: t("hotspots.17.title"),
      area: t("hotspots.17.area"),
      desc: t("hotspots.17.desc"),
    },
    {
      id: 19,
      top: "10%",
      left: "44%",
      title: t("hotspots.18.title"),
      area: t("hotspots.18.area"),
      desc: t("hotspots.18.desc"),
    },
    {
      id: 20,
      top: "9%",
      left: "58%",
      title: t("hotspots.19.title"),
      area: t("hotspots.19.area"),
      desc: t("hotspots.19.desc"),
    },
    {
      id: 21,
      top: "14%",
      left: "68%",
      title: t("hotspots.20.title"),
      area: t("hotspots.20.area"),
      desc: t("hotspots.20.desc"),
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
    <div className="flex flex-col font-quicksand" id="plan">
      <div className="h-screen w-full relative overflow-hidden">
        <Image
          src="/ivo_yerlesim.svg"
          alt="plan"
          className="h-full w-auto object-cover object-left"
          width={1920}
          height={1080}
          priority
        />

        <div className="absolute bottom-20 md:right-24 p-4 md:p-0 flex flex-col justify-start items-start max-w-2xl">
          {/* Header Section */}
          <div className="text-left text-gray-700 font-quicksand">
            <h2 className="text-xl md:text-[40px] font-bold">
              {/* <span className="text-yesil"> {t("header1")} </span> */}
              {t("header2")}
            </h2>
          </div>

          {/* Description Section */}
          <div className="text-left text-gray-700 text-lg md:text-2xl font-quicksand">
            <p className="font-quicksand">{t("description")}</p>
          </div>
        </div>
      </div>

      {/* Main Container: Floor Plan + Information Side by Side */}
      <div className="w-full h-screen flex items-center justify-center px-2 py-4">
        <div className="w-full h-full max-w-7xl flex flex-col lg:flex-row gap-10 items-center">
          {/* Floor Plan Section - Sol taraf */}
          <div
            ref={containerRef}
            className="relative w-full lg:w-2/3 h-full flex flex-col justify-center items-center"
          >
            <Image
              src="/kesitler/ivo333-arkaplansiz.webp"
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
                {/* Hotspot - Pulse animasyonu */}
                <div className="relative">
                  <div className="absolute inset-0 md:w-8 md:h-8 w-6 h-6 bg-sari rounded-full animate-ping opacity-75" />
                  <div className="relative flex justify-center items-center md:w-8 md:h-8 w-6 h-6 bg-sari rounded-full shadow-lg border-2 border-white hover:scale-125 hover:bg-yesil transition-all duration-300 select-none">
                    <p className="text-kahverengi">{spot.id}</p>
                  </div>
                </div>

                {/* Information Box - 3D transform ve glassmorphism */}
                <div
                  ref={(el) => (infoRef.current[index] = el)}
                  className="absolute left-1/2 -translate-x-1/2 mt-6 w-64 bg-gradient-to-br from-gray-900 to-gray-800 border border-white/20 shadow-2xl rounded-2xl p-5 text-white opacity-0 pointer-events-none"
                  style={{
                    transformStyle: "preserve-3d",
                    perspective: "1000px",
                  }}
                >
                  <div className="relative z-10">
                    <h3 className="text-lg font-bold tracking-wide mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                      {spot.title}
                    </h3>
                    <p className="leading-relaxed text-white/90">{spot.desc}</p>
                    <div className="absolute -top-1 -right-1 w-12 h-12 bg-gradient-to-br from-red-500/30 to-transparent rounded-full blur-xl" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Information Plan Text - Sağ taraf */}
          <div className="w-full lg:w-2/5 h-full overflow-y-auto text-gray-800 font-quicksand font-bold px-2 lg:px-0 flex items-start lg:items-center py-4 lg:py-0">
            <div className="w-full flex flex-col justify-start items-start">
              <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-2 mb-4">
                <div className="p-2 flex items-center justify-between border-l-4 border-yesil bg-gray-50 rounded-r-lg hover:bg-yesil/10 transition-colors">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="font-bold shrink-0">1-)</span>
                    <span className="flex-1 truncate">{t("list.0.label")}</span>
                  </div>
                  <span className="text-yesil font-bold ml-2 whitespace-nowrap shrink-0">
                    {t("list.0.area")}
                  </span>
                </div>

                <div className="p-2 flex items-center justify-between border-l-4 border-yesil bg-gray-50 rounded-r-lg hover:bg-yesil/10 transition-colors">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="font-bold shrink-0">2-)</span>
                    <span className="flex-1 truncate">{t("list.1.label")}</span>
                  </div>
                  <span className="text-yesil font-bold ml-2 whitespace-nowrap shrink-0">
                    {t("list.1.area")}
                  </span>
                </div>

                <div className="p-2 flex items-center justify-between border-l-4 border-yesil bg-gray-50 rounded-r-lg hover:bg-yesil/10 transition-colors">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="font-bold shrink-0">3-)</span>
                    <span className="flex-1 truncate">{t("list.2.label")}</span>
                  </div>
                  <span className="text-yesil font-bold ml-2 whitespace-nowrap shrink-0">
                    {t("list.2.area")}
                  </span>
                </div>

                <div className="p-2 flex items-center justify-between border-l-4 border-yesil bg-gray-50 rounded-r-lg hover:bg-yesil/10 transition-colors">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="font-bold shrink-0">4-)</span>
                    <span className="flex-1 truncate">{t("list.3.label")}</span>
                  </div>
                  <span className="text-yesil font-bold ml-2 whitespace-nowrap shrink-0">
                    {t("list.3.area")}
                  </span>
                </div>

                <div className="p-2 flex items-center justify-between border-l-4 border-yesil bg-gray-50 rounded-r-lg hover:bg-yesil/10 transition-colors">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="font-bold shrink-0">5-)</span>
                    <span className="flex-1 truncate">{t("list.4.label")}</span>
                  </div>
                  <span className="text-yesil font-bold ml-2 whitespace-nowrap shrink-0">
                    {t("list.4.area")}
                  </span>
                </div>

                <div className="p-2 flex items-center justify-between border-l-4 border-yesil bg-gray-50 rounded-r-lg hover:bg-yesil/10 transition-colors">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="font-bold shrink-0">6-)</span>
                    <span className="flex-1 truncate">{t("list.5.label")}</span>
                  </div>
                  <span className="text-yesil font-bold ml-2 whitespace-nowrap shrink-0">
                    {t("list.5.area")}
                  </span>
                </div>

                <div className="p-2 flex items-center justify-between border-l-4 border-yesil bg-gray-50 rounded-r-lg hover:bg-yesil/10 transition-colors">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="font-bold shrink-0">7-)</span>
                    <span className="flex-1 truncate">{t("list.6.label")}</span>
                  </div>
                  <span className="text-yesil font-bold ml-2 whitespace-nowrap shrink-0">
                    {t("list.6.area")}
                  </span>
                </div>

                <div className="p-2 flex items-center justify-between border-l-4 border-yesil bg-gray-50 rounded-r-lg hover:bg-yesil/10 transition-colors">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="font-bold shrink-0">8-)</span>
                    <span className="flex-1 truncate">{t("list.7.label")}</span>
                  </div>
                  <span className="text-yesil font-bold ml-2 whitespace-nowrap shrink-0">
                    {t("list.7.area")}
                  </span>
                </div>

                <div className="p-2 flex items-center justify-between border-l-4 border-yesil bg-gray-50 rounded-r-lg hover:bg-yesil/10 transition-colors">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="font-bold shrink-0">9-)</span>
                    <span className="flex-1 truncate">{t("list.8.label")}</span>
                  </div>
                  <span className="text-yesil font-bold ml-2 whitespace-nowrap shrink-0">
                    {t("list.8.area")}
                  </span>
                </div>

                <div className="p-2 flex items-center justify-between border-l-4 border-yesil bg-gray-50 rounded-r-lg hover:bg-yesil/10 transition-colors">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="font-bold shrink-0">10-)</span>
                    <span className="flex-1 truncate">{t("list.9.label")}</span>
                  </div>
                  <span className="text-yesil font-bold ml-2 whitespace-nowrap shrink-0">
                    {t("list.9.area")}
                  </span>
                </div>

                <div className="p-2 flex items-center justify-between border-l-4 border-yesil bg-gray-50 rounded-r-lg hover:bg-yesil/10 transition-colors">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="font-bold shrink-0">11-)</span>
                    <span className="flex-1 truncate">
                      {t("list.10.label")}
                    </span>
                  </div>
                  <span className="text-yesil font-bold ml-2 whitespace-nowrap shrink-0">
                    {t("list.10.area")}
                  </span>
                </div>

                <div className="p-2 flex items-center justify-between border-l-4 border-yesil bg-gray-50 rounded-r-lg hover:bg-yesil/10 transition-colors">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="font-bold shrink-0">12-)</span>
                    <span className="flex-1 truncate">
                      {t("list.11.label")}
                    </span>
                  </div>
                  <span className="text-yesil font-bold ml-2 whitespace-nowrap shrink-0">
                    {t("list.11.area")}
                  </span>
                </div>

                <div className="p-2 flex items-center justify-between border-l-4 border-yesil bg-gray-50 rounded-r-lg hover:bg-yesil/10 transition-colors">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="font-bold shrink-0">13-)</span>
                    <span className="flex-1 truncate">
                      {t("list.12.label")}
                    </span>
                  </div>
                  <span className="text-yesil font-bold ml-2 whitespace-nowrap shrink-0">
                    {t("list.12.area")}
                  </span>
                </div>

                <div className="p-2 flex items-center justify-between border-l-4 border-yesil bg-gray-50 rounded-r-lg hover:bg-yesil/10 transition-colors">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="font-bold shrink-0">14-)</span>
                    <span className="flex-1 truncate">
                      {t("list.13.label")}
                    </span>
                  </div>
                  <span className="text-yesil font-bold ml-2 whitespace-nowrap shrink-0">
                    {t("list.13.area")}
                  </span>
                </div>

                <div className="p-2 flex items-center justify-between border-l-4 border-yesil bg-gray-50 rounded-r-lg hover:bg-yesil/10 transition-colors">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="font-bold shrink-0">15-)</span>
                    <span className="flex-1 truncate">
                      {t("list.14.label")}
                    </span>
                  </div>
                  <span className="text-yesil font-bold ml-2 whitespace-nowrap shrink-0">
                    {t("list.14.area")}
                  </span>
                </div>

                <div className="p-2 flex items-center justify-between border-l-4 border-yesil bg-gray-50 rounded-r-lg hover:bg-yesil/10 transition-colors">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="font-bold shrink-0">16-)</span>
                    <span className="flex-1 truncate">
                      {t("list.15.label")}
                    </span>
                  </div>
                  <span className="text-yesil font-bold ml-2 whitespace-nowrap shrink-0">
                    {t("list.15.area")}
                  </span>
                </div>

                <div className="p-2 flex items-center justify-between border-l-4 border-yesil bg-gray-50 rounded-r-lg hover:bg-yesil/10 transition-colors">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="font-bold shrink-0">17-)</span>
                    <span className="flex-1 truncate">
                      {t("list.16.label")}
                    </span>
                  </div>
                  <span className="text-yesil font-bold ml-2 whitespace-nowrap shrink-0">
                    {t("list.16.area")}
                  </span>
                </div>

                <div className="p-2 flex items-center justify-between border-l-4 border-yesil bg-gray-50 rounded-r-lg hover:bg-yesil/10 transition-colors">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="font-bold shrink-0">18-)</span>
                    <span className="flex-1 truncate">
                      {t("list.17.label")}
                    </span>
                  </div>
                  <span className="text-yesil font-bold ml-2 whitespace-nowrap shrink-0">
                    {t("list.17.area")}
                  </span>
                </div>

                <div className="p-2 flex items-center justify-between border-l-4 border-yesil bg-gray-50 rounded-r-lg hover:bg-yesil/10 transition-colors">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="font-bold shrink-0">19-)</span>
                    <span className="flex-1 truncate">
                      {t("list.18.label")}
                    </span>
                  </div>
                  <span className="text-yesil font-bold ml-2 whitespace-nowrap shrink-0">
                    {t("list.18.area")}
                  </span>
                </div>

                <div className="p-2 flex items-center justify-between border-l-4 border-yesil bg-gray-50 rounded-r-lg hover:bg-yesil/10 transition-colors">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="font-bold shrink-0">20-)</span>
                    <span className="flex-1 truncate">
                      {t("list.19.label")}
                    </span>
                  </div>
                  <span className="text-yesil font-bold ml-2 whitespace-nowrap shrink-0">
                    {t("list.19.area")}
                  </span>
                </div>

                <div className="p-2 flex items-center justify-between border-l-4 border-yesil bg-gray-50 rounded-r-lg hover:bg-yesil/10 transition-colors">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="font-bold shrink-0">21-)</span>
                    <span className="flex-1 truncate">
                      {t("list.20.label")}
                    </span>
                  </div>
                  <span className="text-yesil font-bold ml-2 whitespace-nowrap shrink-0">
                    {t("list.20.area")}
                  </span>
                </div>
              </div>

              {/* Toplam Alanlar - Alt kısım */}
              <div className="w-full mt-6 pt-4 border-t-2 border-yesil">
                <div className="flex flex-col gap-3">
                  <div className="p-3 flex items-center justify-between rounded-lg bg-gray-50 border-2 border-yesil">
                    <span className="font-bold text-base">
                      {t("list.21.label")}
                    </span>
                    <span className="text-yesil font-bold text-base">
                      {t("list.21.area")}
                    </span>
                  </div>
                  <div className="p-3 flex items-center justify-between bg-gray-50 rounded-lg border-2 border-yesil">
                    <span className="font-bold text-base">
                      {t("list.22.label")}
                    </span>
                    <span className="text-yesil font-bold text-base">
                      {t("list.22.area")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
