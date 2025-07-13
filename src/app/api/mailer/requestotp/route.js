// app/api/requestotp/route.js
// import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req) {
  const { email, otp } = await req.json()

  try {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  
    await transporter.sendMail({
    //   from: `"Aebis Unique Menu" <${process.env.EMAIL_USER}>`,
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'OTP Code',
      html: `
        <h2>Your OTP Code</h2>
        <p>Use the OTP code below to verify your email:</p>
        <h3>${otp}</h3>
        <p>This code will expire in 5 minutes.</p>
      `
    })
    return Response.json({ success: true })
  } catch (err) {
    console.error('Mail error:', err)
    return Response.json({ success: false, error: 'Failed to send OTP email.' }, { status: 500 })
  }
}
