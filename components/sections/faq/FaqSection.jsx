"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";

gsap.registerPlugin(ScrollTrigger);

const FaqSection = () => {
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const t = useTranslations("faq");

  const faqs = Array.from({ length: 6 }, (_, i) => ({
    question: t(`questions.${i}.question`),
    answer: t(`questions.${i}.answer`),
  }));

  useEffect(() => {
    const section = sectionRef.current;

    // Pin the section
    ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "+=100%",
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
    });

    // Animate title
    gsap.fromTo(
      section.querySelector(".faq-title"),
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );

    // Animate FAQ items with simple fade in
    const faqItems = section.querySelectorAll(".faq-item");
    faqItems.forEach((item, index) => {
      gsap.fromTo(
        item,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          delay: index * 0.1,
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div
      ref={sectionRef}
      className="relative min-h-screen w-full bg-gri flex items-center justify-center overflow-hidden font-quicksand py-12 md:py-16"
      id="sss"
    >
      <div className="relative z-10 max-w-4xl w-full px-4 md:px-6 lg:px-8">
        {/* Title */}
        <h2 className="faq-title text-3xl md:text-4xl lg:text-5xl font-bold text-white/90 text-center mb-6 md:mb-8 lg:mb-10">
          {t("title")}
          <span className="bg-clip-text"> {t("subtitle")}</span>
        </h2>

        {/* FAQ Items */}
        <div className="space-y-3 md:space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="faq-item bg-white/20 backdrop-blur-lg border border-white/10 rounded-xl md:rounded-2xl overflow-hidden transition-all duration-300 hover:bg-white/10 hover:border-kahverengi"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full px-4 md:px-6 py-3.5 md:py-4 lg:py-5 text-left flex items-center justify-between gap-3 group cursor-pointer"
              >
                <span className="text-base md:text-lg lg:text-xl font-semibold text-kahverengi group-hover:text-kahverengi transition-colors pr-2">
                  {faq.question}
                </span>
                <div
                  className={`w-7 h-7 md:w-8 md:h-8 shrink-0 rounded-full bg-kahverengi flex items-center justify-center transition-transform duration-300 ${
                    activeIndex === index ? "rotate-180" : ""
                  }`}
                >
                  <svg
                    className="w-4 h-4 md:w-5 md:h-5 text-bej"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  activeIndex === index ? "max-h-[500px]" : "max-h-0"
                }`}
              >
                <div className="px-4 md:px-6 lg:px-8 pb-4 md:pb-5 lg:pb-6 text-kahverengi text-sm md:text-base lg:text-lg leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FaqSection;
