// "use client";

// import { useEffect, useRef } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { useTranslations } from "next-intl";

// gsap.registerPlugin(ScrollTrigger);

// const BasicSection2 = () => {
//   const sectionRef = useRef(null);
//   const title1Ref = useRef(null);
//   const title2Ref = useRef(null);
//   const leftLineRef = useRef(null);
//   const rightLineRef = useRef(null);

//   const t = useTranslations("basicSection.secondOne");

//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       // Pin animasyonu
//       ScrollTrigger.create({
//         trigger: sectionRef.current,
//         start: "top top",
//         end: "+=100%",
//         pin: true,
//         pinSpacing: true,
//       });

//       // Timeline oluştur - pin sırasında oynar
//       const tl = gsap.timeline({
//         scrollTrigger: {
//           trigger: sectionRef.current,
//           start: "top top",
//           end: "+=100%",
//           scrub: 1,
//         },
//       });

//       // Sol çizgi - soldan sağa açılarak geliyor
//       tl.from(
//         leftLineRef.current,
//         {
//           width: 0,
//           duration: 1,
//           ease: "power3.out",
//         },
//         0
//       );

//       // İlk başlık - fade in ve yukarıdan gelme
//       tl.from(
//         title1Ref.current,
//         {
//           opacity: 0,
//           y: 60,
//           duration: 1,
//           ease: "power2.out",
//         },
//         0.3
//       );

//       // İkinci başlık - fade in ve yukarıdan gelme
//       tl.from(
//         title2Ref.current,
//         {
//           opacity: 0,
//           y: 60,
//           duration: 1,
//           ease: "power2.out",
//         },
//         0.5
//       );

//       // Sağ çizgi - sağdan sola açılarak geliyor
//       tl.from(
//         rightLineRef.current,
//         {
//           width: 0,
//           duration: 1,
//           ease: "power3.out",
//         },
//         0.7
//       );
//     }, sectionRef);

//     return () => ctx.revert();
//   }, []);

//   return (
//     <div
//       ref={sectionRef}
//       className="h-screen w-full flex justify-center items-center relative"
//     >
//       <div className="flex flex-col gap-2 text-center md:p-20 p-10">
//         <p
//           ref={title1Ref}
//           className="text-[60px] md:text-[120px] text-yesil font-quicksand font-bold"
//         >
//           {t("header")}
//         </p>
//         <p
//           ref={title2Ref}
//           className="text-[40px] md:text-[80px] font-quicksand text-white"
//         >
//           {t("title")}
//         </p>
//       </div>

//       {/* Sol çizgi - soldan sağa açılıyor */}
//       <div
//         ref={leftLineRef}
//         className="absolute bg-sari w-[400px] h-4 rounded-r-full left-0 top-[20%] origin-left"
//       ></div>

//       {/* Sağ çizgi - sağdan sola açılıyor */}
//       <div
//         ref={rightLineRef}
//         className="absolute bg-bej w-[400px] h-4 rounded-l-full right-0 top-[80%] origin-right"
//       ></div>
//     </div>
//   );
// };

// export default BasicSection2;

"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useTranslations } from "next-intl";

gsap.registerPlugin(ScrollTrigger);

const BasicSection2 = () => {
  const sectionRef = useRef(null);
  const leftSvgRef = useRef(null);
  const rightSvgRef = useRef(null);
  const logoRef = useRef(null);
  const textRef = useRef(null);
  const t = useTranslations("basicSection.secondOne");

  useEffect(() => {
    const createAnimations = () => {
      // Mobil için daha erken trigger
      const isMobile = window.innerWidth < 768;
      const startPosition = isMobile ? "top 80%" : "top top";

      // Pin animasyonu
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: startPosition,
        end: "+=100%",
        pin: true,
        pinSpacing: true,
      });

      // Animasyon timeline'ı - pin sırasında oynar
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: startPosition,
          end: "+=100%",
          scrub: 1,
        },
      });

      // Sol SVG - başlangıçta tam ekran ortada, scroll ile sola kayar (ekranın 2/5'inde durur)
      tl.to(
        leftSvgRef.current,
        {
          x: isMobile ? "-24vw" : "-14vw", // Mobilde daha fazla kayar
          duration: 2,
          ease: "power2.inOut",
        },
        0
      );

      // Sağ SVG - başlangıçta tam ekran ortada, scroll ile sağa kayar (ekranın 2/5'inde durur)
      tl.to(
        rightSvgRef.current,
        {
          x: isMobile ? "24vw" : "14vw", // Mobilde daha fazla kayar
          duration: 2,
          ease: "power2.inOut",
        },
        0
      );

      // Logo - SVG'ler açılırken ortadan fade in ve scale ile gelir
      tl.from(
        logoRef.current,
        {
          opacity: 0,
          scale: 0.5,
          duration: 1.5,
          ease: "power2.out",
        },
        0.8
      );

      // Text - logo'dan sonra aşağıdan fade in
      tl.from(
        textRef.current,
        {
          opacity: 0,
          y: 50,
          duration: 1,
          ease: "power2.out",
        },
        1.3
      );
    };

    const ctx = gsap.context(() => {
      createAnimations();
    }, sectionRef);

    // Resize listener - ekran boyutu değiştiğinde animasyonları yeniden oluştur
    const handleResize = () => {
      ctx.revert();
      ScrollTrigger.refresh();
      createAnimations();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      ctx.revert();
    };
  }, []);

  return (
    <div ref={sectionRef} className="h-screen w-full relative overflow-hidden">
      {/* Sol SVG - Başlangıçta tam ekranın solunu kaplar */}
      <div
        ref={leftSvgRef}
        className="absolute left-0 top-0 h-screen w-1/2 flex items-center justify-end overflow-hidden"
        style={{ transformOrigin: "center center" }}
      >
        <div className="relative h-full w-full">
          <Image
            src="/beyaz_mini_ivo.svg"
            alt="Ivo Left"
            fill
            className="object-cover object-right"
            priority
          />
        </div>
      </div>

      {/* Sağ SVG - Başlangıçta tam ekranın sağını kaplar */}
      <div
        ref={rightSvgRef}
        className="absolute right-0 top-0 h-screen w-1/2 flex items-center justify-start overflow-hidden"
        style={{ transformOrigin: "center center" }}
      >
        <div className="relative h-full w-full">
          <Image
            src="/beyaz_mini_ivo.svg"
            alt="Ivo Right"
            fill
            className="object-cover object-left"
            priority
          />
        </div>
      </div>

      {/* Orta kısım - Logo ve Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        {/* Logo */}
        <div ref={logoRef} className="mb-2">
          <Image
            src="/ivo_cercevesiz_beyaz.png"
            alt="Ivo Bio Logo"
            width={400}
            height={400}
            className="w-48 h-48 md:w-80 md:h-80 object-contain"
            priority
          />
        </div>

        {/* Text */}
        <h2
          ref={textRef}
          className="text-gray-700 text-center text-2xl md:text-4xl font-quicksand"
          dangerouslySetInnerHTML={{ __html: t("title") }}
        />
      </div>
    </div>
  );
};

export default BasicSection2;
