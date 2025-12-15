"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React, { useEffect, useRef } from "react";

const PricingSection = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  const t = useTranslations("pricing");

  useEffect(() => {
    // GSAP animasyonları için hazırlık
    const cards = cardsRef.current;

    // Kartları başlangıçta görünmez yap
    cards.forEach((card, index) => {
      if (card) {
        card.style.opacity = "0";
        card.style.transform = "translateY(50px)";
      }
    });

    // Intersection Observer ile scroll animasyonu
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Kartları sırayla animate et
            cards.forEach((card, index) => {
              if (card) {
                setTimeout(() => {
                  card.style.transition =
                    "all 1.2s cubic-bezier(0.4, 0, 0.2, 1)";
                  card.style.opacity = "1";
                  card.style.transform = "translateY(0)";
                }, index * 400);
              }
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const plansData = [
    {
      image: "/icons/empty_icon.png",
      planImage: "/kesitler/plan-1-arkaplansiz.webp",
      index: 0,
    },
    {
      image: "/icons/light_icon.png",
      planImage: "/kesitler/plan-2-arkaplansiz.webp",
      index: 1,
    },
    {
      image: "/icons/full_icon.png",
      planImage: "/kesitler/plan-3-arkaplansiz.webp",
      index: 2,
    },
  ];

  return (
    <div className="min-h-screen w-full bg-gri flex items-center justify-center p-10 font-quicksand font-bold">
      <div ref={sectionRef} className="max-w-7xl w-full">
        {/* <div className="text-center mb-16 text-white">
          <h2 className="text-5xl md:text-[100px] font-bold mb-4">
            <span className="text-yesil">İVO Bio</span> Modelleri
          </h2>
          <p className="text-4xl">Size en uygun planı seçebilirsiniz</p>
        </div> */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {plansData.map((plan, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className="group"
            >
              <div className="h-full rounded-4xl bg-white text-kahverengi transition-all duration-500 overflow-hidden shadow-lg border border-yesil flex flex-col p-6">
                <div className="w-full flex justify-center items-center overflow-hidden p-2">
                  <img
                    src={plan.image}
                    alt={t(`plans.${plan.index}.name`)}
                    className="w-full p-2 object-cover"
                  />
                </div>

                <h3 className="text-3xl font-bold text-center">
                  {t(`plans.${plan.index}.name`)}
                </h3>
                {/* <div className="mb-2">
                      <span className="text-5xl font-bold">{t(`plans.${plan.index}.price`)}</span>
                      <span className="text-lg">{t(`plans.${plan.index}.period`)}</span>
                    </div> */}

                <div className="flex flex-col gap-6">
                  <p className="h-12 text-xl text-center mt-2">
                    {t(`plans.${plan.index}.description`)}
                  </p>

                  <div>
                    <Image
                      src={plan.planImage}
                      alt="arrow"
                      width={1920}
                      height={1080}
                      className="w-96"
                    />
                  </div>

                  <ul className="space-y-1 text-left">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <li key={i} className="flex items-center">
                        <span className="text-yesil mr-3 text-xl font-bold">
                          ✓
                        </span>
                        {t(`plans.${plan.index}.features.${i}`)}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* <button className="w-full bg-black text-white font-semibold py-3 px-6 rounded-full hover:bg-gray-800 transition-all duration-300 mb-8">
                      Başla
                    </button> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingSection;
