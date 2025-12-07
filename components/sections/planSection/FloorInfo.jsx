import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FloorInfo = () => {
  const sectionRef = useRef(null);
  const imagesRef = useRef([]);
  const textsRef = useRef([]);

  const floorData = [
    {
      id: 1,
      image: "/kesitler/ORTOGRAFİK-1 arkaplansız.webp",
      title: "İVO Bio Başlangıç",
      description:
        "Kendi tarzını oluşturmak isteyenler için tasarlanmış bu başlangıç paketi, kullanıcılara özgür bir alan sunar. Dış kabuğu tamamlanmış ve elektrik ile su tesisatları hazır bir şekilde teslim edilen yapı, tamamen boş iç hacmi sayesinde dilediğiniz gibi düzenlenebilir. Böylece dekorasyondan oda yerleşimine kadar her detayı kendi zevkinize göre şekillendirme fırsatı elde edersiniz. Uygun maliyetiyle hem pratik hem de kişiselleştirilebilir bir başlangıç arayanlar için ideal bir çözümdür.",
    },
    {
      id: 2,
      image: "/kesitler/ORTOGRAFİK-2 arkaplansız.webp",
      title: "İVO Bio Ekonomik",
      description:
        "Hızlı bir şekilde yerleşmek isteyenler için tasarlanan bu paket, pratik ve konforlu bir çözüm sunar. Elektrik ve su tesisatlarının eksiksiz olması, boya, alçı ve duvar işlemlerinin tamamlanması sayesinde zaman kaybetmeden kullanıma hazır bir yaşam alanı elde edersiniz. Mutfak bölümü ve sabit mobilyaların kurulmuş olması, kendi hareketli mobilyalarınızı getirip hemen yerleşmenize imkân tanır. Böylece zahmetsiz, düzenli ve dengeli bir yaşam ortamına hızlıca kavuşabilirsiniz.",
    },
    {
      id: 3,
      image: "/kesitler/ORTOGRAFİK-3 arkaplansız.webp",
      title: "İVO Bio Lüks",
      description:
        "Tam donanımlı ve yaşamaya tamamen hazır bu premium paket, en yüksek konforu arayanlar için tasarlanmıştır. Tüm tesisatlar ve iç işçilik özenle tamamlanmış olup, sabit ve hareketli mobilyalar dâhil eksiksiz bir yaşam alanı sunar. Modern mutfağı ve özenle düzenlenmiş iç mekânıyla hemen taşınıp zahmetsizce yaşamaya başlayabilirsiniz. Konforu, kaliteyi ve hazır bir yaşam deneyimini bir arada isteyenler için ideal bir çözümdür.",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      imagesRef.current.forEach((img, index) => {
        gsap.fromTo(
          img,
          {
            x: -100,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: img,
              start: "top 80%",
              end: "top 50%",
              scrub: 1,
            },
          }
        );
      });

      textsRef.current.forEach((text, index) => {
        gsap.fromTo(
          text,
          {
            x: 100,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: text,
              start: "top 80%",
              end: "top 50%",
              scrub: 1,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="w-full bg-gri py-10 font-quicksand">
      <div className="max-w-10/12 mx-auto px-2">
        <div className="text-center mb-16 text-white">
          <h2 className="text-5xl md:text-[100px] font-bold mb-4">
            <span className="text-yesil">İVO Bio</span> Modelleri
          </h2>
          <p className="text-4xl">Size en uygun planı seçebilirsiniz</p>
        </div>
        <div className="space-y-12">
          {floorData.map((floor, index) => (
            <div
              key={floor.id}
              className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12"
            >
              {/* Resim - Sol taraf (2/3) */}
              <div
                ref={(el) => (imagesRef.current[index] = el)}
                className="w-full lg:w-4/5"
              >
                <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                  <img
                    src={floor.image}
                    alt={floor.title}
                    className="w-full  object-cover"
                  />
                </div>
              </div>

              {/* Açıklama - Sağ taraf (1/3) */}
              <div
                ref={(el) => (textsRef.current[index] = el)}
                className="w-full lg:w-1/5"
              >
                <div className="space-y-4">
                  <h3 className="text-3xl lg:text-4xl font-bold text-yesil text-center">
                    {floor.title}
                  </h3>
                  <p className="text-lg text-kahverengi text-balance ">
                    {floor.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FloorInfo;
