"use client";

import { useState, useRef, useEffect } from "react";

const HorizontalScroll = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const scrollContainerRef = useRef(null);
  const cardRefs = useRef([]);

  const items = [
    {
      id: 1,
      title: "TrekDrive",
      subtitle: "Twice the Efficiency. All the Freedom.",
      image: "/base.webp",
      video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      description:
        "Experience ultimate freedom with TrekDrive. Our innovative technology delivers twice the efficiency while maintaining complete independence on the road. Perfect for adventurers who demand both performance and sustainability.",
      features: ["Extended Range", "Fast Charging", "All-Terrain Capable"],
    },
    {
      id: 2,
      title: "CampQuiet",
      subtitle: "Quiet Comes Standard.",
      image: "/brown.webp",
      video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      description:
        "CampQuiet revolutionizes outdoor living with whisper-quiet operation. Enjoy nature without the noise, featuring advanced sound dampening technology and eco-friendly design for the perfect camping experience.",
      features: ["Silent Operation", "Eco-Friendly", "Luxury Comfort"],
    },
    {
      id: 3,
      title: "Aero-Electric",
      subtitle: "Built to Win. Ready to Transform.",
      image: "/blue.webp",
      video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      description:
        "Aero-Electric combines cutting-edge aerodynamics with electric power. Engineered for peak performance and designed to transform the way you travel. Victory is in every detail.",
      features: ["Aerodynamic Design", "High Performance", "Smart Technology"],
    },
    {
      id: 4,
      title: "UrbanFlow",
      subtitle: "City Living. Redefined.",
      image: "/base.webp",
      video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      description:
        "Navigate urban landscapes with unprecedented ease. UrbanFlow brings smart mobility to city streets with compact design and intelligent features.",
      features: ["Compact Design", "Smart Navigation", "Urban Ready"],
    },
    {
      id: 5,
      title: "Aero-Electric",
      subtitle: "Built to Win. Ready to Transform.",
      image: "/blue.webp",
      video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      description:
        "Aero-Electric combines cutting-edge aerodynamics with electric power. Engineered for peak performance and designed to transform the way you travel. Victory is in every detail.",
      features: ["Aerodynamic Design", "High Performance", "Smart Technology"],
    },
    {
      id: 6,
      title: "UrbanFlow",
      subtitle: "City Living. Redefined.",
      image: "/base.webp",
      video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      description:
        "Navigate urban landscapes with unprecedented ease. UrbanFlow brings smart mobility to city streets with compact design and intelligent features.",
      features: ["Compact Design", "Smart Navigation", "Urban Ready"],
    },
  ];

  const handleCardClick = (index) => {
    setSelectedIndex(selectedIndex === index ? null : index);
  };

  // Card açıldığında scroll ile ortala
  useEffect(() => {
    if (
      selectedIndex !== null &&
      scrollContainerRef.current &&
      cardRefs.current[selectedIndex]
    ) {
      const container = scrollContainerRef.current;
      const card = cardRefs.current[selectedIndex];

      setTimeout(() => {
        const cardLeft = card.offsetLeft;
        const cardWidth = card.offsetWidth;
        const containerWidth = container.offsetWidth;

        // Kartı ekranın ortasına getir
        const scrollPosition = cardLeft - containerWidth / 2 + cardWidth / 2;

        container.scrollTo({
          left: scrollPosition,
          behavior: "smooth",
        });
      }, 100);
    }
  }, [selectedIndex]);

  return (
    <div className="w-full py-20 ml-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-8">
        <div className="mb-12 text-center">
          <h2 className="text-5xl font-bold text-white mb-4">
            Teknolojilerimiz
          </h2>
          <p className="text-slate-400 text-lg">
            IVO Bio'nun uygulamalarını keşfedin
          </p>
        </div>
      </div>

      <div className="relative">
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto overflow-y-visible pb-8 snap-x snap-mandatory scrollbar-hide pl-8 pr-8"
        >
          {items.map((item, index) => (
            <div
              key={item.id}
              ref={(el) => (cardRefs.current[index] = el)}
              className={`shrink-0 transition-all duration-700 ease-out ${
                selectedIndex === index
                  ? "w-[600px] snap-center"
                  : "w-[400px] snap-start"
              }`}
            >
              <div
                className={`relative rounded-3xl overflow-hidden border border-slate-700/50 transition-all duration-700 ${
                  selectedIndex === index
                    ? "h-[550px]"
                    : "h-[500px] cursor-pointer hover:shadow-blue-500/20"
                }`}
                onClick={() =>
                  selectedIndex !== index && handleCardClick(index)
                }
              >
                {selectedIndex === index ? (
                  // Expanded View - Üst Üste
                  <div className="h-full flex flex-col">
                    <div className="relative">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedIndex(null);
                        }}
                        className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 backdrop-blur transition-all"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>

                      {/* Video Section - Üstte */}
                      <div className="w-full h-[220px] bg-black flex items-center justify-center p-3">
                        <iframe
                          className="w-full h-full rounded-lg"
                          src={item.video}
                          title={item.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </div>
                    </div>

                    {/* Details Section - Altta */}
                    <div className="flex-1 p-6 overflow-hidden flex flex-col">
                      <h3 className="text-2xl font-bold text-white mb-1">
                        {item.title}
                      </h3>
                      <p className="text-base text-gray-500 mb-4">
                        {item.subtitle}
                      </p>

                      <div className="space-y-3 flex-1">
                        <div>
                          <h4 className="text-sm font-semibold text-white mb-2">
                            About
                          </h4>
                          <p className="text-sm text-slate-300 leading-relaxed line-clamp-3">
                            {item.description}
                          </p>
                        </div>

                        <div>
                          <h4 className="text-sm font-semibold text-white mb-2">
                            Key Features
                          </h4>
                          <div className="grid grid-cols-1 gap-2">
                            {item.features.map((feature, idx) => (
                              <div
                                key={idx}
                                className="flex items-center gap-2 bg-slate-800/50 rounded-lg p-2"
                              >
                                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full shrink-0"></div>
                                <span className="text-sm text-slate-300">
                                  {feature}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 rounded-xl transition-all transform hover:scale-105 shadow-lg text-sm mt-2">
                          Learn More
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Card View
                  <div className="relative h-[500px] group rounded-3xl overflow-hidden">
                    <div className="absolute inset-0">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80"></div>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <p className="text-sm text-slate-400 mb-2 tracking-wider uppercase">
                        {item.title}
                      </p>
                      <h3 className="text-2xl font-bold text-white mb-4 leading-tight">
                        {item.subtitle}
                      </h3>

                      <div className="flex items-center gap-2 text-bej font-medium group-hover:gap-4 transition-all">
                        <span>Explore</span>
                        <svg
                          className="w-5 h-5 transform group-hover:translate-x-2 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </div>
                    </div>

                    <div className="absolute top-6 right-6 bg-white/10 backdrop-blur-md rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center gap-2 p-8">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() =>
                selectedIndex === index
                  ? setSelectedIndex(null)
                  : handleCardClick(index)
              }
              className={`transition-all duration-300 rounded-full ${
                selectedIndex === index
                  ? "w-8 h-2 bg-blue-500"
                  : "w-2 h-2 bg-slate-600 hover:bg-slate-500"
              }`}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default HorizontalScroll;
