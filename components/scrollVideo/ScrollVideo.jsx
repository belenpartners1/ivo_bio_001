"use client";

import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ScrollVideo = () => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const sections = [
    {
      title: "Giriş",
      description:
        "Video hikayemiz burada başlıyor. Scroll ettikçe her kare açığa çıkacak.",
      highlight: "İlk Sahne",
    },
    {
      title: "Gelişim",
      description:
        "Hareket halindeyken detayları keşfedin. Her frame bir hikaye anlatıyor.",
      highlight: "Aksiyon",
    },
    {
      title: "Dönüm Noktası",
      description: "En önemli anlar burada ortaya çıkıyor. Dikkatle izleyin.",
      highlight: "Kritik An",
    },
    {
      title: "Sonuç",
      description: "Hikayenin finali. Tüm parçalar bir araya geliyor.",
      highlight: "Final",
    },
  ];

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;

    if (!video || !container || !isVideoLoaded) return;

    const videoDuration = video.duration;

    console.log("Video duration:", videoDuration);
    console.log("Setting up ScrollTrigger...");

    video.currentTime = 0;
    video.pause();

    let tween = gsap.to(video, {
      currentTime: videoDuration,
      duration: 1,
      ease: "none",
      paused: true,
    });

    ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
      pin: ".video-wrapper",
      anticipatePin: 1,
      onUpdate: (self) => {
        tween.progress(self.progress);
        console.log(
          "Scroll progress:",
          self.progress.toFixed(2),
          "Video time:",
          video.currentTime.toFixed(2)
        );
      },
    });

    sections.forEach((_, index) => {
      gsap.fromTo(
        `.content-section-${index}`,
        {
          opacity: 0,
          x: 100,
        },
        {
          opacity: 1,
          x: 0,
          scrollTrigger: {
            trigger: `.content-section-${index}`,
            start: "top 80%",
            end: "top 20%",
            scrub: 1,
            toggleActions: "play none none reverse",
          },
          ease: "power2.out",
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      tween.kill();
    };
  }, [isVideoLoaded, sections.length]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => {
      console.log("Video can play, duration:", video.duration);
      setIsVideoLoaded(true);
    };

    const handleLoadedData = () => {
      console.log("Video data loaded, duration:", video.duration);
      setIsVideoLoaded(true);
    };

    const handleError = (e) => {
      console.error("Video error:", e, video.error);
    };

    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("loadeddata", handleLoadedData);
    video.addEventListener("error", handleError);

    // Force load
    video.load();

    return () => {
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("loadeddata", handleLoadedData);
      video.removeEventListener("error", handleError);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative ">
      <div style={{ height: "600vh" }}>
        <div className="sticky top-0 h-screen flex items-center">
          <div className="video-wrapper w-full h-full flex bg-white">
            <div className="w-3/4 h-full flex items-center justify-center relative">
              <video
                ref={videoRef}
                className="w-full"
                preload="auto"
                muted
                playsInline
                src="/output.mp4"
              />

              {!isVideoLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-gri">
                  <div className="text-white text-xl">Video yükleniyor...</div>
                </div>
              )}
            </div>

            <div className="w-1/4 h-full overflow-hidden bg-gri rounded-l-4xl">
              <div className="h-full flex flex-col justify-center p-8 space-y-12">
                {sections.map((section, index) => (
                  <div
                    key={index}
                    className={`content-section-${index} opacity-0`}
                  >
                    <div className="mb-2">
                      <span className=" text-sm font-semibold uppercase tracking-wider">
                        {section.highlight}
                      </span>
                    </div>
                    <h2 className="text-white text-2xl font-bold mb-3">
                      {section.title}
                    </h2>
                    <p className="text-sm leading-relaxed">
                      {section.description}
                    </p>
                    <div className="mt-4 w-12 h-1 rounded"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollVideo;
