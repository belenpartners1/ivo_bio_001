"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import VideoModal from "../../video/VideoModal";

gsap.registerPlugin(ScrollTrigger);

const TechnicalSection = () => {
  const sectionRef = useRef(null);
  const panelsRef = useRef([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const technicalData = [
    {
      id: 1,
      title: "İVO BİO Teknik",
      description:
        "Doğal çevreyle uyumlu, organik kompozit yapı teknolojisiyle üretilen İVO BİO 85 m² büyüklüğünde, modern ve fonksiyonel bir 2+1 yaşam alanı sunar. <br /> <br />  1-) 1700 cm uzunluk      <br /> 2-) 530 cm genişlik      <br /> 3-) 360 cm yükseklik",
      video: "/infography/01.mp4",
      // image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=1200&h=800&fit=crop",
      videoUrl: "https://www.youtube.com/watch?v=I1unv9CqMNA",
    },
    {
      id: 2,
      title: "Altyapı Sistemleri",
      description:
        "İVO BİO, tam donanımlı ve kendi kendine yetebilen altyapı sistemleriyle öne çıkar. Güçlü su yönetimi, yüksek kapasiteli atık çözümü ve yenilenebilir enerji üretimi sayesinde kullanıcıya bağımsız bir yaşam deneyimi sunar.<br /><br />• 10 ton temiz su kapasitesi<br />• 10 ton foseptik depolama sistemi<br />• 10 kW güneş enerjisi üretim kapasitesi",
      video: "/infography/02.mp4",
      videoUrl: "https://www.youtube.com/watch?v=I1unv9CqMNA",
    },
    {
      id: 3,
      title: "Yapı Özellikleri",
      description:
        "İVO BİO, dayanıklı taşıyıcı sistemler, gelişmiş yalıtım çözümleri ve premium dış cephe malzemeleriyle dört mevsim konfor ve güvenilirlik sunar.<br /><br />• 14 ton ağır çelik konstrüksiyon<br />• Isı yalıtımlı doğrama sistemleri<br /> • Çatı penceresi uygulaması<br /> • Cam içi jaluzi sistemi<br /> • Alev almaz 30 density dış duvar köpüğü<br /> • Doğal taş kaplama dış cephe ",
      video: "/infography/03.mp4",
      videoUrl: "https://www.youtube.com/watch?v=I1unv9CqMNA",
    },
    {
      id: 4,
      title: "Akıllı Ev Sistemleri",
      description:
        "İVO BİO, entegre akıllı ev teknolojileriyle güvenlikten iklimlendirmeye tüm sistemleri tek noktadan kontrol ederek modern ve pratik bir yaşam sunar.<br /><br /> • A Sınıfı enerji tüketimi <br /> • Aydınlatma kontrolü<br /> • Güvenlik ve kamera sistemleri<br /> • İntercom entegrasyonu<br /> • Perde ve panjur kontrolü<br /> • Yangın algılama sistemi<br /> • Böcek algılama sensörleri<br /> • Isıtma ve soğutma yönetimi ",
      image: "/infography/04.webp",
      videoUrl: "https://www.youtube.com/watch?v=I1unv9CqMNA",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const panels = panelsRef.current;

      // İlk paneli başlangıçta göster
      gsap.set(panels[0], { zIndex: 1 });
      gsap.set(panels[0].querySelector(".left-content"), { y: 0 });
      gsap.set(panels[0].querySelector(".right-content"), { y: 0 });

      panels.forEach((panel, i) => {
        if (i === 0) return; // İlk panel zaten görünür

        const leftContent = panel.querySelector(".left-content");
        const rightContent = panel.querySelector(".right-content");

        // Her panel için scroll trigger - daha uzun scrub ile smooth animasyon
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: () => `top+=${(i - 0.5) * window.innerHeight} top`,
          end: () => `top+=${i * window.innerHeight} top`,
          scrub: 2.5, // Daha yüksek scrub değeri = daha smooth animasyon
          onUpdate: (self) => {
            const progress = self.progress;

            // Panel z-index ayarla
            if (progress > 0.01) {
              gsap.set(panel, { zIndex: i + 1 });
            }

            // Sol taraf animasyonu - power2.inOut easing ile smooth geçiş
            gsap.to(leftContent, {
              y: `${100 - progress * 100}%`,
              ease: "power2.inOut",
              duration: 0,
            });

            // Sağ taraf animasyonu - çok daha geç başlama ve smooth easing
            // Delay artırıldı: 0.4'ten sonra başlıyor (önceden 0.2)
            const delayedProgress = Math.max(0, (progress - 0.4) / 0.6);
            gsap.to(rightContent, {
              y: `${100 - delayedProgress * 100}%`,
              ease: "power2.inOut", // Smooth easing
              duration: 0,
            });
          },
          onLeaveBack: () => {
            gsap.set(panel, { zIndex: 0 });
          },
        });
      });

      // Ana container'ı pin'le
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${panels.length * window.innerHeight}`,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="h-screen w-full p-2 relative bg-gri font-quicksand"
      id="teknik"
    >
      {technicalData.map((item, index) => (
        <div
          key={item.id}
          ref={(el) => (panelsRef.current[index] = el)}
          className="absolute inset-0 w-full h-full p-2"
          style={{
            zIndex: index === 0 ? 1 : 0,
          }}
        >
          <div className="grid grid-cols-3 gap-2 h-full">
            {/* Sol Kolon - Yazı */}
            <div
              className="left-content col-span-1 px-6 py-24 bg-white rounded-3xl flex flex-col justify-between h-full relative border border-gri/90"
              style={{
                transform: index === 0 ? "translateY(0%)" : "translateY(100%)",
              }}
            >
              <h1 className="text-4xl text-center font-extrabold text-gray-700">
                {item.title}
              </h1>
              <div className="w-full h-[2px] bg-gray-300 mt-2"></div>

              <div className="flex flex-col items-center my-2">
                {/* <div className="w-full h-[2px] bg-gray-300 my-6"></div> */}
                {/* <p className="font-bold text-gray-600 text-justify leading-relaxed text-base my-16">
                  {item.description}
                </p> */}
                <p
                  className="font-bold text-xl text-kahverengi text-start leading-relaxed my-16"
                  dangerouslySetInnerHTML={{ __html: item.description }}
                />
                <div className="w-40 h-[2px] bg-gray-300 my-6"></div>
              </div>

              {/* Buton geçici olarak devre dışı - ileride kullanım için */}
              {/* <div className="flex justify-center mt-6">
                <button
                  onClick={() => {
                    setSelectedVideo({ url: item.videoUrl, title: item.title });
                    setIsModalOpen(true);
                  }}
                  className="w-full px-6 py-4 bg-gray-700 text-white font-bold rounded-xl hover:bg-gray-800 transition-all hover:shadow-xl transform cursor-pointer"
                >
                  Detaylı İncele
                </button>
              </div> */}

              {/* Alt dekoratif çizgiler */}
              <div className="absolute w-[2px] h-20 bg-gray-300 bottom-0 left-20"></div>
              <div className="absolute w-[2px] h-20 bg-gray-300 bottom-0 right-20"></div>

              {/* Sayfa numarası */}
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-kahverengi font-bold border-b-2">
                {index + 1} / {technicalData.length}
              </div>
            </div>

            {/* Sağ Kolon - Görsel veya Video */}
            <div
              className="right-content col-span-2 bg-white h-full relative flex justify-center items-center overflow-hidden rounded-3xl"
              style={{
                transform: index === 0 ? "translateY(0%)" : "translateY(100%)",
              }}
            >
              {item.video ? (
                <video
                  src={item.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full object-cover"
                />
              ) : (
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          </div>
        </div>
      ))}

      <VideoModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedVideo(null);
        }}
        videoUrl={selectedVideo?.url}
      />
    </div>
  );
};

export default TechnicalSection;
