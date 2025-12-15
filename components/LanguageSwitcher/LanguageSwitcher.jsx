"use client";

import { useParams } from "next/navigation";
import { useRouter, usePathname } from "@/i18n/routing";
import { useState, useTransition } from "react";

const languages = [
  {
    code: "tr",
    name: "Türkçe",
    flag: (
      <svg className="w-6 h-4" viewBox="0 0 36 24" xmlns="http://www.w3.org/2000/svg">
        <rect width="36" height="24" fill="#E30A17"/>
        <circle cx="12" cy="12" r="5" fill="white"/>
        <circle cx="13.5" cy="12" r="4" fill="#E30A17"/>
        <polygon points="19,9 17,11 18.5,13 16,12 15,14.5 14,12 11.5,13 13,11 12,9 14,10.5" fill="white"/>
      </svg>
    )
  },
  {
    code: "en",
    name: "English",
    flag: (
      <svg className="w-6 h-4" viewBox="0 0 60 30" xmlns="http://www.w3.org/2000/svg">
        <clipPath id="s"><path d="M0,0 v30 h60 v-30 z"/></clipPath>
        <clipPath id="t"><path d="M30,15 h30 v15 z v-30 h-30 z h-30 v15 z v-30 h30 z"/></clipPath>
        <g clipPath="url(#s)">
          <path d="M0,0 v30 h60 v-30 z" fill="#012169"/>
          <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
          <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#t)" stroke="#C8102E" strokeWidth="4"/>
          <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10"/>
          <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6"/>
        </g>
      </svg>
    )
  },
  // { code: 'ar', name: 'العربية', flag: '🇸🇦' }
];

export default function LanguageSwitcher() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();
  const [isOpen, setIsOpen] = useState(false);

  const currentLocale = params.locale || "tr";
  const currentLanguage = languages.find((lang) => lang.code === currentLocale);

  function onSelectChange(nextLocale) {
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale, scroll: false });
      setIsOpen(false);
    });
  }

  return (
    <div className="relative font-quicksand">
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isPending}
        className="flex items-center gap-2 px-2 sm:px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-all duration-200 border border-white/20"
      >
        <span className="flex items-center">{currentLanguage?.flag}</span>
        <span className="text-gray-800 hidden sm:inline">{currentLanguage?.name}</span>
        <svg
          className={`w-4 h-4 transition-transform hidden sm:block ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg overflow-hidden z-20 border border-gray-200">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => onSelectChange(language.code)}
                disabled={isPending}
                className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition-colors ${
                  currentLocale === language.code
                    ? "bg-gray-50 font-medium"
                    : ""
                }`}
              >
                <span className="flex items-center">{language.flag}</span>
                <span className="text-sm text-gray-800">{language.name}</span>
                {currentLocale === language.code && (
                  <svg
                    className="w-4 h-4 ml-auto text-green-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
