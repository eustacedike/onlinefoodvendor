// src/app/api/paystack/init/route.js
import { createClient } from '@/utils/supabase/server';

export async function POST(req) {
   const supabase = await createClient();
    try {
      const body = await req.json();
      const { email, amount, type, items, address, delivery, vat, subtotal, phoneno } = body;
  
      const response = await fetch("https://api.paystack.co/transaction/initialize", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          amount,
          callback_url: '/orders/M9E7YT82WQLF46GH',
        }),
      });
  
      const result = await response.json();
    //   console.log("Paystack response:", result);


  
      if (!result.status) {
        console.error("Paystack error:", result);
        return Response.json({ message: "Failed to initialize payment", error: result.message }, { status: 400 });
      }
      
  
      // console.log('Initialized transaction ref:', result.data.reference);
      const { error: upsertError } = await supabase
      .from('orders')
      .insert({
        ref: result.data.reference,
        owner: email,
        type,
        items,
        address,
        amount: amount/100,
        delivery,
        vat,
        subtotal,
        phone: phoneno
        
        // expires_at: expiresAt.toISOString(),
        // verified: false,
        // last_sent_at: cooldownEnd.toISOString()
      });

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SITE_URL}/api/mailer/ordermail`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email,  ref: result.data.reference, subtotal, address })
      });

      return Response.json(result); // returns authorization_url, access_code, reference
    } catch (error) {
      console.error("Paystack init error:", error);
      return Response.json({ message: "Server error", error: error.message }, { status: 500 });
    }

    // console.log(result);

  }
  