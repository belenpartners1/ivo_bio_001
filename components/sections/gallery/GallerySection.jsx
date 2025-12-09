"use client";

import React, { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";

const GallerySection = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const thumbnailRef = useRef(null);
  const t = useTranslations("gallery");

  // 66 adet görsel
  const images = Array.from({ length: 66 }, (_, i) => ({
    id: i,
    url: `/gallery/1 (${i + 1}).webp`,
  }));

  // Thumbnail'a tıklayınca otomatik scroll
  const scrollToThumbnail = (index) => {
    if (thumbnailRef.current) {
      const thumbnail = thumbnailRef.current.children[index];
      if (thumbnail) {
        thumbnail.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  };

  const handleThumbnailClick = (index) => {
    setSelectedIndex(index);
    scrollToThumbnail(index);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") {
        setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
      } else if (e.key === "ArrowLeft") {
        setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [images.length]);

  return (
    <div className="py-20 px-4 font-quicksand bg-gradient-to-b from-white to-gray-50" id="galeri">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-[100px] font-bold text-yesil mb-4">
            {t("title")}
          </h1>
        </div>

        {/* Main Image Container */}
        <div className="relative w-full aspect-video mb-6 bg-gray-100 rounded-3xl overflow-hidden shadow-2xl">
          <Image
            src={images[selectedIndex].url}
            alt={`${t("imageAlt")} ${selectedIndex + 1}`}
            fill
            className="object-cover transition-opacity duration-500"
            priority={selectedIndex === 0}
            sizes="(max-width: 1280px) 100vw, 1280px"
          />

          {/* Image Counter */}
          <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
            {selectedIndex + 1} / {images.length}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={() =>
              setSelectedIndex((prev) =>
                prev === 0 ? images.length - 1 : prev - 1
              )
            }
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 border border-white/30"
            aria-label="Previous"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={() =>
              setSelectedIndex((prev) =>
                prev === images.length - 1 ? 0 : prev + 1
              )
            }
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 border border-white/30"
            aria-label="Next"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        {/* Thumbnails Container */}
        <div className="relative">
          <div
            ref={thumbnailRef}
            className="flex gap-3 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 pb-4 px-2"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "#9ca3af #e5e7eb",
            }}
          >
            {images.map((image, index) => (
              <button
                key={image.id}
                onClick={() => handleThumbnailClick(index)}
                className={`relative flex-shrink-0 w-28 h-20 rounded-xl overflow-hidden transition-all duration-300 ${
                  selectedIndex === index
                    ? "ring-4 ring-yesil scale-105 shadow-xl"
                    : "ring-2 ring-gray-300 hover:ring-gray-400 opacity-70 hover:opacity-100"
                }`}
              >
                <Image
                  src={image.url}
                  alt={`${t("imageAlt")} ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="112px"
                />
                {selectedIndex === index && (
                  <div className="absolute inset-0 bg-yesil/20 flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-white drop-shadow-lg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GallerySection;
