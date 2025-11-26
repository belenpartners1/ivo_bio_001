// const VideoIntroSection = () => {
//   return (
//     <div className="h-screen w-full flex items-center justify-center p-4 relative">
//       <video
//         src="/ivovideo01.mp4"
//         autoPlay
//         loop
//         muted
//         playsInline
//         className="h-full w-full object-cover rounded-4xl shadow-xl"
//       />
//       {/* <div className="absolute bottom-8 right-8 p-8 max-w-sm bg-white/20 backdrop-blur-xl border border-white/30 rounded-3xl shadow-lg text-gri select-none">
//         <p className="font-extrabold">
//           Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ullam
//           tempora ratione nihil cum iure totam similique illo optio. Libero
//           dignissimos dicta laudantium? Earum laborum quasi eligendi corporis
//           rerum, hic excepturi.
//         </p>
//       </div> */}
//     </div>
//   );
// };

// export default VideoIntroSection;

"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const VideoIntroSection = () => {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;

    // Pin animasyonu - section yukarıda sabitlenir
    ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "+=100%", // Ekran yüksekliği kadar pin'li kalır
      pin: true,
      pinSpacing: true,
      scrub: 1,
    });

    // Video scale ve opacity animasyonu (opsiyonel)
    gsap.fromTo(
      video,
      {
        scale: 0.95,
        opacity: 0.9,
      },
      {
        scale: 1,
        opacity: 1,
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=100%",
          scrub: 1,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className="h-screen w-full flex items-center justify-center p-4 relative"
    >
      <video
        ref={videoRef}
        src="/ivovideo01.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="h-full w-full object-cover rounded-4xl shadow-xl"
      />
      {/* <div className="absolute bottom-8 right-8 p-8 max-w-sm bg-white/20 backdrop-blur-xl border border-white/30 rounded-3xl shadow-lg text-gri select-none">
        <p className="font-extrabold">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ullam
          tempora ratione nihil cum iure totam similique illo optio. Libero
          dignissimos dicta laudantium? Earum laborum quasi eligendi corporis
          rerum, hic excepturi.
        </p>
      </div> */}
    </div>
  );
};

export default VideoIntroSection;
