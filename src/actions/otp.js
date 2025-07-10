// --- otp.js ---
'use server';

import { createClient } from '@/utils/supabase/server';

export async function requestOtp(email) {
  const supabase = await createClient();

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const now = new Date();
  const expiresAt = new Date(now.getTime() + 5 * 60000); // 5 mins
  const cooldownEnd = new Date(now.getTime() + 60000); // 1 min

  const { data: existing } = await supabase
    .from('guest_otp_verifications')
    .select('last_sent_at')
    .eq('email', email)
    .maybeSingle();

  if (existing?.last_sent_at && new Date(existing.last_sent_at) > now) {
    const wait = Math.ceil((new Date(existing.last_sent_at).getTime() - now.getTime()) / 1000);
    return { error: `Please wait ${wait}s before requesting another OTP.` };
  }

  const { error: upsertError } = await supabase
    .from('guest_otp_verifications')
    .upsert({
      email,
      otp,
      expires_at: expiresAt.toISOString(),
      verified: false,
      last_sent_at: cooldownEnd.toISOString()
    });

  if (upsertError) {
    console.error('OTP Upsert Error:', upsertError);
    return { error: 'Failed to store OTP.' };
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/requestotp`, {
    // '/api/requestotp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, otp })
  });

  const result = await res.json();
  if (!result.success) return { error: 'Failed to send OTP email.' };

  return { success: true };
}

export async function verifyOtp(email, enteredOtp, name, phone) {
  const supabase = await createClient();
  const now = new Date();

  const { data, error } = await supabase
    .from('guest_otp_verifications')
    .select('*')
    .eq('email', email)
    .maybeSingle();

  if (error || !data) return { error: 'Invalid email or OTP.' };
  if (new Date(data.expires_at) < now) return { error: 'OTP has expired.' };
  if (data.otp !== enteredOtp) return { error: 'Incorrect OTP.' };

  await supabase
    .from('guest_otp_verifications')
    .update({ verified: true })
    .eq('email', email);

  const { data: profileExists } = await supabase
    .from('profiles')
    .select('id')
    .eq('email', email)
    .maybeSingle();

    // if (retrieveError) {
    //   console.error('Supabase error checking profile:', retrieveError);
    // }
    // if (retrieveError && retrieveError.code !== 'PGRST116') {
    //   console.error('Error fetching profile:', retrieveError);
    // }

  if (!profileExists) {
    await supabase
    // .from('guest_users').insert({
    //   // id: crypto.randomUUID(),
    //   email,
    //   name: name,
    //   phone: phone,
    // });

    
    .from('guest_users')
    .upsert(
      {
        email,
        name: name,
        phone: phone,
      },
      { onConflict: 'email' }
    );
  }

  return { success: true };
}
