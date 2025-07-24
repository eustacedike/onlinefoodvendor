
'use server'
import { createClient } from '@/utils/supabase/server'


export async function updateSocials(socials) {
    try {
      const supabase = await createClient();
  
      const results = [];
  
      for (const { icon, value, show } of socials) {
        const { data, error } = await supabase
          .from('socials')
          .update({ value, show })
          .eq('icon', icon);
  
        results.push({ icon, success: !error, error });
      }
  
      return results;
    } catch (error) {
      console.error('Unexpected error updating text:', error);
      return { success: false, error: 'An unexpected error occurred' };
    }
  }
  