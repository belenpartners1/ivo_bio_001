"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FaqSection = () => {
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(null);

  // const faqs = [
  //   {
  //     question: "İVO BİO nedir ?",
  //     answer:
  //       "İVO BİO doğayla uyumlu, modüler, enerji dostu ve dört mevsim kullanılabilir yaşam alanları sunan modern bir konut çözümüdür. Eşsiz mimarisi ve sürdürülebilir yapısı ile konforlu yeni nesil bir yaşam alanı deneyimi sunar.",
  //   },
  //   {
  //     question: "İVO BİO yapıları hangi malzemelerle üretiliyor ?",
  //     answer:
  //       "İVO BİO modülleri; çelik konstrüksiyon, yüksek yalıtımlı paneller, Low-E camlar, doğa dostu iç kaplamalar ve geri dönüşümlü dış cephe malzemeleri ile üretilir.",
  //   },
  //   {
  //     question: "Dört mevsim kullanım için uygun mu ?",
  //     answer:
  //       "Evet, yaz kış ayrımı yapmadan İVO BİO'da yaşayabilirsiniz. Isı pompası, yüksek yalıtım, Low-E camlar ve isteğe bağlı yerden ısıtma ile yılın 12 ayı konforlu kullanım sağlar.  ",
  //   },
  //   {
  //     question: "Taşınabilir mi ?",
  //     answer:
  //       "Evet. Modüler yapısı sayesinde hem tekli hem çoklu modüller taşınabilir. Taşıma ve nakil süreçleri oldukça hızlıdır.",
  //   },

  //   {
  //     question: "Enerji ihtiyacı nasıl karşılanıyor ?",
  //     answer:
  //       "İVO BİO güneş panelleri, akıllı inverter sistemleri ve lityum batarya depolama ile enerji ihtiyacını kendi üretebilen bir yapıdır. Elektrik şebekesine bağlanmadan off-grid olarak da çalışabilir. Geleneksel yapılara göre %40–70 arası enerji tasarrufu sağlayabilir.",
  //   },
  //   {
  //     question: "Akıllı ev teknolojisine uyumlu mu ?",
  //     answer:
  //       "Evet uyumludur. Işıklar, ısıtma-soğutma sistemleri, enerji tüketimi, güvenlik kameraları ve kapı kontrolleri mobil uygulama üzerinden yönetilebilir.",
  //   },
  //   {
  //     question: "İVO BİO projeleri ne kadar sürede teslim edilir ?",
  //     answer:
  //       "Proje süreleri, projenin kapsamına göre değişiklik gösterir. İVO BİO'nun projeleri 3-4 hafta arasında teslim edilir.",
  //   },
  //   // {
  //   //   question: "Proje yasal izin gerektiriyor mu ?",
  //   //   answer:
  //   //     "Kullanım alanı ve belediye yönetmeliklerine göre değişir. Hafif yapı sınıfına girdiği için çoğu bölgede izin süreçleri kolaydır.",
  //   // },
  //   {
  //     question: "Destek hizmeti sunuyor musunuz ? Garanti süresi var mı ?",
  //     answer:
  //       "Evet, proje tesliminden sonraki 1 yıl boyunca ücretsiz destek ve bakım hizmeti sunuyoruz. Yapısal garanti 5 yıl, elektrik–mekanik sistemler için 2 yıl garanti sunulmaktadır. Destek hizmeti ile ilgili daha fazla bilgi almak isterseniz bize e-posta veya telefona yazabilirsiniz.",
  //   },
  // ];

  // useEffect(() => {
  //   const section = sectionRef.current;

  //   ScrollTrigger.create({
  //     trigger: section,
  //     start: "top top",
  //     end: "+=100%",
  //     pin: true,
  //     pinSpacing: true,
  //     anticipatePin: 1,
  //   });

  //   const faqItems = section.querySelectorAll(".faq-item");
  //   faqItems.forEach((item, index) => {
  //     gsap.fromTo(
  //       item,
  //       {
  //         opacity: 0,
  //         y: 50,
  //         scale: 0.95,
  //       },
  //       {
  //         opacity: 1,
  //         y: 0,
  //         scale: 1,
  //         duration: 0.8,
  //         ease: "power3.out",
  //         scrollTrigger: {
  //           trigger: section,
  //           start: "top top",
  //           end: "bottom top",
  //           scrub: 1,
  //           onEnter: () => {
  //             gsap.to(item, {
  //               opacity: 1,
  //               y: 0,
  //               scale: 1,
  //               duration: 0.6,
  //               delay: index * 0.1,
  //             });
  //           },
  //         },
  //       }
  //     );
  //   });

  //   gsap.fromTo(
  //     section.querySelector(".faq-title"),
  //     { opacity: 0, y: -30 },
  //     {
  //       opacity: 1,
  //       y: 0,
  //       duration: 1,
  //       ease: "power3.out",
  //       scrollTrigger: {
  //         trigger: section,
  //         start: "top center",
  //       },
  //     }
  //   );

  //   return () => {
  //     ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  //   };
  // }, []);

  const faqs = [
    {
      question: "İVO BİO nedir?",
      answer:
        "İVO BİO, doğayla uyumlu, modüler ve enerji dostu bir yaşam alanı sunan modern konut çözümüdür. Eşsiz mimarisi ve sürdürülebilir yapısıyla dört mevsim konforlu bir deneyim sağlar.",
    },
    {
      question: "İVO BİO yapıları hangi malzemelerle üretiliyor?",
      answer:
        "İVO BİO modülleri; çelik konstrüksiyon, yüksek yalıtımlı paneller, Low-E camlar, organik kompozit malzemeler ve doğa dostu iç-dış kaplamalar ile üretilir.",
    },
    {
      question: "Dört mevsim kullanım için uygun mu?",
      answer:
        "Evet. Isı pompası, yüksek yalıtım ve Low-E camlar sayesinde yılın 12 ayı konforlu kullanım sunar.",
    },
    {
      question: "Taşınabilir mi?",
      answer:
        "Evet. Modüler yapısı sayesinde tekli veya çoklu modüller kolayca taşınabilir ve hızlı kurulum imkânı sunar.",
    },
    {
      question: "Enerji ihtiyacı nasıl karşılanıyor?",
      answer:
        "İVO BİO, güneş panelleri, akıllı inverter ve lityum batarya sistemleriyle enerji ihtiyacını kendi karşılar. Elektrik şebekesine bağlanmadan off-grid olarak da çalışabilir. Geleneksel yapılara göre %40–70 enerji tasarrufu sağlar.",
    },
    {
      question: "Akıllı ev teknolojisine uyumlu mu?",
      answer:
        "Evet. Işıklar, ısıtma-soğutma, enerji yönetimi, güvenlik sistemleri ve kapı kontrolleri mobil uygulama üzerinden yönetilebilir.",
    },
    {
      question: "İVO BİO projeleri ne kadar sürede teslim edilir?",
      answer:
        "Projelerin teslim süresi, kapsamına göre değişir. İVO BİO modülleri genellikle 3-4 hafta içinde hazır hale gelir.",
    },
    {
      question: "Destek hizmeti sunuyor musunuz? Garanti süresi var mı?",
      answer:
        "Evet. Proje tesliminden sonra 1 yıl ücretsiz destek ve bakım hizmeti sunulmaktadır. Yapısal garanti 5 yıl, elektrik ve mekanik sistemler için 2 yıl garanti mevcuttur.",
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
      className="relative h-screen w-ful bg-gri flex items-center justify-center overflow-hidden font-quicksand"
      id="sss"
    >
      <div className="relative z-10 max-w-7xl w-full px-5 md:px-7">
        {/* Title */}
        <h2 className="faq-title text-3xl md:text-5xl font-bold text-white/90 text-center mb-6 md:mb-8">
          Sıkça Sorulan
          <span className="bg-clip-text"> Sorular</span>
        </h2>

        {/* FAQ Items */}
        <div className="space-y-2">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="faq-item bg-white/20 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:bg-white/10 hover:border-kahverengi"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full px-4 md:px-6 py-4 md:py-5 text-left flex items-center justify-between group cursor-pointer"
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
