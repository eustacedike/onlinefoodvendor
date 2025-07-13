// app/api/paystack/verify/route.js
import { createClient } from '@/utils/supabase/server';

export async function POST(req) {
  const supabase = await createClient();

  try {
    const body = await req.json();
    const { reference } = body;

    if (!reference) {
      return Response.json({ error: 'Missing reference' }, { status: 400 });
    }

    // Get the order first to check if mail has already been sent
    const { data: order, error: fetchError } = await supabase
      .from('orders')
      .select('verified')
      .eq('ref', reference)
      .single();

    if (fetchError || !order) {
      console.error('Order fetch error:', fetchError);
      return Response.json({ error: 'Order not found' }, { status: 404 });
    }

    const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();

    if (!result.status) {
      console.error('Paystack error:', result);
      return Response.json({ message: 'Failed to verify payment', error: result.message }, { status: 400 });
    }


    await supabase
      .from('orders')
      .update({ verified: true })
      .eq('ref', reference);

      const email = result.data.customer.email;
      const subtotal = result.data.amount / 100; // Convert to Naira

    // Send email confirmation
    if (!order.verified) {
      
    await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/mailer/ordermail`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, ref: reference, subtotal }),
    });
}
    console.log('Paystack verification result:', result);
    return Response.json(result);
   
  } catch (error) {
    console.error('Paystack init error:', error);
    return Response.json({ message: 'Server error', error: error.message }, { status: 500 });
  }
}
