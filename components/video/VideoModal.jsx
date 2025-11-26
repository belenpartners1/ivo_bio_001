"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const VideoModal = ({ isOpen, onClose, videoUrl }) => {
  const modalRef = useRef(null);
  const overlayRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      gsap.to(overlayRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.fromTo(
        contentRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.7)" }
      );
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleClose = () => {
    gsap.to(contentRef.current, {
      scale: 0.8,
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
    });
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
      onComplete: onClose,
    });
  };

  const handleButtonClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    handleClose();
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!isOpen) return null;

  // YouTube URL'ini embed formatına çevir
  const getEmbedUrl = (url) => {
    if (!url) return null;

    const videoId = url.split("v=")[1]?.split("&")[0];
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }

    if (url.includes("embed")) {
      return url;
    }

    return url;
  };

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
    >
      {/* Overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black/90 backdrop-blur-sm opacity-0"
        onClick={handleOverlayClick}
      ></div>

      {/* Modal Content Container */}
      <div className="relative w-full max-w-6xl z-10">
        <button
          onClick={handleButtonClick}
          onMouseDown={handleButtonClick}
          onTouchStart={handleButtonClick}
          className="absolute -top-14 right-0 w-12 h-12 flex items-center justify-center rounded-full bg-white hover:bg-gray-200 text-gray-800 transition-all shadow-lg hover:scale-110 z-10000 pointer-events-auto"
          type="button"
          aria-label="Kapat"
          style={{ pointerEvents: "auto" }}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={3}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Video Player */}
        <div
          ref={contentRef}
          className="relative aspect-video bg-black rounded-xl overflow-hidden shadow-2xl opacity-0"
          onClick={(e) => e.stopPropagation()}
        >
          {videoUrl ? (
            <iframe
              src={getEmbedUrl(videoUrl)}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            <div className="flex items-center justify-center h-full text-white">
              <p>Video yüklenemedi</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
