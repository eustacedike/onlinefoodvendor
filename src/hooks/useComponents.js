'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'

export function useComponents() {
  const [components, setComponents] = useState(null);
  const [socials, setSocials] = useState(null);

  useEffect(() => {
    const supabase = createClient()

    const fetchComponents = async () => {
        const { data: componentsData, error: componentsError } = await supabase
        .from('components')
        .select('*')

      if (componentsError) {
        console.error('Error fetching components:', componentsError)
        setComponents(null)
      } else {
        setComponents(componentsData)
      }

      const { data: socialsData, error: socialsError } = await supabase
      .from('socials')
      .select('*')

    if (componentsError) {
      console.error('Error fetching details:', socialsError)
      setSocials(null)
    } else {
      setSocials(socialsData)
    }

  
    }

    fetchComponents()
  }, [setComponents, setSocials])

  return { socials, components }
}
