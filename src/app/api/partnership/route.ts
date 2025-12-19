import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { companyName, contactPerson, phone, region, businessType } = body;

    // Валідація
    if (!companyName || !contactPerson || !phone) {
      return NextResponse.json(
        { error: 'Всі поля обов\'язкові' },
        { status: 400 }
      );
    }

    // Маппінг регіонів на українську мову
    const regionNames: { [key: string]: string } = {
      'vinnytsia': 'Вінницька область',
      'volyn': 'Волинська область',
      'dnipro': 'Дніпропетровська область',
      'donetsk': 'Донецька область',
      'zhytomyr': 'Житомирська область',
      'zakarpattia': 'Закарпатська область',
      'zaporizhzhia': 'Запорізька область',
      'ivano-frankivsk': 'Івано-Франківська область',
      'kyiv': 'Київська область',
      'kirovohrad': 'Кіровоградська область',
      'luhansk': 'Луганська область',
      'lviv': 'Львівська область',
      'mykolaiv': 'Миколаївська область',
      'odesa': 'Одеська область',
      'poltava': 'Полтавська область',
      'rivne': 'Рівненська область',
      'sumy': 'Сумська область',
      'ternopil': 'Тернопільська область',
      'kharkiv': 'Харківська область',
      'kherson': 'Херсонська область',
      'khmelnytskyi': 'Хмельницька область',
      'cherkasy': 'Черкаська область',
      'chernivtsi': 'Чернівецька область',
      'chernihiv': 'Чернігівська область',
      'other': 'Інший регіон',
    };

    // Маппінг типів бізнесу на українську мову
    const businessTypeNames: { [key: string]: string } = {
      'dealer': 'Дилер сільгосптехніки',
      'retailer': 'Роздрібний магазин',
      'distributor': 'Дистриб\'ютор',
      'other': 'Інше',
    };

    const regionDisplay = region ? (regionNames[region] || region) : 'Не вказано';
    const businessTypeDisplay = businessType ? (businessTypeNames[businessType] || businessType) : 'Не вказано';

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
      subject: 'Заявка на партнерство SVR1',
      html: `
        <h2>Нова заявка на партнерство</h2>
        <p><strong>Назва компанії:</strong> ${companyName}</p>
        <p><strong>Контактна особа:</strong> ${contactPerson}</p>
        <p><strong>Телефон:</strong> ${phone}</p>
        <p><strong>Регіон:</strong> ${regionDisplay}</p>
        <p><strong>Тип бізнесу:</strong> ${businessTypeDisplay}</p>
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

