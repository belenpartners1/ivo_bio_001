import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";

gsap.registerPlugin(ScrollTrigger);

const FloorInfo = () => {
  const sectionRef = useRef(null);
  const imagesRef = useRef([]);
  const textsRef = useRef([]);
  const t = useTranslations("floorInfo");

  const floorData = [
    {
      id: 1,
      image: "/kesitler/ortografik-1-arkaplansiz.webp",
      title: t("models.0.title"),
      description: t("models.0.description"),
    },
    {
      id: 2,
      image: "/kesitler/ortografik-2-arkaplansiz.webp",
      title: t("models.1.title"),
      description: t("models.1.description"),
    },
    {
      id: 3,
      image: "/kesitler/ortografik-3-arkaplansiz.webp",
      title: t("models.2.title"),
      description: t("models.2.description"),
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      imagesRef.current.forEach((img, index) => {
        gsap.fromTo(
          img,
          {
            x: -100,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: img,
              start: "top 80%",
              end: "top 50%",
              scrub: 1,
            },
          }
        );
      });

      textsRef.current.forEach((text, index) => {
        gsap.fromTo(
          text,
          {
            x: 100,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: text,
              start: "top 80%",
              end: "top 50%",
              scrub: 1,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="w-full bg-gri py-10 md:py-16 font-quicksand"
      id="modeller"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-16 text-white">
          <h2 className="text-4xl md:text-7xl lg:text-[100px] font-bold mb-2 md:mb-4">
            <span className="text-yesil">{t("header1")}</span> {t("header2")}
          </h2>
          <p className="text-xl md:text-3xl lg:text-4xl">{t("subheader")}</p>
        </div>
        <div className="space-y-8 md:space-y-12 lg:space-y-16">
          {floorData.map((floor, index) => (
            <div
              key={floor.id}
              className="flex flex-col lg:flex-row items-center gap-6 md:gap-8 lg:gap-12"
            >
              {/* Resim - Sol taraf */}
              <div
                ref={(el) => (imagesRef.current[index] = el)}
                className="w-full lg:w-3/5"
              >
                <div className="relative overflow-hidden rounded-xl md:rounded-2xl shadow-2xl bg-white">
                  <img
                    src={floor.image}
                    alt={floor.title}
                    className="w-full object-cover"
                  />
                </div>
              </div>

              {/* Açıklama - Sağ taraf */}
              <div
                ref={(el) => (textsRef.current[index] = el)}
                className="w-full lg:w-2/5"
              >
                <div className="space-y-3 md:space-y-4">
                  <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold text-yesil text-center lg:text-left">
                    {floor.title}
                  </h3>
                  <p className="text-lg md:text-xl lg:text-xl text-kahverengi text-balance text-center lg:text-left leading-relaxed">
                    {floor.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FloorInfo;
