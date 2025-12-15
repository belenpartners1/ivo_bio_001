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
      className="w-full bg-gri py-10 md:py-16 lg:py-24 font-quicksand relative overflow-hidden"
      id="modeller"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-64 h-64 bg-yesil rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-yesil rounded-full blur-3xl"></div>
      </div>

      <div className="px-4 md:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 md:mb-16 lg:mb-20 text-white">
          <h2 className="text-4xl md:text-7xl lg:text-[100px] font-bold mb-2 md:mb-4">
            <span className="text-yesil">{t("header1")}</span> {t("header2")}
          </h2>
          <p className="text-xl md:text-3xl lg:text-4xl">{t("subheader")}</p>
        </div>

        <div className="space-y-16 md:space-y-20 lg:space-y-32">
          {floorData.map((floor, index) => (
            <div key={floor.id} className="group">
              <div className="relative rounded-2xl md:rounded-3xl overflow-hidden  transition-all duration-500">
                {/* Decorative corner accent */}
                <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-yesil rounded-bl-full opacity-80"></div>

                <div className="flex flex-col lg:flex-row items-center lg:items-stretch">
                  {/* Resim - Sol taraf */}
                  <div
                    ref={(el) => (imagesRef.current[index] = el)}
                    className="w-full lg:w-3/5 relative p-4 md:p-6 lg:p-8"
                  >
                    <div className="relative overflow-hidden rounded-xl md:rounded-2xl shadow-xl">
                      <img
                        src={floor.image}
                        alt={floor.title}
                        className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  </div>

                  {/* Açıklama - Sağ taraf */}
                  <div
                    ref={(el) => (textsRef.current[index] = el)}
                    className="w-full lg:w-2/5 p-6 md:p-8 lg:p-12 flex flex-col justify-center relative"
                  >
                    <div className="space-y-4 md:space-y-6">
                      {/* Title with accent line */}
                      <div className="space-y-3">
                        <div className="w-16 h-1 bg-gradient-to-r from-yesil to-kahverengi"></div>
                        <h3 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-yesil text-left leading-tight">
                          {floor.title}
                        </h3>
                      </div>

                      {/* Description */}
                      <p className="text-base md:text-lg lg:text-xl text-white/90 text-left leading-relaxed">
                        {floor.description}
                      </p>

                      {/* Decorative bottom element with numbered dots */}
                      <div className="pt-4 flex items-center gap-3">
                        <div className="flex-1 h-px bg-yesil"></div>
                        {Array.from({ length: floor.id }).map((_, i) => (
                          <div
                            key={i}
                            className={`w-4 h-4 rounded-full bg-yesil transition-opacity duration-300 `}
                          ></div>
                        ))}
                      </div>
                    </div>
                  </div>
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
