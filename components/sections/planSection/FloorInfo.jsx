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
      className="w-full bg-gri py-10 font-quicksand"
      id="modeller"
    >
      <div className="max-w-10/12 mx-auto px-2">
        <div className="text-center mb-16 text-white">
          <h2 className="text-5xl md:text-[100px] font-bold mb-4">
            <span className="text-yesil">{t("header1")}</span> {t("header2")}
          </h2>
          <p className="text-4xl">{t("subheader")}</p>
        </div>
        <div className="space-y-12">
          {floorData.map((floor, index) => (
            <div
              key={floor.id}
              className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12"
            >
              {/* Resim - Sol taraf (2/3) */}
              <div
                ref={(el) => (imagesRef.current[index] = el)}
                className="w-full lg:w-4/5 "
              >
                <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-white">
                  <img
                    src={floor.image}
                    alt={floor.title}
                    className="w-full  object-cover"
                  />
                </div>
              </div>

              {/* Açıklama - Sağ taraf (1/3) */}
              <div
                ref={(el) => (textsRef.current[index] = el)}
                className="w-full lg:w-1/5"
              >
                <div className="space-y-4">
                  <h3 className="text-3xl lg:text-6xl font-bold text-yesil text-center">
                    {floor.title}
                  </h3>
                  <p className="text-2xl text-kahverengi text-balance ">
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
