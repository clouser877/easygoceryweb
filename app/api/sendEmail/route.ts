import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const { name, email, query } = await req.json();

    if (!name || !email || !query) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

    const user = process.env.GMAIL_USER;
    const pass = process.env.GMAIL_APP_PASSWORD;

    if (!user || !pass) {
      console.error('Missing email env vars');
      return NextResponse.json({ error: 'Email server not configured.' }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user,
        pass, // Use App Password
      },
    });

    await transporter.sendMail({
      from: `"EasyGrocery Contact" <${user}>`,
      to: user,
      replyTo: email,
      subject: `New Contact: ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${query}`,
      html: `
        <div style="font-family: Arial; padding: 20px; background: #f4f4f4; border-radius: 10px;">
          <h2>New Message from EasyGrocery</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <blockquote style="background: white; padding: 15px; border-left: 4px solid #e7e6e6ff;">
            ${query.replace(/\n/g, '<br>')}
          </blockquote>
        </div>
      `,
    });

    return NextResponse.json({ message: 'Sent!' }, { status: 200 });
  } catch (error) {
    console.error('Email error:', error);
    return NextResponse.json({ error: 'Failed to send.' }, { status: 500 });
  }
}
