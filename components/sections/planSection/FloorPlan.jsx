"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useTranslations } from "next-intl";

export default function FloorPlan() {
  const [hovered, setHovered] = useState(null);
  const infoRef = useRef([]);
  const containerRef = useRef(null);
  const t = useTranslations("floorPlan");

  const hotspots = [
    {
      id: 1,
      top: "55%",
      left: "28%",
      title: t("hotspots.0.title"),
      area: t("hotspots.0.area"),
      desc: t("hotspots.0.desc"),
    },
    {
      id: 2,
      top: "45%",
      left: "50%",
      title: t("hotspots.1.title"),
      area: t("hotspots.1.area"),
      desc: t("hotspots.1.desc"),
    },
    {
      id: 3,
      top: "65%",
      left: "52%",
      title: t("hotspots.2.title"),
      area: t("hotspots.2.area"),
      desc: t("hotspots.2.desc"),
    },
    {
      id: 4,
      top: "65%",
      left: "68%",
      title: t("hotspots.3.title"),
      area: t("hotspots.3.area"),
      desc: t("hotspots.3.desc"),
    },
    {
      id: 5,
      top: "48%",
      left: "78%",
      title: t("hotspots.4.title"),
      area: t("hotspots.4.area"),
      desc: t("hotspots.4.desc"),
    },
    {
      id: 6,
      top: "42%",
      left: "68%",
      title: t("hotspots.5.title"),
      area: t("hotspots.5.area"),
      desc: t("hotspots.5.desc"),
    },
    {
      id: 7,
      top: "32%",
      left: "58%",
      title: t("hotspots.6.title"),
      area: t("hotspots.6.area"),
      desc: t("hotspots.6.desc"),
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
    <div
      className="flex flex-col justify-center items-center font-quicksand"
      id="plan"
    >
      {/* Header Section */}
      <div className="text-center text-white font-quicksand">
        <h2 className="text-5xl md:text-[100px] font-bold mb-4">
          <span className="text-yesil"> {t("header1")} </span>
          {t("header2")}
        </h2>
      </div>

      {/* Description Section */}
      <div className="text-center text-kahverengi text-2xl md:text-4xl font-quicksand max-w-4xl mt-10">
        <p className="font-quicksand">{t("description")}</p>
      </div>

      {/* Floor Plan Section */}
      <div
        ref={containerRef}
        className="relative w-full mx-auto aspect-[3/2] flex flex-col justify-center items-center"
      >
        {/* Container'a aspect-ratio ekleyerek responsive boyutlandırma */}
        <Image
          src="/kesitler/plan-3-arkaplansiz3.webp"
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
              <div className="absolute inset-0 md:w-8 md:h-8 w-6 h-6 bg-sari rounded-full animate-ping opacity-75" />
              <div
                className="relative flex justify-center items-center md:w-8 md:h-8 w-6 h-6 bg-sari   rounded-full shadow-lg border-2 border-white
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

        {/* Info Text Area */}

        <div className="hidden md:block md:absolute md:-translate-x-1/2 md:-translate-y-1/2 md:top-5/6 md:left-1/2 text-gray-800 font-quicksand font-bold mt-2">
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-1 rounded-2xl p-2">
            <li className="p-2 flex items-center justify-center border-b md:border-b-0 md:border-r border-yesil">
              1-) {t("list.0.label")} {t("list.0.area")}
            </li>

            <li className="p-2 flex items-center justify-center border-b md:border-b-0 md:border-r border-yesil">
              2-) {t("list.1.label")} {t("list.1.area")}
            </li>

            <li className="p-2 flex items-center justify-center">
              3-) {t("list.2.label")} {t("list.2.area")}
            </li>

            <li className="p-2 flex items-center justify-center border-b md:border-b-0 md:border-r border-yesil">
              4-) {t("list.3.label")} {t("list.3.area")}
            </li>

            <li className="p-2 flex items-center justify-center border-b md:border-b-0 md:border-r border-yesil">
              5-) {t("list.4.label")} {t("list.4.area")}
            </li>
            <li className="p-2 flex items-center justify-center ">
              6-) {t("list.5.label")} {t("list.5.area")}
            </li>
            <li className="p-2 flex items-center justify-center border-b md:border-b-0 md:border-r border-yesil">
              7-) {t("list.6.label")} {t("list.6.area")}
            </li>
            <li className="p-2 flex items-center justify-center border-b md:border-b-0 md:border-r border-yesil">
              8-) {t("list.7.label")} {t("list.7.area")}
            </li>
            <li className="p-2 flex items-center justify-center ">
              9-) {t("list.8.label")} {t("list.8.area")}
            </li>
          </ul>
        </div>
      </div>

      {/* Information Plan Text */}

      <div className="md:hidden w-full max-w-6xl mx-auto text-gray-800 font-quicksand font-bold mt-2">
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-1 rounded-2xl p-2">
          <li className="p-2 flex items-center justify-center border-b md:border-b-0 md:border-r border-yesil">
            1-) {t("list.0.label")} {t("list.0.area")}
          </li>

          <li className="p-2 flex items-center justify-center border-b md:border-b-0 md:border-r border-yesil">
            2-) {t("list.1.label")} {t("list.1.area")}
          </li>

          <li className="p-2 flex items-center justify-center border-b md:border-b-0 md:border-r border-yesil">
            3-) {t("list.2.label")} {t("list.2.area")}
          </li>

          <li className="p-2 flex items-center justify-center border-b md:border-b-0 md:border-r border-yesil">
            4-) {t("list.3.label")} {t("list.3.area")}
          </li>

          <li className="p-2 flex items-center justify-center border-b md:border-b-0 md:border-r border-yesil">
            5-) {t("list.4.label")} {t("list.4.area")}
          </li>
          <li className="p-2 flex items-center justify-center border-b md:border-b-0 md:border-r border-yesil">
            6-) {t("list.5.label")} {t("list.5.area")}
          </li>
          <li className="p-2 flex items-center justify-center border-b md:border-b-0 md:border-r border-yesil">
            7-) {t("list.6.label")} {t("list.6.area")}
          </li>
          <li className="p-2 flex items-center justify-center border-b md:border-b-0 md:border-r border-yesil">
            8-) {t("list.7.label")} {t("list.7.area")}
          </li>
          <li className="p-2 flex items-center justify-center border-b md:border-b-0 md:border-r border-yesil">
            9-) {t("list.8.label")} {t("list.8.area")}
          </li>
        </ul>
      </div>
    </div>
  );
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
