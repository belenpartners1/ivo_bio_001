"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

const HeaderSection = () => {
  const headerRef = useRef(null);
  const textRef = useRef(null);
  const backgroundRef = useRef(null);

  useEffect(() => {
    // Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

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

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div ref={headerRef} className="relative h-screen w-full overflow-hidden">
      <div ref={backgroundRef} className="absolute inset-0 w-full h-full">
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
        className="object-cover z-20 foreground"
        priority
      />
      <div className="absolute top-2/6 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-10 container mx-auto">
        <p
          ref={textRef}
          className="text-[14vw] md:text-[8vw] lg:text-[130px]
 font-semibold tracking-wide leading-32 text-kahverengi select-none font-quicksand"
        >
          Doğal yaşam <br /> çizginiz...
        </p>
      </div>
    </div>
  );
};

export default HeaderSection;
