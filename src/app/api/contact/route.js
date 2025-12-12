import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, phone, message, websiteUrl } = body;

    // Honeypot kontrolü - bot tespiti
    if (websiteUrl && websiteUrl.trim() !== "") {
      // Bot tespit edildi - başarılı gibi göster ama email gönderme
      return NextResponse.json(
        {
          success: true,
          message: "Mesajınız başarıyla gönderildi.",
        },
        { status: 200 }
      );
    }

    // Zorunlu alanları kontrol et
    if (!firstName || !lastName || !email || !phone) {
      return NextResponse.json(
        {
          success: false,
          message: "Ad, Soyad, Email ve Telefon alanları zorunludur.",
        },
        { status: 400 }
      );
    }

    // Ad validasyonu
    if (typeof firstName !== "string" || firstName.trim().length < 2) {
      return NextResponse.json(
        {
          success: false,
          message: "Ad en az 2 karakter olmalıdır.",
        },
        { status: 400 }
      );
    }

    if (firstName.trim().length > 50) {
      return NextResponse.json(
        {
          success: false,
          message: "Ad en fazla 50 karakter olabilir.",
        },
        { status: 400 }
      );
    }

    // Tehlikeli karakterleri kontrol et (XSS prevention)
    const dangerousCharsRegex = /<|>|&lt;|&gt;|script|onclick|onerror/i;
    if (dangerousCharsRegex.test(firstName)) {
      return NextResponse.json(
        {
          success: false,
          message: "Ad geçersiz karakterler içeriyor.",
        },
        { status: 400 }
      );
    }

    // Soyad validasyonu
    if (typeof lastName !== "string" || lastName.trim().length < 2) {
      return NextResponse.json(
        {
          success: false,
          message: "Soyad en az 2 karakter olmalıdır.",
        },
        { status: 400 }
      );
    }

    if (lastName.trim().length > 50) {
      return NextResponse.json(
        {
          success: false,
          message: "Soyad en fazla 50 karakter olabilir.",
        },
        { status: 400 }
      );
    }

    if (dangerousCharsRegex.test(lastName)) {
      return NextResponse.json(
        {
          success: false,
          message: "Soyad geçersiz karakterler içeriyor.",
        },
        { status: 400 }
      );
    }

    // Email validasyonu
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          message: "Geçerli bir email adresi giriniz.",
        },
        { status: 400 }
      );
    }

    if (email.length > 100) {
      return NextResponse.json(
        {
          success: false,
          message: "Email adresi çok uzun.",
        },
        { status: 400 }
      );
    }

    // Telefon validasyonu
    const cleanPhone = phone.replace(/[^0-9]/g, "");
    if (cleanPhone.length < 10 || cleanPhone.length > 15) {
      return NextResponse.json(
        {
          success: false,
          message: "Geçerli bir telefon numarası giriniz.",
        },
        { status: 400 }
      );
    }

    const phoneRegex = /^[0-9+\s\-()]+$/;
    if (!phoneRegex.test(phone)) {
      return NextResponse.json(
        {
          success: false,
          message: "Telefon numarası geçersiz karakterler içeriyor.",
        },
        { status: 400 }
      );
    }

    // Mesaj validasyonu (opsiyonel)
    if (message) {
      if (typeof message !== "string") {
        return NextResponse.json(
          {
            success: false,
            message: "Mesaj formatı geçersiz.",
          },
          { status: 400 }
        );
      }

      if (message.length > 1000) {
        return NextResponse.json(
          {
            success: false,
            message: "Mesaj en fazla 1000 karakter olabilir.",
          },
          { status: 400 }
        );
      }

      if (dangerousCharsRegex.test(message)) {
        return NextResponse.json(
          {
            success: false,
            message: "Mesaj geçersiz karakterler içeriyor.",
          },
          { status: 400 }
        );
      }
    }

    // Nodemailer transporter oluştur
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT),
      secure: process.env.EMAIL_PORT === "465", // SSL için true
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email içeriğini hazırla
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      subject: `Yeni İletişim Formu Mesajı - ${firstName} ${lastName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #4a5568; padding-bottom: 10px;">
            Yeni İletişim Formu Mesajı
          </h2>

          <div style="background-color: #f7fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #2d3748; margin-top: 0;">Gönderen Bilgileri</h3>

            <p style="margin: 10px 0;">
              <strong style="color: #4a5568;">Ad Soyad:</strong>
              <span style="color: #2d3748;">${firstName} ${lastName}</span>
            </p>

            <p style="margin: 10px 0;">
              <strong style="color: #4a5568;">Email:</strong>
              <a href="mailto:${email}" style="color: #3182ce;">${email}</a>
            </p>

            <p style="margin: 10px 0;">
              <strong style="color: #4a5568;">Telefon:</strong>
              <a href="tel:${phone}" style="color: #3182ce;">${phone}</a>
            </p>
          </div>

          ${
            message
              ? `
          <div style="background-color: #fff; padding: 20px; border-left: 4px solid #4a5568; margin: 20px 0;">
            <h3 style="color: #2d3748; margin-top: 0;">Görüşler</h3>
            <p style="color: #4a5568; line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>
          `
              : ""
          }

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; color: #718096; font-size: 12px;">
            <p>Bu mesaj belenandpartners.com web sitesindeki iletişim formundan gönderilmiştir.</p>
            <p>Gönderim Tarihi: ${new Date().toLocaleString("tr-TR", {
              timeZone: "Europe/Istanbul",
            })}</p>
          </div>
        </div>
      `,
      text: `
Yeni İletişim Formu Mesajı

Gönderen Bilgileri:
Ad Soyad: ${firstName} ${lastName}
Email: ${email}
Telefon: ${phone}

${message ? `Görüşler:\n${message}\n` : ""}

Bu mesaj belenandpartners.com web sitesindeki iletişim formundan gönderilmiştir.
Gönderim Tarihi: ${new Date().toLocaleString("tr-TR", {
        timeZone: "Europe/Istanbul",
      })}
      `,
    };

    // Email gönder
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      {
        success: true,
        message: "Mesajınız başarıyla gönderildi.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Email gönderme hatası:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin.",
        error: process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: 500 }
    );
  }
}
