import React, { useState, useEffect, useRef } from "react";
import { IoClose, IoChevronBack, IoChevronForward } from "react-icons/io5";

const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const galleryRef = useRef(null);

  // Pinterest tarzı farklı yüksekliklerde görseller
  const images = Array.from({ length: 21 }, (_, i) => {
    const heights = [250, 300, 350, 400, 320, 380, 280];
    return {
      id: i,
      url: `/gallery/${i + 1}.webp`,
      height: heights[i % heights.length],
    };
  });

  useEffect(() => {
    if (galleryRef.current) {
      const items = galleryRef.current.querySelectorAll(".gallery-item");
      items.forEach((item, index) => {
        item.style.opacity = "0";
        item.style.transform = "translateY(30px) scale(0.95)";

        setTimeout(() => {
          item.style.transition = "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
          item.style.opacity = "1";
          item.style.transform = "translateY(0) scale(1)";
        }, index * 50);
      });
    }
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedImage(null), 300);
  };

  const navigateImage = (direction) => {
    const currentIndex = images.findIndex((img) => img.id === selectedImage.id);
    let newIndex;

    if (direction === "next") {
      newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    } else {
      newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    }

    setSelectedImage(images[newIndex]);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isModalOpen) return;

      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowRight") navigateImage("next");
      if (e.key === "ArrowLeft") navigateImage("prev");
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen, selectedImage]);

  return (
    <div className="py-20 px-4 font-quicksand" id="galeri">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-[120px] font-bold text-yesil mb-4">
            İVO BİO'YU KEŞFET
          </h1>
        </div>

        <div
          ref={galleryRef}
          className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4"
        >
          {images.map((image) => (
            <div
              key={image.id}
              className="gallery-item break-inside-avoid mb-4 group cursor-pointer"
              onClick={() => openModal(image)}
              style={{ marginBottom: "16px" }}
            >
              <div className="relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500">
                <img
                  src={image.url}
                  alt={`Gallery ${image.id + 1}`}
                  className="w-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  style={{ height: `${image.height}px`, display: "block" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && selectedImage && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm transition-opacity duration-300 ${
            isModalOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={closeModal}
        >
          {/* Close Button */}
          <button
            onClick={closeModal}
            className="absolute top-6 right-6 z-50 p-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md transition-all duration-300 group"
            aria-label="Kapat"
          >
            <IoClose className="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-300" />
          </button>

          {/* Previous Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigateImage("prev");
            }}
            className="absolute left-6 z-50 p-4 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md transition-all duration-300 group"
            aria-label="Önceki"
          >
            <IoChevronBack className="w-8 h-8 text-white group-hover:-translate-x-1 transition-transform duration-300" />
          </button>

          {/* Next Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigateImage("next");
            }}
            className="absolute right-6 z-50 p-4 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md transition-all duration-300 group"
            aria-label="Sonraki"
          >
            <IoChevronForward className="w-8 h-8 text-white group-hover:translate-x-1 transition-transform duration-300" />
          </button>

          {/* Image Container */}
          <div
            className="relative max-w-6xl max-h-[90vh] mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.url}
              alt={`Gallery ${selectedImage.id + 1}`}
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl animate-in fade-in zoom-in duration-500"
            />
            <div className="absolute -bottom-16 left-0 right-0 text-center">
              <p className="text-white text-lg font-medium bg-black/50 backdrop-blur-sm rounded-full px-6 py-2 inline-block">
                {selectedImage.id + 1} / {images.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GallerySection;
