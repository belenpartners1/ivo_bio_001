import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const formatName = (str) => {
  if (!str) return "";
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

// Honeypot kontrolü
const isBot = (website) => {
  // Honeypot alanlardan biri doldurulmuşsa bot demektir
  if (website && website.trim() !== "") {
    console.log("🤖 BOT TESPİTİ: 'website' alanı doldurulmuş");
    return true;
  }
  return false;
};

export async function POST(req) {
  try {
    const {
      firstName: rawFirstName,
      lastName: rawLastName,
      phone,
      email,
      message,
      websiteUrl,
    } = await req.json();

    // Honeypot kontrolü - Bot ise fake başarı dönür
    if (isBot(websiteUrl)) {
      console.log("⚠️  BOT TESPİT EDİLDİ - FAKE 200 YANITI GÖNDERİLİYOR");
      return NextResponse.json(
        { success: true, message: "Mesajınız başarıyla gönderildi." },
        { status: 200 }
      );
    }

    const firstName = formatName(rawFirstName);
    const lastName = formatName(rawLastName);

    // Input validation
    const errors = {};
    if (!firstName) errors.firstName = "Ad alanı zorunludur";
    if (!lastName) errors.lastName = "Soyad alanı zorunludur";
    if (!phone) errors.phone = "Telefon alanı zorunludur";
    if (!email) errors.email = "E-posta alanı zorunludur";

    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (email && !emailRegex.test(email)) {
      errors.email = "Geçerli bir e-posta adresi giriniz";
    }

    const phoneRegex = /^[0-9+\s\-()]+$/;
    const cleanPhone = phone ? phone.replace(/[^0-9]/g, "") : "";
    if (phone && (cleanPhone.length < 10 || !phoneRegex.test(phone))) {
      errors.phone = "Geçerli bir telefon numarası giriniz";
    }

    if (message && message.length > 1000) {
      errors.message = "Mesaj en fazla 1000 karakter olabilir";
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ success: false, errors }, { status: 400 });
    }

    // ENV kontrolü
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.error("❌ SMTP env değerleri bulunamadı!");
      return NextResponse.json(
        { success: false, error: "Sunucu yapılandırma hatası" },
        { status: 500 }
      );
    }

    console.log("🔧 SMTP Ayarları:", {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      user: process.env.SMTP_USER,
      hasPassword: !!process.env.SMTP_PASS,
    });

    // Gmail SMTP yapılandırması
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false,
        minVersion: "TLSv1.2",
        ciphers: "SSLv3",
      },
      connectionTimeout: 20000,
      greetingTimeout: 20000,
      socketTimeout: 20000,
      logger: true,
      debug: true,
    });

    // SMTP bağlantısını test et
    console.log("🔍 SMTP bağlantısı test ediliyor...");
    try {
      await transporter.verify();
      console.log("✅ SMTP bağlantısı başarılı");
    } catch (verifyError) {
      console.error("❌ SMTP verify hatası:", verifyError);
      return NextResponse.json(
        {
          success: false,
          error: "Mail sunucusuna bağlanılamadı",
          details:
            process.env.NODE_ENV === "development"
              ? verifyError.message
              : undefined,
        },
        { status: 500 }
      );
    }

    // Mesaj satırı
    const messageRow = message
      ? `<tr>
          <td style="padding: 10px; font-weight: bold; background: #f3f4f6;">Görüşler</td>
          <td style="padding: 10px; background: #fff; white-space: pre-wrap;">${message}</td>
        </tr>`
      : "";

    const mailData = {
      from: `"İletişim Formu" <${process.env.SMTP_USER}>`,
      to: "info@b-ivo.com",
      replyTo: `"${firstName} ${lastName}" <${email}>`,
      subject: `${firstName} ${lastName} - İletişim Formu Mesajı`,
      html: `
<!doctype html>
<html lang='tr'>
<head><meta charset='utf-8'><meta name='viewport' content='width=device-width,initial-scale=1'></head>
<body style='margin:0;background:#fff;font-family:Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#1f2937;'>
  <table role='presentation' width='100%' cellpadding='0' cellspacing='0' style='background:#fff;padding:24px 0;'>
    <tr>
      <td align='center'>
        <table role='presentation' width='620' cellpadding='0' cellspacing='0' style='background:#ffffff;border:1px solid #e5e7eb;border-radius:10px;overflow:hidden;box-shadow:0 6px 16px rgba(0,0,0,.06);'>
          <tr>
            <td style='padding:24px 28px 8px 28px;'>
              <h1 style='margin:0 0 12px 0;font-size:22px;line-height:1.3;color:#0f47c1;'>B-IVO İletişim Formu</h1>
            </td>
          </tr>
          <tr>
            <td style='padding:0 28px 8px 28px;'>
              <table width='100%' cellpadding='0' cellspacing='0' style='border-collapse:separate;border-spacing:0;'>
                <tr>
                  <td style='background:#f3f4f6;padding:10px 12px;border:1px solid #e5e7eb;width:38%;font-weight:600;font-size:13px;color:#374151;'>Ad Soyad:</td>
                  <td style='padding:10px 12px;border:1px solid #e5e7eb;font-size:13px;color:#111827;'>${firstName} ${lastName}</td>
                </tr>
                <tr>
                  <td style='background:#f3f4f6;padding:10px 12px;border:1px solid #e5e7eb;font-weight:600;font-size:13px;color:#374151;'>E-posta:</td>
                  <td style='padding:10px 12px;border:1px solid #e5e7eb;font-size:13px;'>
                    <a href='mailto:${email}' style='color:#0f47c1;text-decoration:none;'>${email}</a>
                  </td>
                </tr>
                <tr>
                  <td style='background:#f3f4f6;padding:10px 12px;border:1px solid #e5e7eb;font-weight:600;font-size:13px;color:#374151;'>Telefon:</td>
                  <td style='padding:10px 12px;border:1px solid #e5e7eb;font-size:13px;'>
                    <a href='tel:${phone}' style='color:#0f47c1;text-decoration:none;'>${phone}</a>
                  </td>
                </tr>
                ${messageRow}
              </table>
            </td>
          </tr>
          <tr>
            <td style='padding:10px 28px 22px 28px;'>
              <div style='font-size:11px;color:#6b7280;text-align:center;'>Bu e-posta, b-ivo.com web sitesindeki iletişim formundan otomatik gelmiştir.</div>
              <div style='font-size:11px;color:#6b7280;text-align:center;margin-top:8px;'>Gönderim Tarihi: ${new Date().toLocaleString(
                "tr-TR",
                {
                  timeZone: "Europe/Istanbul",
                }
              )}</div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `,
      text: `Yeni İletişim Formu Mesajı\n\nAd Soyad: ${firstName} ${lastName}\nE-posta: ${email}\nTelefon: ${phone}${
        message ? `\n\nGörüşler:\n${message}` : ""
      }\n\nBu mesaj b-ivo.com web sitesindeki iletişim formundan gönderilmiştir.\nGönderim Tarihi: ${new Date().toLocaleString(
        "tr-TR",
        {
          timeZone: "Europe/Istanbul",
        }
      )}`,
    };

    // Mail gönder
    console.log("📧 Mail gönderiliyor...");
    await transporter.sendMail(mailData);
    console.log("✅ Mail başarıyla gönderildi");

    return NextResponse.json(
      { success: true, message: "Mesajınız başarıyla gönderildi." },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Form gönderimi hatası:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Mesaj gönderilirken bir hata oluştu",
        details:
          process.env.NODE_ENV === "development"
            ? error.message
            : "Lütfen daha sonra tekrar deneyin",
      },
      { status: 500 }
    );
  }
}
