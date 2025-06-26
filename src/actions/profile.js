'use client'
import { useCallback, useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'


const supabase = createClient()


export async function updateAvatar(avatarIndex, userid) {

    // const [loading, setLoading] = useState(true)

    try {
    //   setLoading(true)
      const { error } = await supabase.from('profiles').upsert({
        id: userid,
        avatar: avatarIndex,
      })
      if (error) throw error
    //   alert('Avatar updated!')
    } catch (error) {
      alert('Error updating the avatar!')
      console.log(error)
    }
    // finally {
    //   setLoading(false)
    // }
  }

  export async function updatePhone(phoneNo, userid) {


    try {
      const { error } = await supabase.from('profiles').upsert({
        id: userid,
        phone: phoneNo,
      })
      if (error) throw error
    } catch (error) {
      alert('Error updating the avatar!')
      console.log(error)
    }

  }