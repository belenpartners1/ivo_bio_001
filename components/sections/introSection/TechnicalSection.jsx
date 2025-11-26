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
      title: "Akıllı Ev Teknolojisi",
      description:
        "Akıllı ev sistemleri entegreli Ivo-Bio ile günün her saatinde yaşamı hisset. Sesli komutlarla tüm ev sistemlerini kontrol edin, enerji tasarrufu sağlayın ve konforunuzu maksimize edin. Işıklandırma, ısıtma, güvenlik - hepsi avucunuzun içinde.",
      image:
        "https://images.unsplash.com/photo-1558002038-1055907df827?w=1200&h=800&fit=crop",
      videoUrl: "https://www.youtube.com/watch?v=I1unv9CqMNA",
    },
    {
      id: 2,
      title: "Enerji Verimliliği",
      description:
        "Yeni nesil yalıtım teknolojileri ve akıllı enerji yönetim sistemleri ile %60'a varan enerji tasarrufu. Güneş panelleri ve ısı pompası entegrasyonu ile sürdürülebilir yaşam. Çevre dostu, ekonomik ve akıllı enerji çözümleri.",
      image:
        "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=1200&h=800&fit=crop",
      videoUrl: "https://www.youtube.com/watch?v=I1unv9CqMNA",
    },
    {
      id: 3,
      title: "Güvenlik Sistemleri",
      description:
        "7/24 aktif akıllı güvenlik sistemleri, yüz tanıma teknolojisi, hareket sensörleri ve anlık bildirimler ile eviniz her zaman güvende. Uzaktan erişim ve kontrol imkanı. Kapı, pencere sensörleri ve HD kameralarla tam koruma.",
      image:
        "https://images.unsplash.com/photo-1504222490345-c075b6008014?w=1200&h=800&fit=crop",
      videoUrl: "https://www.youtube.com/watch?v=I1unv9CqMNA",
    },
    {
      id: 4,
      title: "Hava Kalitesi Kontrolü",
      description:
        "HEPA filtreli havalandırma sistemi, CO2 monitörleme ve otomatik hava kalitesi optimizasyonu. Allerjen filtreleme ve nem kontrolü ile sağlıklı yaşam alanları. Temiz hava, sağlıklı yaşam için en önemli unsurdur.",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop",
      videoUrl: "https://www.youtube.com/watch?v=I1unv9CqMNA",
    },
    {
      id: 5,
      title: "Su Yönetim Sistemi",
      description:
        "Akıllı sulama, su tasarrufu ve filtrasyon sistemleri ile hem doğayı koruyun hem de faturalarınızı düşürün. Otomatik sızıntı tespiti ve anlık tüketim raporları. Teknoloji ile doğa dostu yaşam bir arada.",
      image:
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=800&fit=crop",
      videoUrl: "https://www.youtube.com/watch?v=I1unv9CqMNA",
    },
    {
      id: 6,
      title: "Multimedya Entegrasyonu",
      description:
        "Tüm odalarda entegre ses ve görüntü sistemleri. 4K görüntü kalitesi, Dolby Atmos ses sistemi ve streaming platformları tek dokunuşla. Ev sineması deneyimini her odada yaşayın. Eğlence artık çok daha keyifli.",
      image:
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&h=800&fit=crop",
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
    <div ref={sectionRef} className="h-screen w-full p-2 relative bg-gri">
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
              className="left-content col-span-1 px-6 py-20 bg-white rounded-3xl flex flex-col justify-between h-full relative border border-gri/90"
              style={{
                transform: index === 0 ? "translateY(0%)" : "translateY(100%)",
              }}
            >
              <h1 className="text-3xl text-center font-extrabold text-gray-700">
                {index === 0 ? "Teknoloji" : item.title}
              </h1>

              <div className="flex flex-col items-center my-4">
                <div className="w-full h-[2px] bg-gray-300 my-6"></div>
                <p className="font-bold text-gray-600 text-justify leading-relaxed text-base">
                  {item.description}
                </p>
                <div className="w-full h-[2px] bg-gray-300 my-6"></div>
              </div>

              <div className="flex justify-center mt-6">
                <button
                  onClick={() => {
                    setSelectedVideo({ url: item.videoUrl, title: item.title });
                    setIsModalOpen(true);
                  }}
                  className="w-full px-6 py-4 bg-gray-700 text-white font-bold rounded-xl hover:bg-gray-800 transition-all hover:shadow-xl transform cursor-pointer"
                >
                  Detaylı İncele
                </button>
              </div>

              {/* Alt dekoratif çizgiler */}
              <div className="absolute w-[2px] h-20 bg-gray-300 bottom-0 left-20"></div>
              <div className="absolute w-[2px] h-20 bg-gray-300 bottom-0 right-20"></div>

              {/* Sayfa numarası */}
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gri font-bold border-b-2">
                {index + 1} / {technicalData.length}
              </div>
            </div>

            {/* Sağ Kolon - Görsel */}
            <div
              className="right-content col-span-2 h-full relative overflow-hidden rounded-3xl"
              style={{
                transform: index === 0 ? "translateY(0%)" : "translateY(100%)",
              }}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
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
