"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";

const ContactForm = () => {
  const t = useTranslations("contactForm");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Form gönderme işlemi buraya eklenebilir
  };

  return (
    <div
      className="h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-6 font-quicksand"
      id="iletisim"
    >
      <div className="max-w-5xl w-full grid md:grid-cols-2 gap-12 items-center">
        {/* Sol Taraf - Başlık ve Açıklama */}
        <div className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900">
              {t("title")}
              <span className="block text-gray-500">{t("subtitle")}</span>
            </h2>
            <p className="text-lg text-gray-500 leading-relaxed">
              {t("description1")}
            </p>
            <p className="text-lg text-gray-500 leading-relaxed">
              {t("description2")}
            </p>
          </div>

          {/* İletişim Bilgileri */}
          <div className="space-y-4 pt-8">
            <div className="flex items-center gap-4 text-gray-600">
              <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <span className="text-lg">info@belenandpartners.com</span>
            </div>
            <div className="flex items-center gap-4 text-gray-600">
              <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <span className="text-lg">+90 312 473 56 50</span>
            </div>
          </div>
        </div>

        {/* Sağ Taraf - Form */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Ad */}
            <div className="space-y-2">
              <label
                htmlFor="firstName"
                className="block font-medium text-gray-700 ml-1"
              >
                {t("firstName")}
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:border-gray-400 focus:ring-4 focus:ring-gray-100 outline-none transition-all duration-200 text-gray-800"
                placeholder={t("firstNamePlaceholder")}
              />
            </div>

            {/* Soyad */}
            <div className="space-y-2">
              <label
                htmlFor="lastName"
                className="block ml-1 font-medium text-gray-700"
              >
                {t("lastName")}
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:border-gray-400 focus:ring-4 focus:ring-gray-100 outline-none transition-all duration-200 text-gray-800"
                placeholder={t("lastNamePlaceholder")}
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block ml-1 font-medium text-gray-700"
              >
                {t("email")}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:border-gray-400 focus:ring-4 focus:ring-gray-100 outline-none transition-all duration-200 text-gray-800"
                placeholder={t("emailPlaceholder")}
              />
            </div>

            {/* Telefon */}
            <div className="space-y-2">
              <label
                htmlFor="phone"
                className="block ml-1 font-medium text-gray-700"
              >
                {t("phone")}
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:border-gray-400 focus:ring-4 focus:ring-gray-100 outline-none transition-all duration-200 text-gray-800"
                placeholder={t("phonePlaceholder")}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gray-800 text-white py-4 rounded-2xl font-semibold text-lg hover:bg-gray-900 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
            >
              {t("submit")}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
