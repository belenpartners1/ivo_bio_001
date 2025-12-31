"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// import Lenis from "lenis";
import { useTranslations } from "next-intl";

gsap.registerPlugin(ScrollTrigger);

const HeaderSection = () => {
  const t = useTranslations("header");
  const headerRef = useRef(null);
  const textRef = useRef(null);
  const backgroundRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Mobil kontrol
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    // // Lenis smooth scroll
    // const lenis = new Lenis({
    //   duration: 1.2,
    //   easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    //   smoothWheel: true,
    // });

    // function raf(time) {
    //   lenis.raf(time);
    //   requestAnimationFrame(raf);
    // }
    // requestAnimationFrame(raf);

    // Sayfa açılışında yazı animasyonu
    gsap.fromTo(
      textRef.current,
      {
        y: 100,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1.5,
        ease: "power3.out",
      }
    );

    // Sadece desktop'ta parallax animasyonları
    if (!isMobile) {
      // Scroll sırasında yazı animasyonu
      gsap.fromTo(
        textRef.current,
        {
          y: 0,
        },
        {
          y: -40,
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.2,
          },
          ease: "power2.out",
        }
      );

      // Background image parallax animasyonu
      gsap.fromTo(
        backgroundRef.current,
        {
          y: 0,
        },
        {
          y: 100,
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
          ease: "power2.out",
        }
      );
    }

    return () => {
      window.removeEventListener("resize", checkMobile);
      // lenis.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [isMobile]);

  return (
    <div
      ref={headerRef}
      className="relative h-screen w-full overflow-hidden select-none"
    >
      {isMobile ? (
        // Mobil görünüm - tek görsel, parallax yok
        <Image
          src="/sonmobil00.webp"
          alt="header mobile"
          fill
          className="object-cover select-none"
          priority
        />
      ) : (
        // Desktop görünüm - parallax ile çift katman
        <>
          <div
            ref={backgroundRef}
            className="absolute inset-0 w-full h-full select-none"
          >
            <Image
              src="/intro-bg.webp"
              alt="header background"
              fill
              className="object-cover background"
              priority
            />
          </div>
          <Image
            src="/intro-fg.webp"
            alt="header foreground"
            fill
            className="object-cover z-20 foreground select-none"
            priority
          />
        </>
      )}
      <div className="absolute top-2/7 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-10 container mx-auto select-none">
        <p
          ref={textRef}
          className="text-[14vw] md:text-[8vw] lg:text-[130px]
 font-semibold tracking-wide leading-16 md:leading-32 text-white md:text-kahverengi select-none font-quicksand"
        >
          {t("tagline")
            .split(" ")
            .map((word, index) =>
              index === 2 ? (
                <span key={index}>
                  <br />
                  {word}{" "}
                </span>
              ) : (
                <span key={index}>{word} </span>
              )
            )}
        </p>
      </div>
    </div>
  );
};

export default HeaderSection;
