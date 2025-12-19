import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useTranslations } from "next-intl";

gsap.registerPlugin(ScrollTrigger);

const IntroSection = () => {
  const sectionsRef = useRef([]);
  const titleRef = useRef(null);

  const t = useTranslations("introduceIvoBio");

  useEffect(() => {
    // Başlık animasyonu - ilk card geldiğinde kaybolsun
    gsap.to(titleRef.current, {
      scrollTrigger: {
        trigger: sectionsRef.current[0],
        start: "top bottom",
        end: "top center",
        scrub: 2,
      },
      opacity: 0,
      y: -100,
      ease: "none",
    });

    sectionsRef.current.forEach((section, index) => {
      if (!section) return;

      const isLastSection = index === sectionsRef.current.length - 1;

      // Son section hariç hepsini pin'le
      gsap.to(section, {
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: isLastSection ? "bottom center" : "bottom top",
          scrub: 1,
          pin: !isLastSection,
          pinSpacing: false,
        },
        scale: isLastSection ? 1 : 0.8,
        opacity: isLastSection ? 1 : 0,
        y: isLastSection ? -200 : 0,
        ease: "none",
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const sections = [
    {
      title: "section1.header",
      subtitle: "section1.title",
      image: "/info1/1.webp",
      position: "left",
    },
    {
      title: "section2.header",
      subtitle: "section2.title",
      image: "/info1/2.webp",
      position: "right",
    },
    {
      title: "section3.header",
      subtitle: "section3.title",
      image: "/info1/3.webp",
      position: "left",
    },
    {
      title: "section4.header",
      subtitle: "section4.title",
      image: "/info1/4.webp",
      position: "right",
    },
    {
      title: "section5.header",
      subtitle: "section5.title",
      image: "/info1/5.webp",
      position: "left",
    },
    {
      title: "section6.header",
      subtitle: "section6.title",
      image: "/info1/8.webp",
      position: "right",
    },
    {
      title: "section7.header",
      subtitle: "section7.title",
      image: "/info1/7.webp",
      position: "left",
    },

    {
      title: "section8.header",
      subtitle: "section8.title",
      image: "/info1/6.webp",
      position: "right",
    },
  ];

  return (
    <div className="bg-gri relative" id="intro">
      {/* Başlık - Scroll ile kaybolacak */}
      <div
        ref={titleRef}
        className="h-screen flex flex-col items-center justify-center gap-10 sticky top-0 z-10 md:p-20 p-10"
      >
        <h1 className="font-quicksand text-[100px] md:text-[170px] font-bold text-center leading-tight text-white">
          <span className="text-yesil"> {t("header1")}</span> <br />
          {t("header2")}
        </h1>
      </div>

      {sections.map((section, index) => (
        <div
          key={index}
          ref={(el) => (sectionsRef.current[index] = el)}
          className="h-screen w-full "
        >
          <div className="flex flex-col md:flex-row items-center justify-center bg-white/30 relative z-20">
            {/* Sol Kısım */}
            {section.position === "left" && (
              <div className="flex-4 flex flex-col gap-3 sm:gap-4 md:gap-6 order-2 md:order-1 p-4 md:p-8">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white font-quicksand text-left">
                  {t(section.title)}
                </h2>
                <div className="w-full h-[0.5px] bg-white"></div>
                <p className="text-base sm:text-lg md:text-lg lg:text-xl xl:text-2xl text-slate-500 font-quicksand text-left">
                  {t(section.subtitle)}
                </p>
              </div>
            )}

            {/* Orta - Card */}
            <div className="flex-12 flex w-full md:w-auto order-1 md:order-2 max-h-[40vh] md:max-h-none">
              {section.position === "right" && (
                <div className="hidden md:block md:w-1/12 bg-white"></div>
              )}
              <Image
                src={section.image}
                alt="Picture of the author"
                width={1920}
                height={1080}
                className="object-cover shadow-2xl w-full md:w-11/12 h-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-6xl"
              />
              {section.position === "left" && (
                <div className="hidden md:block md:w-1/12 bg-white/30"></div>
              )}
            </div>
            {/* Sağ Kısım */}
            {section.position === "right" && (
              <div className="flex-4 flex flex-col gap-3 sm:gap-4 md:gap-6 order-2 md:order-3 p-4 md:p-8">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white font-quicksand text-right">
                  {t(section.title)}
                </h2>
                <div className="w-full h-[0.5px] bg-white"></div>
                <p className="text-base sm:text-lg md:text-lg lg:text-xl xl:text-2xl text-slate-500 font-quicksand text-right">
                  {t(section.subtitle)}
                </p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default IntroSection;
