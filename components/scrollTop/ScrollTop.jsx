// "use client";
// import React, { useEffect, useRef, useState } from "react";
// import { gsap } from "gsap";
// import { ScrollToPlugin } from "gsap/ScrollToPlugin";

// gsap.registerPlugin(ScrollToPlugin);

// const ScrollTop = () => {
//   const [isVisible, setIsVisible] = useState(false);
//   const buttonRef = useRef(null);

//   useEffect(() => {
//     // Scroll pozisyonuna göre butonun görünürlüğünü kontrol et
//     const toggleVisibility = () => {
//       if (window.pageYOffset > 300) {
//         setIsVisible(true);
//       } else {
//         setIsVisible(false);
//       }
//     };

//     window.addEventListener("scroll", toggleVisibility);

//     return () => {
//       window.removeEventListener("scroll", toggleVisibility);
//     };
//   }, []);

//   useEffect(() => {
//     if (buttonRef.current) {
//       if (isVisible) {
//         // Butonu göster - GSAP animasyonu ile
//         gsap.to(buttonRef.current, {
//           opacity: 1,
//           scale: 1,
//           duration: 0.3,
//           ease: "back.out(1.7)",
//         });
//       } else {
//         // Butonu gizle
//         gsap.to(buttonRef.current, {
//           opacity: 0,
//           scale: 0.8,
//           duration: 0.3,
//           ease: "power2.in",
//         });
//       }
//     }
//   }, [isVisible]);

//   const scrollToTop = () => {
//     // GSAP ScrollToPlugin ile smooth scroll
//     gsap.to(window, {
//       duration: 1,
//       scrollTo: 0,
//       ease: "power3.inOut",
//     });
//   };

//   return (
//     <button
//       ref={buttonRef}
//       onClick={scrollToTop}
//       className="fixed bottom-8 right-8 w-14 h-14 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300 flex items-center justify-center z-50 opacity-0 cursor-pointer group"
//       aria-label="Yukarı git"
//     >
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         className="h-6 w-6 transform group-hover:-translate-y-1 transition-transform duration-300"
//         fill="none"
//         viewBox="0 0 24 24"
//         stroke="currentColor"
//         strokeWidth={2}
//       >
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           d="M5 10l7-7m0 0l7 7m-7-7v18"
//         />
//       </svg>
//     </button>
//   );
// };

// export default ScrollTop;

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { FiArrowUp } from "react-icons/fi";

gsap.registerPlugin(ScrollToPlugin);

const ScrollTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const buttonRef = useRef(null);

  useEffect(() => {
    // Scroll pozisyonuna göre butonun görünürlüğünü kontrol et
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  useEffect(() => {
    if (buttonRef.current) {
      if (isVisible) {
        // Butonu göster - GSAP animasyonu ile
        gsap.to(buttonRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          ease: "back.out(1.7)",
        });
      } else {
        // Butonu gizle
        gsap.to(buttonRef.current, {
          opacity: 0,
          scale: 0.8,
          duration: 0.3,
          ease: "power2.in",
        });
      }
    }
  }, [isVisible]);

  const scrollToTop = () => {
    // GSAP ScrollToPlugin ile smooth scroll
    gsap.to(window, {
      duration: 1,
      scrollTo: 0,
      ease: "power3.inOut",
    });
  };

  return (
    <button
      ref={buttonRef}
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 w-13 h-13 bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl shadow-lg hover:shadow-2xl hover:bg-white/30 transition-all duration-300 flex items-center justify-center z-50 opacity-0 cursor-pointer group"
      aria-label="Yukarı git"
    >
      <FiArrowUp
        className="text-black/80 transform group-hover:-translate-y-1 transition-transform duration-300 rounded-3xl"
        size={20}
      />
    </button>
  );
};

export default ScrollTop;
