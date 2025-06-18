
import nodemailer from 'nodemailer';

export async function POST(req) {
  const { fullname, email, phoneno, subject, message } = await req.json();

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,     // your Gmail address
        pass: process.env.EMAIL_PASS      // app-specific password or OAuth
      }
    });

    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL_TO,          // your receiving email
      subject: `Contact message from ${fullname} && Phoneno: ${phoneno} && Subject: ${subject}`,
      text: message,
    });

    return Response.json({ success: true });
  } catch (err) {
    console.error('Email error:', err);
    return Response.json({ success: false }, { status: 500 });
  }
}
