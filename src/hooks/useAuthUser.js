'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'

export function useAuthUser() {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()

    const fetchUserAndProfile = async () => {
      const { data: authData, error: authError } = await supabase.auth.getUser()

      if (authError || !authData.user) {
        setUser(null)
        setProfile(null)
        setLoading(false)
        return
      }

      setUser(authData.user)

      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authData.user.id) // assuming profiles.id = auth.users.id
        .single()

      if (profileError) {
        console.error('Error fetching profile:', profileError)
        setProfile(null)
      } else {
        setProfile(profileData)
      }

      setLoading(false)
    }

    fetchUserAndProfile()
  }, [])

  return { user, profile, loading }
}
