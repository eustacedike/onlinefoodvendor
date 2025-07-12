// app/api/paystack/verify/route.js

// import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(req) {
    const supabase = await createClient();
    try {
        const body = await req.json();
        const { reference } = body;

        const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                reference
            }),
        });

        const result = await response.json();

        if (!reference) {
            return Response.json({ error: 'Missing reference' }, { status: 400 });
        }

        if (!result.status) {
            console.error("Paystack error:", result);
            return Response.json({ message: "Failed to initialize payment", error: result.message }, { status: 400 });
        }



        const { error } = await supabase
            .from('orders')
            .update({ verified: true })
            .eq('reference', reference);

        const res = await fetch(
            `${process.env.NEXT_PUBLIC_SITE_URL}/api/mailer/ordermail`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, ref: result.data.reference, subtotal, address })
        });
        return Response.json(result); // returns authorization_url, access_code, reference

    }

    catch (error) {
        console.error("Paystack init error:", error);
        return Response.json({ message: "Server error", error: error.message }, { status: 500 });
    }

}
