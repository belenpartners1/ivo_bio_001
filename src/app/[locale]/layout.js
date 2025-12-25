import { Geist, Geist_Mono, Quicksand } from "next/font/google";
import "../globals.css";
import AdvertiseHeader from "../../../components/advertiseHeader/AdvertiseHeader";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const quicksand = Quicksand({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-quicksand",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata = {
  title: "İVO BİO – Yeni Nesil Modüler Yaşam",
  description:
    "Doğayla uyumlu, enerji verimli ve akıllı yaşam sistemleriyle tasarlanan İVO BİO modülleri; ferah yaşam alanı, her mevsim konforlu ve sürdürülebilir bir deneyim sunar.",
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    title: "İVO BİO – Yeni Nesil Modüler Yaşam",
    description:
      "Doğayla uyumlu, enerji verimli ve akıllı yaşam sistemleriyle tasarlanan İVO BİO modülleri; ferah yaşam alanı, her mevsim konforlu ve sürdürülebilir bir deneyim sunar.",
    images: [
      {
        url: "/favicon.png",
        width: 800,
        height: 600,
        alt: "İVO BİO Logo",
      },
    ],
    type: "website",
    siteName: "İVO BİO",
    locale: "tr_TR",
  },
  twitter: {
    card: "summary_large_image",
    title: "İVO BİO – Yeni Nesil Modüler Yaşam",
    description:
      "Doğayla uyumlu, enerji verimli ve akıllı yaşam sistemleriyle tasarlanan İVO BİO modülleri; ferah yaşam alanı, her mevsim konforlu ve sürdürülebilir bir deneyim sunar.",
    images: ["/favicon.png"],
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${quicksand.variable} antialiased relative selection:bg-yesil overflow-hidden`}
      >
        <NextIntlClientProvider messages={messages}>
          <AdvertiseHeader />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
