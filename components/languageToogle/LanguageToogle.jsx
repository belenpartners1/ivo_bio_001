import { useState } from "react";

export default function LanguageSelector() {
  const [locale, setLocale] = useState("tr");

  const languages = [
    { code: "tr", label: "TR" },
    { code: "en", label: "EN" },
    // { code: "ar", label: "AR" },
  ];

  return (
    // <select
    //   value={locale}
    //   onChange={(e) => setLocale(e.target.value)}
    //   className="px-3 py-1.5 border border-gray-300 rounded-xl bg-white cursor-pointer text-kahverengi text-quicksand"
    // >
    //   {languages.map((lang) => (
    //     <option key={lang.code} value={lang.code}>
    //       {lang.label}
    //     </option>
    //   ))}
    // </select>

    <select
      value={locale}
      onChange={(e) => setLocale(e.target.value)}
      className="px-3 py-1.5 bg-white/10 backdrop-blur-xl shadow-lg rounded-3xl border border-gri text-black/80 text-quicksand cursor-pointer transition-colors duration-200 hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-gri focus:bg-white/20"
    >
      {languages.map((lang) => (
        <option
          key={lang.code}
          value={lang.code}
          className="bg-white text-black/80 "
        >
          {lang.label}
        </option>
      ))}
    </select>
  );
}
