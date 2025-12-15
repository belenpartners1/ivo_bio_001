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
    message: "",
    websiteUrl: "", // Honeypot field - should remain empty
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Ad validasyonu
    if (!formData.firstName.trim()) {
      newErrors.firstName = "Ad alanı zorunludur";
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = "Ad en az 2 karakter olmalıdır";
    } else if (!/^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/.test(formData.firstName)) {
      newErrors.firstName = "Ad sadece harf içermelidir";
    }

    // Soyad validasyonu
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Soyad alanı zorunludur";
    } else if (formData.lastName.trim().length < 2) {
      newErrors.lastName = "Soyad en az 2 karakter olmalıdır";
    } else if (!/^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/.test(formData.lastName)) {
      newErrors.lastName = "Soyad sadece harf içermelidir";
    }

    // Email validasyonu
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "E-posta alanı zorunludur";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Geçerli bir e-posta adresi giriniz";
    }

    // Telefon validasyonu
    const phoneRegex = /^[0-9+\s\-()]+$/;
    if (!formData.phone.trim()) {
      newErrors.phone = "Telefon alanı zorunludur";
    } else if (formData.phone.replace(/[^0-9]/g, "").length < 10) {
      newErrors.phone = "Geçerli bir telefon numarası giriniz";
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Telefon numarası sadece rakam ve özel karakterler içerebilir";
    }

    // Mesaj validasyonu (opsiyonel ama varsa kontrol et)
    if (formData.message && formData.message.length > 1000) {
      newErrors.message = "Mesaj en fazla 1000 karakter olabilir";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Honeypot kontrolü - bot tespiti
    if (formData.websiteUrl !== "") {
      // Bot tespit edildi - sessizce başarılı gibi göster
      setIsSubmitting(true);
      setTimeout(() => {
        setSubmitStatus({ type: "success", message: "Mesajınız başarıyla gönderildi." });
        setIsSubmitting(false);
      }, 1000);
      return;
    }

    // Form validasyonu
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({ type: "success", message: data.message });
        // Formu temizle
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          message: "",
          websiteUrl: "",
        });
      } else {
        setSubmitStatus({ type: "error", message: data.message });
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "Bir hata oluştu. Lütfen tekrar deneyin.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4 md:px-6 py-8 md:py-12 font-quicksand"
      id="iletisim"
    >
      <div className="max-w-5xl w-full grid md:grid-cols-2 gap-6 md:gap-8 items-center">
        {/* Sol Taraf - Başlık ve Açıklama */}
        <div className="space-y-4 md:space-y-6">
          <div className="space-y-3 md:space-y-4">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900">
              {t("title")}
              <span className="block text-gray-500 mt-1 md:mt-2">{t("subtitle")}</span>
            </h2>
            <p className="text-base md:text-lg text-gray-500 leading-relaxed">
              {t("description1")}
            </p>
            <p className="text-base md:text-lg text-gray-500 leading-relaxed">
              {t("description2")}
            </p>
          </div>

          {/* İletişim Bilgileri */}
          <div className="space-y-3 md:space-y-4 pt-4 md:pt-8">
            <div className="flex items-center gap-3 md:gap-4 text-gray-600">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-white shadow-sm flex items-center justify-center shrink-0">
                <svg
                  className="w-5 h-5 md:w-6 md:h-6"
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
              <span className="text-sm md:text-base lg:text-lg break-all">info@belenandpartners.com</span>
            </div>
            <div className="flex items-center gap-3 md:gap-4 text-gray-600">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-white shadow-sm flex items-center justify-center shrink-0">
                <svg
                  className="w-5 h-5 md:w-6 md:h-6"
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
              <span className="text-sm md:text-base lg:text-lg">+90 312 473 56 50</span>
            </div>
          </div>
        </div>

        {/* Sağ Taraf - Form */}
        <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl p-5 md:p-6 lg:p-8">
          <form onSubmit={handleSubmit} className="space-y-3.5 md:space-y-4">
            {/* Ad */}
            <div className="space-y-1 md:space-y-1.5">
              <label
                htmlFor="firstName"
                className="block font-medium text-gray-700 ml-1 text-xs md:text-sm"
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
                className={`w-full px-3 md:px-4 py-2.5 md:py-3 rounded-xl md:rounded-2xl border transition-all duration-200 text-gray-800 text-sm md:text-base outline-none ${
                  errors.firstName
                    ? "border-red-300 focus:border-red-400 focus:ring-2 md:focus:ring-4 focus:ring-red-100"
                    : "border-gray-200 focus:border-gray-400 focus:ring-2 md:focus:ring-4 focus:ring-gray-100"
                }`}
                placeholder={t("firstNamePlaceholder")}
              />
              {errors.firstName && (
                <p className="text-red-600 text-xs ml-1">{errors.firstName}</p>
              )}
            </div>

            {/* Soyad */}
            <div className="space-y-1 md:space-y-1.5">
              <label
                htmlFor="lastName"
                className="block ml-1 font-medium text-gray-700 text-xs md:text-sm"
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
                className={`w-full px-3 md:px-4 py-2.5 md:py-3 rounded-xl md:rounded-2xl border transition-all duration-200 text-gray-800 text-sm md:text-base outline-none ${
                  errors.lastName
                    ? "border-red-300 focus:border-red-400 focus:ring-2 md:focus:ring-4 focus:ring-red-100"
                    : "border-gray-200 focus:border-gray-400 focus:ring-2 md:focus:ring-4 focus:ring-gray-100"
                }`}
                placeholder={t("lastNamePlaceholder")}
              />
              {errors.lastName && (
                <p className="text-red-600 text-xs ml-1">{errors.lastName}</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-1 md:space-y-1.5">
              <label
                htmlFor="email"
                className="block ml-1 font-medium text-gray-700 text-xs md:text-sm"
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
                className={`w-full px-3 md:px-4 py-2.5 md:py-3 rounded-xl md:rounded-2xl border transition-all duration-200 text-gray-800 text-sm md:text-base outline-none ${
                  errors.email
                    ? "border-red-300 focus:border-red-400 focus:ring-2 md:focus:ring-4 focus:ring-red-100"
                    : "border-gray-200 focus:border-gray-400 focus:ring-2 md:focus:ring-4 focus:ring-gray-100"
                }`}
                placeholder={t("emailPlaceholder")}
              />
              {errors.email && (
                <p className="text-red-600 text-xs ml-1">{errors.email}</p>
              )}
            </div>

            {/* Telefon */}
            <div className="space-y-1 md:space-y-1.5">
              <label
                htmlFor="phone"
                className="block ml-1 font-medium text-gray-700 text-xs md:text-sm"
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
                className={`w-full px-3 md:px-4 py-2.5 md:py-3 rounded-xl md:rounded-2xl border transition-all duration-200 text-gray-800 text-sm md:text-base outline-none ${
                  errors.phone
                    ? "border-red-300 focus:border-red-400 focus:ring-2 md:focus:ring-4 focus:ring-red-100"
                    : "border-gray-200 focus:border-gray-400 focus:ring-2 md:focus:ring-4 focus:ring-gray-100"
                }`}
                placeholder={t("phonePlaceholder")}
              />
              {errors.phone && (
                <p className="text-red-600 text-xs ml-1">{errors.phone}</p>
              )}
            </div>

            {/* Görüşleriniz */}
            <div className="space-y-1 md:space-y-1.5">
              <label
                htmlFor="message"
                className="block ml-1 font-medium text-gray-700 text-xs md:text-sm"
              >
                {t("message")}
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="3"
                className={`w-full px-3 md:px-4 py-2.5 md:py-3 rounded-xl md:rounded-2xl border transition-all duration-200 text-gray-800 text-sm md:text-base resize-none outline-none ${
                  errors.message
                    ? "border-red-300 focus:border-red-400 focus:ring-2 md:focus:ring-4 focus:ring-red-100"
                    : "border-gray-200 focus:border-gray-400 focus:ring-2 md:focus:ring-4 focus:ring-gray-100"
                }`}
                placeholder={t("messagePlaceholder")}
              />
              {errors.message && (
                <p className="text-red-600 text-xs ml-1">{errors.message}</p>
              )}
            </div>

            {/* Honeypot field - hidden from users, visible to bots */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="websiteUrl">Website URL</label>
              <input
                type="text"
                id="websiteUrl"
                name="websiteUrl"
                value={formData.websiteUrl}
                onChange={handleChange}
                tabIndex="-1"
                autoComplete="off"
              />
            </div>

            {/* Status Messages */}
            {submitStatus && (
              <div
                className={`p-2.5 md:p-3 rounded-xl md:rounded-2xl text-center font-medium text-xs md:text-sm ${
                  submitStatus.type === "success"
                    ? "bg-green-50 text-green-700 border border-green-200"
                    : "bg-red-50 text-red-700 border border-red-200"
                }`}
              >
                {submitStatus.message}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 md:py-3.5 rounded-xl md:rounded-2xl font-semibold text-sm md:text-base transition-all duration-300 shadow-lg ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gray-800 text-white hover:bg-gray-900 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
              }`}
            >
              {isSubmitting ? t("submitting") || "Gönderiliyor..." : t("submit")}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
