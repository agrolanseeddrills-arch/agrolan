import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, hectares, crop, message } = body;

    // Валідація
    if (!name || !phone) {
      return NextResponse.json(
        { error: 'Ім\'я та телефон обов\'язкові' },
        { status: 400 }
      );
    }

    // Маппінг культур на українську мову
    const cropNames: { [key: string]: string } = {
      'vegetables': 'Овочі',
      'melons': 'Баштанні',
      'specialty': 'Спеціальні культури',
      'mixed': 'Різні культури',
    };

    const cropDisplay = crop ? (cropNames[crop] || crop) : 'Не вказано';

    // Налаштування транспортера Gmail
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER, // Ваш Gmail
        pass: process.env.GMAIL_APP_PASSWORD, // App Password з Gmail
      },
    });

    // Формування листа
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER, // Надсилаємо собі
      subject: 'Заявка на консультацію SVR1',
      html: `
        <h2>Нова заявка на консультацію</h2>
        <p><strong>Ім'я:</strong> ${name}</p>
        <p><strong>Телефон:</strong> ${phone}</p>
        <p><strong>Площа:</strong> ${hectares || 'Не вказано'} га</p>
        <p><strong>Культури:</strong> ${cropDisplay}</p>
        <p><strong>Коментар:</strong> ${message || 'Немає'}</p>
        <hr>
        <p><small>Дата: ${new Date().toLocaleString('uk-UA')}</small></p>
      `,
    };

    // Відправка листа
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Помилка відправки листа:', error);
    return NextResponse.json(
      { error: 'Помилка відправки форми' },
      { status: 500 }
    );
  }
}

