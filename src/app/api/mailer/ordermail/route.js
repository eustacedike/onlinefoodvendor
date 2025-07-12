// app/api/requestotp/route.js
// import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req) {
    const { email, ref, subtotal, address } = await req.json()

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
            subject: 'Order Confirmation',
            html: `
        <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Order Confirmation</title>
    <style>
      body {
        font-family: 'Segoe UI', sans-serif;
        background-color: #f9f9f9;
        margin: 0;
        padding: 0;
        color: #333;
      }

      .email-container {
        max-width: 600px;
        margin: 2rem auto;
        background-color: #ffffff;
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        padding: 2rem;
      }

      h2 {
        color: #3d9970;
        margin-bottom: 0.5rem;
      }

      .order-details {
        margin-top: 1.5rem;
        background-color: #f3f3f3;
        padding: 1rem;
        border-radius: 5px;
        font-size: 0.95rem;
      }

      .footer {
        margin-top: 2rem;
        font-size: 0.85rem;
        color: #777;
        text-align: center;
      }

      .button {
        display: inline-block;
        margin-top: 1rem;
        padding: 10px 20px;
        background-color: #3d9970;
        color: white;
        text-decoration: none;
        border-radius: 4px;
      }

      @media (max-width: 600px) {
        .email-container {
          padding: 1rem;
        }
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <h2>Thank you for your order!</h2>
      <p>Hello there,</p>

      <p>Your order has been successfully received and is now being processed by our team at <strong>Aebis Unique Menu</strong>.</p>

      <div class="order-details">
        <p><strong>Delivery Address:</strong> ${address}</p>
        <p><strong>Total:</strong> ₦${subtotal}</p>
      </div>

      <p>You will receive another update once your order is on the way.</p>

      <a style="color:white;" href="${process.env.NEXT_PUBLIC_SITE_URL}/orders/${ref}" class="button">View Your Order</a>

      <div class="footer">
        <p>Need help? Just reply to this email or contact us at <a href="mailto:${process.env.EMAIL_USER}">${process.env.EMAIL_USER}</a>.</p>
        <p>Thanks for choosing Aebis Unique Menu!</p>
      </div>
    </div>
  </body>
</html>

      `
        })
        return Response.json({ success: true })
    } catch (err) {
        console.error('Mail error:', err)
        return Response.json({ success: false, error: 'Failed to send OTP email.' }, { status: 500 })
    }
}
