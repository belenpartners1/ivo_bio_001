"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import {
  FaTwitter,
  FaLinkedinIn,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaArrowRight,
} from "react-icons/fa";

const Footer = () => {
  const footerRef = useRef(null);
  const ovalRefs = useRef([]);

  useEffect(() => {
    const initAnimations = async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");

      gsap.registerPlugin(ScrollTrigger);

      gsap.from(footerRef.current, {
        opacity: 0,
        y: 30,
        duration: 1,
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 80%",
          end: "top 50%",
          scrub: 1,
        },
      });

      ovalRefs.current.forEach((oval, index) => {
        gsap.to(oval, {
          y: -15,
          duration: 2 + index * 0.5,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
          delay: index * 0.3,
        });
      });
    };

    initAnimations();
  }, []);

  const socialLinks = [
    { name: "Twitter", Icon: FaTwitter },
    { name: "LinkedIn", Icon: FaLinkedinIn },
  ];

  const contactInfo = {
    phone: "+90 312 473 56 50",
    email: "info@belenandpartners.com",
    address:
      "Cepa Ofis Kule Mustafa Kemal Mahallesi Eskişehir Yolu 7. Km. 2123 Sokak No:2/D Kat:11 No:1103, Çankaya – ANKARA",
  };

  const footerLinks = [
    {
      title: "İletişim",
      links: [
        {
          label: "Telefon",
          value: contactInfo.phone,
          href: `tel:${contactInfo.phone.replace(/\s/g, "")}`,
          Icon: FaPhone,
        },
        {
          label: "Mail",
          value: contactInfo.email,
          href: `mailto:${contactInfo.email}`,
          Icon: FaEnvelope,
        },
        {
          label: "Adres",
          value: contactInfo.address,
          href: "https://www.google.com/maps/place/Belen%26Partners/@39.9124167,32.7728327,17z/data=!3m1!4b1!4m6!3m5!1s0x14d3496981290a1d:0x81835b7af381540e!8m2!3d39.9124168!4d32.7777036!16s%2Fg%2F11h_6j5m_z?entry=ttu&g_ep=EgoyMDI1MTEyMy4xIKXMDSoASAFQAw%3D%3D",
          Icon: FaMapMarkerAlt,
          target: "_blank",
        },
      ],
    },
  ];

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden py-20 px-6 bg-gri border border-t-4 border-white"
    >
      <div className="relative max-w-7xl mx-auto">
        {/* Ana içerik grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-8">
          {/* Sol taraf - Marka ve açıklama */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <h2 className="text-4xl font-bold text-white mb-2 tracking-tight">
                BELEN & PARTNERS
              </h2>
              <p className="text-white text-4xl mb-4 font-quicksand">İVO Bio</p>
              <p className="text-white text-base leading-relaxed max-w-md">
                İVO Bio bir Belen & Partners markasıdır.
              </p>
              <p className="text-gray-400 text-base leading-relaxed max-w-md">
                Modern mimari çözümler ve sürdürülebilir tasarımlarla geleceği
                birlikte inşa ediyoruz. Her projede estetik, işlevsellik ve
                çevre dostu yaklaşımı bir araya getiriyoruz.
              </p>
            </div>

            {/* Sosyal medya */}
            <div className="flex gap-4 pt-4">
              {socialLinks.map((social, index) => {
                const Icon = social.Icon;
                return (
                  <button
                    key={index}
                    className="w-12 h-12 rounded-xl bg-white/20 border border-white/50 hover:bg-white/60 transition-all duration-300 cursor-pointer flex items-center justify-center group backdrop-blur-sm"
                    aria-label={social.name}
                  >
                    <Icon className="text-xl text-gray-500 group-hover:text-gray-800 transition-colors" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sağ taraf - İletişim bilgileri */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* İletişim kartları */}
              {footerLinks[0].links.map((link, index) => {
                const Icon = link.Icon;
                return (
                  <a
                    key={index}
                    href={link.href}
                    target={link.target || "_self"}
                    rel={
                      link.target === "_blank"
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-gray-800 transition-all duration-300 overflow-hidden"
                  >
                    <div className="relative flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Icon className="text-2xl text-gray-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold text-gray-400 mb-1 uppercase tracking-wider">
                          {link.label}
                        </h3>
                        <p className="text-white font-medium break-words transition-colors duration-300">
                          {link.value}
                        </p>
                      </div>
                    </div>

                    <div className="absolute bottom-2 right-2 text-gray-600 group-hover:text-gray-800 transition-colors opacity-0 group-hover:opacity-100">
                      <FaArrowRight className="w-6 h-6" />
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center gap-20 mb-8">
          <Image src="/belen_logo.png" alt="Logo" width={300} height={100} />
          <div className="h-40 w-[0.2px] bg-white"></div>
          <Image
            src="/icons/full_icon.png"
            alt="Logo"
            width={300}
            height={100}
          />
        </div>

        {/* Alt çizgi */}
        <div className="border-t border-white pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © 2025 Belen & Partners. Tüm hakları saklıdır.
            </p>
            <div className="flex gap-6 text-sm text-gray-500">
              <span className="hover:text-gray-300 cursor-pointer transition-colors">
                Gizlilik Politikası
              </span>
              <span className="hover:text-gray-300 cursor-pointer transition-colors">
                Kullanım Koşulları
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
