"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FaqSection = () => {
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "Projeleriniz ne kadar sürede teslim edilir?",
      answer:
        "Proje süreleri, projenin kapsamına göre değişiklik gösterir. Ortalama bir web sitesi projesi 2-4 hafta içinde teslim edilmektedir.",
    },
    {
      question: "Hangi teknolojileri kullanıyorsunuz?",
      answer:
        "React, Next.js, GSAP, Three.js, Tailwind CSS gibi modern ve güncel teknolojiler kullanarak projeler geliştiriyoruz.",
    },
    {
      question: "Destek hizmeti sunuyor musunuz?",
      answer:
        "Evet, proje tesliminden sonra 3 ay ücretsiz destek ve bakım hizmeti sunuyoruz. Sonrasında aylık bakım paketlerimiz mevcuttur.",
    },
    {
      question: "Fiyatlandırma nasıl çalışıyor?",
      answer:
        "Her proje kendine özgüdür. Detaylı bir görüşme sonrası, ihtiyaçlarınıza özel teklif hazırlıyoruz.",
    },
  ];

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

    // Animate FAQ items
    const faqItems = section.querySelectorAll(".faq-item");
    faqItems.forEach((item, index) => {
      gsap.fromTo(
        item,
        {
          opacity: 0,
          y: 50,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: 1,
            onEnter: () => {
              gsap.to(item, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.6,
                delay: index * 0.1,
              });
            },
          },
        }
      );
    });

    // Animate title
    gsap.fromTo(
      section.querySelector(".faq-title"),
      { opacity: 0, y: -30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top center",
        },
      }
    );

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
      className="relative h-screen w-ful bg-gri flex items-center justify-center overflow-hidden font-quicksand"
    >
      <div className="relative z-10 max-w-4xl w-full px-6 md:px-8">
        {/* Title */}
        <h2 className="faq-title text-4xl md:text-6xl font-bold text-white/90 text-center mb-12 md:mb-16">
          Sıkça Sorulan
          <span className="bg-clip-text"> Sorular</span>
        </h2>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="faq-item bg-white/20 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:bg-white/10 hover:border-kahverengi"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full px-6 md:px-8 py-5 md:py-6 text-left flex items-center justify-between group cursor-pointer"
              >
                <span className="text-lg md:text-xl font-semibold text-kahverengi group-hover:text-kahverengi transition-colors">
                  {faq.question}
                </span>
                <div
                  className={`w-8 h-8 rounded-full bg-kahverengi flex items-center justify-center transition-transform duration-300 ${
                    activeIndex === index ? "rotate-180" : ""
                  }`}
                >
                  <svg
                    className="w-5 h-5 text-bej"
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
                  activeIndex === index ? "max-h-96" : "max-h-0"
                }`}
              >
                <div className="px-6 md:px-8 pb-5 md:pb-6 text-kahverengi text-base md:text-lg leading-relaxed">
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
