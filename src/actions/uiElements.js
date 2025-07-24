
'use server'
import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateHeroImages(formData) {
    try {
        const supabase = createClient()

        const hero1 = formData.get('hero1')
        const hero2 = formData.get('hero2')
        const hero3 = formData.get('hero3')

        const heroImages = { hero1, hero2, hero3 }
        // const updatedUrls = {}
        // let hasUpdates = false

        // Check if all are strings
        const allAreStrings = Object.values(heroImages).every(value =>
            typeof value === 'string' || value === null
        )

        if (allAreStrings) {
            return { message: 'No updates needed' }
        }

        // Process files
        for (const [key, file] of Object.entries(heroImages)) {
            if (typeof file === 'string' || !file || file.size === 0) {
                continue
            }

            const filePath = `hero-imgs/${key}.png`

            const { error: uploadError } = await supabase.storage
                .from('products')
                .upload(filePath, file, {
                    cacheControl: '3600',
                    upsert: true
                })



            if (uploadError) {
                console.error(`upload error": ${uploadError}`)
            }

            //   if (!uploadError) {
            //     const { data: urlData } = supabase.storage
            //       .from('components')
            //       .getPublicUrl(filePath)

            //     updatedUrls[key] = urlData.publicUrl
            //     hasUpdates = true
            //   }
        }

        // if (hasUpdates) {
        //   // Update database
        //   const { data: currentComponent } = await supabase
        //     .from('components')
        //     .select('value')
        //     .eq('id', 'hero_imgs')
        //     .single()

        //   const currentUrls = currentComponent?.value || []
        //   const newUrls = [...currentUrls]

        //   if (updatedUrls.hero1) newUrls[0] = updatedUrls.hero1
        //   if (updatedUrls.hero2) newUrls[1] = updatedUrls.hero2  
        //   if (updatedUrls.hero3) newUrls[2] = updatedUrls.hero3

        //   await supabase
        //     .from('components')
        //     .update({ value: newUrls })
        //     .eq('id', 'hero_imgs')

        //   revalidatePath('/admin')
        // }

        return {
            success: true,
            //   updatedImages: Object.keys(updatedUrls),
            //   newUrls: updatedUrls 
        }

    } catch (error) {
        return { error: 'Update failed' }
    }
}






export async function updateText(txt, id, min, max) {
    try {
        const supabase = await createClient()
        // Input validation
        if (!id) {
            return { success: false, error: 'ID is required' };
        }

        if (!txt || typeof txt !== 'string') {
            return { success: false, error: 'Valid text is required' };
        }

        if (txt.length < min || txt.length > max) {
            return { 
                success: false, 
                error: `Text must be ${min}–${max} characters. Current: ${txt.length}/${max}` 
            };
        }

        // Update in database
        const { data, error: updateError } = await supabase
            .from('components')
            .update({ value: txt, updated_at: new Date().toISOString() })
            .eq('id', id)
            .select(); // Return updated data

        if (updateError) {
            console.error("Database update error:", updateError);
            return { success: false, error: 'Failed to update text in database' };
        }

        if (!data || data.length === 0) {
            return { success: false, error: 'No record found with the provided ID' };
        }

        return { success: true, data: data[0], message: 'Text updated successfully' };

    } catch (error) {
        console.error('Unexpected error updating text:', error);
        return { success: false, error: 'An unexpected error occurred' };
    }
}