import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const IntroSection = () => {
  const sectionsRef = useRef([]);
  const titleRef = useRef(null);

  useEffect(() => {
    // Başlık animasyonu - ilk card geldiğinde kaybolsun
    gsap.to(titleRef.current, {
      scrollTrigger: {
        trigger: sectionsRef.current[0],
        start: "top bottom",
        end: "top center",
        scrub: 2,
      },
      opacity: 0,
      y: -100,
      ease: "none",
    });

    sectionsRef.current.forEach((section, index) => {
      if (!section) return;

      const isLastSection = index === sectionsRef.current.length - 1;

      // Son section hariç hepsini pin'le
      gsap.to(section, {
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: isLastSection ? "bottom center" : "bottom top",
          scrub: 1,
          pin: !isLastSection,
          pinSpacing: false,
        },
        scale: isLastSection ? 1 : 0.8,
        opacity: isLastSection ? 1 : 0,
        y: isLastSection ? -200 : 0,
        ease: "none",
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const sections = [
    {
      title: "Doğayı Dinle",
      subtitle:
        "Sizin için tasarlanan modern yaşam alanları ile, doğal çevreyle uyum içinde yaşayın.Göz alıcı peyzaj düzenlemeleriyle, evinizin her köşesi doğanın sesiyle dolacak.",
      image: "/info1/1.webp",
      position: "left",
    },
    {
      title: "Sürdürülebilir Yaşam",
      subtitle:
        "Enerji verimliliği ve çevre dostu tasarımlarla geleceği bugünden inşa ediyoruz.Doğal kaynakları verimli kullanarak, sağlıklı ve dengeli bir yaşam alanı yaratıyoruz.",
      image: "/info1/2.webp",
      position: "right",
    },
    {
      title: "Yenilikçi Tasarım",
      subtitle:
        "Eşsiz mimarisiyle dikkat çeken İVO Bio, estetik ve fonksiyonelliği bir araya getiriyor.Her ayrıntı, kullanıcı deneyimini zenginleştirerek yaşam alanlarınıza şıklık katıyor.",
      image: "/info1/3.webp",
      position: "left",
    },
    {
      title: "Sadelik & Konfor",
      subtitle:
        "Ferah ve dingin bir yaşam alanı, sade tasarım detayları ve huzurlu bir atmosferle İVO Bio’da konforlu bir yaşam deneyimi sizleri bekliyor.",
      image: "/info1/4.webp",
      position: "right",
    },
    {
      title: "Doğallık ve Sağlık",
      subtitle:
        "Temiz hava ve doğallık, sağlıklı bir yaşamın temelini oluşturur. İVO Bio, yaz ve kış dengesini mükemmel bir şekilde kurarak her mevsimde konforu garanti ediyor.",
      image: "/info1/5.webp",
      position: "left",
    },
    {
      title: "Zarif İç Mekanlar",
      subtitle:
        "Doğal malzemelerle tasarlanmış iç mekanlar, sıcak ve davetkar bir atmosfer sunar. Her detayında doğallık hissi, İVO Bio'da yaşam alanlarınızı benzersiz kılar.",
      image: "/info1/8.webp",
      position: "right",
    },
    {
      title: "Akıllı Yaşam, Akıllı Ev",
      subtitle:
        "İVO Bio’nun akıllı ev sistemi, yaşamınızı daha konforlu ve kontrollü hale getirir. Tek dokunuşla eviniz, sizin ihtiyaçlarınıza uyum sağlar ve günlük hayatınızı kolaylaştırır.",
      image: "/info1/7.webp",
      position: "left",
    },

    {
      title: "Modüler ve Hızlı Çözümler",
      subtitle:
        "İVO Bio, farklı yaşam tarzlarına uyum sağlayan esnek tasarımıyla ihtiyaçlarınıza tam olarak karşılık verir. Hızlı teslimat ve kurulum sayesinde hayalinizdeki yaşam alanına kısa sürede kavuşun.",
      image: "/info1/6.webp",
      position: "right",
    },
  ];

  return (
    <div className="bg-gri relative" id="intro">
      {/* Başlık - Scroll ile kaybolacak */}
      <div
        ref={titleRef}
        className="h-screen flex flex-col items-center justify-center gap-10 sticky top-0 z-10 p-20"
      >
        <h1 className="font-quicksand text-[170px] font-bold text-center leading-tight text-white">
          <span className="text-yesil">İVO Bio</span> <br /> İle Tanışın
        </h1>
        {/* <p className=" max-w-4xl text-justify font-quicksand text-2xl font-bold text-kahverengi">
          İVO Bio, ister şehir merkezinde ister kırsalda, isterse ekstrem iklim
          koşullarında olsun her yerde konforlu yaşam sunmak için tasarlanan
          yeni nesil bir yapıdır. Geniş iç hacmi, yüksek yalıtımlı gövdesi ve
          gelişmiş iklimlendirme sistemleri sayesinde yazın çöl sıcaklarında,
          kışın kutup soğuklarında bile ideal yaşam sıcaklığını korur. Dayanıklı
          yapısı ve modüler tasarımı sayesinde farklı arazi ve kullanım
          ihtiyaçlarına kolayca uyum sağlar. Hem modern bir şehir hayatına
          entegre olabilir hem de doğadan uzakta bağımsız bir yaşam alanı
          oluşturabilir. İVO Bio, sizi bulunduğunuz yere değil, sizin
          ihtiyaçlarınıza göre şekillenen esnek ve güvenli bir yaşam deneyimiyle
          tanıştırır
        </p> */}
      </div>

      {sections.map((section, index) => (
        <div
          key={index}
          ref={(el) => (sectionsRef.current[index] = el)}
          className="h-screen w-full flex items-center px-20 gap-10 relative z-20"
        >
          {/* Sol Kısım */}
          {section.position === "left" && (
            <div className="flex-2 flex flex-col gap-6">
              <h2 className="text-6xl font-bold text-white font-quicksand text-left">
                {section.title}
              </h2>
              <p className="text-2xl text-white font-quicksand font-semibold ">
                {section.subtitle}
              </p>
            </div>
          )}

          {/* Orta - Card */}
          <div className="flex-8 flex justify-center">
            <Image
              src={section.image}
              alt="Picture of the author"
              width={1920}
              height={1080}
              className="object-cover rounded-4xl shadow-2xl w-6xl"
            />
          </div>
          {/* Sağ Kısım */}
          {section.position === "right" && (
            <div className="flex-2 flex flex-col gap-6">
              <h2 className="text-6xl font-bold text-white font-quicksand text-left">
                {section.title}
              </h2>
              <p className="text-xl text-white font-quicksand font-semibold">
                {section.subtitle}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default IntroSection;
