"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";

gsap.registerPlugin(ScrollTrigger);

const BasicSection1 = () => {
  const sectionRef = useRef(null);
  const title1Ref = useRef(null);
  const title2Ref = useRef(null);
  const leftLineRef = useRef(null);
  const rightLineRef = useRef(null);

  const t = useTranslations("basicSection.firstOne");

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pin animasyonu
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=100%",
        pin: true,
        pinSpacing: true,
      });

      // Timeline oluştur - pin sırasında oynar
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=100%",
          scrub: 1,
        },
      });

      // Sol çizgi - soldan sağa açılarak geliyor
      tl.from(
        leftLineRef.current,
        {
          width: 0,
          duration: 1,
          ease: "power3.out",
        },
        0
      );

      // İlk başlık - fade in ve yukarıdan gelme
      tl.from(
        title1Ref.current,
        {
          opacity: 0,
          y: 60,
          duration: 1,
          ease: "power2.out",
        },
        0.3
      );

      // İkinci başlık - fade in ve yukarıdan gelme
      tl.from(
        title2Ref.current,
        {
          opacity: 0,
          y: 60,
          duration: 1,
          ease: "power2.out",
        },
        0.5
      );

      // Sağ çizgi - sağdan sola açılarak geliyor
      tl.from(
        rightLineRef.current,
        {
          width: 0,
          duration: 1,
          ease: "power3.out",
        },
        0.7
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="h-screen w-full flex justify-center items-center relative"
    >
      <div className="flex flex-col gap-2 text-center md:p-20 p-10">
        <p
          ref={title1Ref}
          className="text-[100px] md:text-[120px] text-yesil font-quicksand font-bold"
        >
          {t("header")}
        </p>
        <p
          ref={title2Ref}
          className="text-[60px]  md:text-[80px] font-quicksand text-white"
        >
          {t("title")}
        </p>
      </div>

      {/* Sol çizgi - soldan sağa açılıyor */}
      <div
        ref={leftLineRef}
        className="absolute bg-sari w-[400px] h-4 rounded-r-full left-0 top-[20%] origin-left"
      ></div>

      {/* Sağ çizgi - sağdan sola açılıyor */}
      <div
        ref={rightLineRef}
        className="absolute bg-bej w-[400px] h-4 rounded-l-full right-0 top-[80%] origin-right"
      ></div>
    </div>
  );
};

export default BasicSection1;
