'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'



export async function login(_prevState: any, formData: FormData) {
  const supabase = await createClient()
  // console.log('Login function called');
  // console.log('prevState:', _prevState);
  // console.log('formData:', formData);
  // console.log('formData type:', typeof formData);


  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {


    return {
      error: error.message,
      code: error.status,
      type: 'auth_error',

    };
  }

  // console.log(data)
  revalidatePath('/profile')
  revalidatePath('/cart', 'layout')  
  redirect('/profile')
  // location.reload();
}




export async function signup(_prevState: any, formData: FormData) {
  const supabase = await createClient();

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const confirmPassword = formData.get('confirmPassword') as string;
  const name = formData.get('name') as string;
  const phone = formData.get('phone') as string;

   // ✅ Password confirmation validation
   if (password !== confirmPassword) {
    return {
      error: "Passwords do not match",
      code: 400,
      type: 'validation_error',
    };
  }

  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        phone,
      },
    },
  });

  if (authError) {
    console.error('The error:', authError)

    return {
      error: authError.message,
      code: authError.status,
      type: 'auth_error',

    };
  }

  // Success — user will need to verify email
  revalidatePath('/', 'layout');
  redirect('/confirm-email'); // tell user to check their email
}

export async function logout() {
  const supabase = await createClient()

  const { error } = await supabase.auth.signOut()

  if (error) {
    console.error('Logout error:', error)
    alert('Failed to logout')
  } else {
    // window.location.href = '/'
    revalidatePath('/cart', 'layout') 
    redirect('/') // or replace with router.push() if in a client component
  }
}


export async function requestPasswordReset(email: string) {
  const supabase = await createClient();

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/reset-password`, // 👈 where the user is taken to complete the reset
  });

  if (error) {
    console.error('Error sending reset email:', error.message);
    return { error: error.message };
  }

  return { success: true };
}