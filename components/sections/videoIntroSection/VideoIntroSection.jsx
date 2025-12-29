// "use client";

// import { useEffect, useRef, useState } from "react";
// import { useLocale } from "next-intl";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from "react-icons/fa";

// gsap.registerPlugin(ScrollTrigger);

// const VideoIntroSection = () => {
//   const sectionRef = useRef(null);
//   const videoRef = useRef(null);
//   const locale = useLocale();
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [isMuted, setIsMuted] = useState(false);
//   const [volume, setVolume] = useState(1);
//   const [showVolumeSlider, setShowVolumeSlider] = useState(false);

//   // Dil seçimine göre video dosya yolu
//   const videoSrc =
//     locale === "tr"
//       ? "/videos/tr_ivo_bio.mp4"
//       : locale === "ar"
//       ? "/videos/ar_ivo_bio.mp4"
//       : "/videos/eng_ivo_bio.mp4";

//   useEffect(() => {
//     const section = sectionRef.current;
//     const video = videoRef.current;

//     if (!section || !video) return;

//     // Pin animasyonu - section yukarıda sabitlenir
//     ScrollTrigger.create({
//       trigger: section,
//       start: "top top",
//       end: "+=100%",
//       pin: true,
//       pinSpacing: true,
//       scrub: 1,
//     });

//     // Video scale ve opacity animasyonu (opsiyonel)
//     gsap.fromTo(
//       video,
//       {
//         scale: 0.9,
//         opacity: 0.9,
//       },
//       {
//         scale: 1,
//         opacity: 1,
//         scrollTrigger: {
//           trigger: section,
//           start: "top top",
//           end: "+=100%",
//           scrub: 1,
//         },
//       }
//     );

//     // Intersection Observer - componentin görünürlüğünü izle
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           // Component görünümden çıktığında videoyu duraklat
//           if (!entry.isIntersecting && !video.paused) {
//             video.pause();
//             setIsPlaying(false);
//           }
//         });
//       },
//       {
//         threshold: 0.1, // %10'dan az görünürse duraklat
//       }
//     );

//     observer.observe(section);

//     return () => {
//       ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
//       observer.disconnect();
//     };
//   }, []);

//   // Video kontrol fonksiyonları
//   const togglePlayPause = () => {
//     if (videoRef.current) {
//       if (isPlaying) {
//         videoRef.current.pause();
//       } else {
//         videoRef.current.play();
//       }
//       setIsPlaying(!isPlaying);
//     }
//   };

//   const toggleMute = () => {
//     if (videoRef.current) {
//       videoRef.current.muted = !isMuted;
//       setIsMuted(!isMuted);
//     }
//   };

//   const handleVolumeChange = (e) => {
//     const newVolume = parseFloat(e.target.value);
//     setVolume(newVolume);
//     if (videoRef.current) {
//       videoRef.current.volume = newVolume;
//       if (newVolume === 0) {
//         setIsMuted(true);
//         videoRef.current.muted = true;
//       } else if (isMuted) {
//         setIsMuted(false);
//         videoRef.current.muted = false;
//       }
//     }
//   };

//   return (
//     <div
//       ref={sectionRef}
//       className="h-screen w-full flex items-center justify-center relative overflow-hidden"
//       id="tanitim-filmi"
//     >
//       <video
//         ref={videoRef}
//         src={videoSrc}
//         poster="/videotemplate.webp"
//         playsInline
//         className="w-full h-full object-cover "
//       />

//       {/* Custom Video Controls */}
//       <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4 items-center">
//         {/* Play/Pause Button */}
//         <button
//           onClick={togglePlayPause}
//           className="bg-white/90 hover:bg-white backdrop-blur-sm p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
//           aria-label={isPlaying ? "Pause" : "Play"}
//         >
//           {isPlaying ? (
//             <FaPause className="h-6 w-6 text-gray-800" />
//           ) : (
//             <FaPlay className="h-6 w-6 text-gray-800" />
//           )}
//         </button>

//         {/* Volume Control */}
//         <div
//           className="relative flex items-center gap-2 ml-2"
//           onMouseEnter={() => setShowVolumeSlider(true)}
//           onMouseLeave={() => setShowVolumeSlider(false)}
//         >
//           {/* Mute/Unmute Button */}
//           <button
//             onClick={toggleMute}
//             className="bg-white/90 hover:bg-white backdrop-blur-sm p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
//             aria-label={isMuted ? "Unmute" : "Mute"}
//           >
//             {isMuted ? (
//               <FaVolumeMute className="h-6 w-6 text-gray-800" />
//             ) : (
//               <FaVolumeUp className="h-6 w-6 text-gray-800" />
//             )}
//           </button>

//           {/* Volume Slider */}
//           <div
//             className={`transition-all duration-300 ${
//               showVolumeSlider
//                 ? "w-24 opacity-100"
//                 : "w-0 opacity-0 overflow-hidden"
//             }`}
//           >
//             <input
//               type="range"
//               min="0"
//               max="1"
//               step="0.01"
//               value={volume}
//               onChange={handleVolumeChange}
//               className="w-full h-2 bg-white/90 rounded-lg appearance-none cursor-pointer accent-gray-800"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VideoIntroSection;

////////////////////////////////////////////////////////////////////////////////////////////

// "use client";

// import { useEffect, useRef } from "react";
// import { useLocale } from "next-intl";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// const VideoIntroSection = () => {
//   const sectionRef = useRef(null);
//   const iframeRef = useRef(null);
//   const locale = useLocale();

//   // Dil seçimine göre video URL'i
//   const videoUrl =
//     locale === "tr"
//       ? "https://www.youtube.com/embed/tmL8ju7AKmU?si=6qmqy8ti4Bbu7yva&controls=1"
//       : locale === "ar"
//       ? "https://www.youtube.com/embed/1gNb2H6JAtk?si=jOReELlEUVOG3mEW&controls=1"
//       : "https://www.youtube.com/embed/1gNb2H6JAtk?si=viCDinAl_zcFapK0&controls=1";

//   useEffect(() => {
//     const section = sectionRef.current;
//     const iframe = iframeRef.current;

//     if (!section || !iframe) return;

//     // Pin animasyonu - section yukarıda sabitlenir
//     ScrollTrigger.create({
//       trigger: section,
//       start: "top top",
//       end: "+=100%",
//       pin: true,
//       pinSpacing: true,
//       scrub: 1,
//     });

//     // Video scale ve opacity animasyonu (opsiyonel)
//     gsap.fromTo(
//       iframe,
//       {
//         scale: 0.9,
//         opacity: 0.9,
//       },
//       {
//         scale: 1,
//         opacity: 1,
//         scrollTrigger: {
//           trigger: section,
//           start: "top top",
//           end: "+=100%",
//           scrub: 1,
//         },
//       }
//     );

//     return () => {
//       ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
//     };
//   }, []);

//   return (
//     <div
//       ref={sectionRef}
//       className="h-screen w-full flex items-center justify-center relative overflow-hidden"
//       id="tanitim-filmi"
//     >
//       <iframe
//         ref={iframeRef}
//         width="100%"
//         height="100%"
//         src={videoUrl}
//         title="YouTube video player"
//         frameBorder="0"
//         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//         referrerPolicy="strict-origin-when-cross-origin"
//         allowFullScreen
//         className="w-full h-full object-cover"
//       />
//     </div>
//   );
// };

// export default VideoIntroSection;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

"use client";

import { useEffect, useRef } from "react";
import { useLocale } from "next-intl";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const VideoIntroSection = () => {
  const sectionRef = useRef(null);
  const iframeRef = useRef(null);
  const locale = useLocale();

  // Dil seçimine göre YouTube video URL'i
  const videoUrl =
    locale === "tr"
      ? "https://www.youtube.com/embed/tmL8ju7AKmU?si=1YQakDwv7bO5_SBO"
      : locale === "ar"
      ? "https://www.youtube.com/embed/AG5jRnE1jQ8?si=oTOHwntBkPerdCXj"
      : "https://www.youtube.com/embed/1gNb2H6JAtk?si=JIywF2cUo4nbXsER";

  useEffect(() => {
    const section = sectionRef.current;
    const iframe = iframeRef.current;

    if (!section || !iframe) return;

    // Pin animasyonu - section yukarıda sabitlenir
    ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "+=100%",
      pin: true,
      pinSpacing: true,
      scrub: 1,
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-gri"
      id="tanitim-filmi"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <iframe
          ref={iframeRef}
          src={videoUrl}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen={true}
          webkitallowfullscreen="true"
          mozallowfullscreen="true"
          className="w-full aspect-video rounded-lg shadow-2xl"
        />
      </div>
    </div>
  );
};

export default VideoIntroSection;
