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


  export async function addAddress(newAddress, userid) {
    try {
      const { data, error: fetchError } = await supabase
        .from('profiles')
        .select('addresses')
        .eq('id', userid)
        .single();
  
      if (fetchError) throw fetchError;
  
      const updatedAddresses = [...(data.addresses || []), newAddress];
  
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ addresses: updatedAddresses })
        .eq('id', userid);
  
      if (updateError) throw updateError;
    } catch (error) {
      alert('Error adding address!');
      console.error(error);
    }
  }

  
  export async function deleteAddress(index, userid) {
    try {
      const { data, error: fetchError } = await supabase
        .from('profiles')
        .select('addresses')
        .eq('id', userid)
        .single();
  
      if (fetchError) throw fetchError;
  
      const updatedAddresses = (data.addresses || []).filter((_, i) => i !== index);
  
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ addresses: updatedAddresses })
        .eq('id', userid);
  
      if (updateError) throw updateError;
    } catch (error) {
      alert('Error deleting address!');
      console.error(error);
    }
  }

  
  export async function setPreferredAddress(index, userid) {
    try {
      const { data, error: fetchError } = await supabase
        .from('profiles')
        .select('addresses')
        .eq('id', userid)
        .single();
  
      if (fetchError) throw fetchError;
  
      const addresses = data.addresses || [];
  
      if (index < 0 || index >= addresses.length) {
        throw new Error('Invalid address index');
      }
  
      const [selected] = addresses.splice(index, 1);
      addresses.unshift(selected);
  
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ addresses })
        .eq('id', userid);
  
      if (updateError) throw updateError;
    } catch (error) {
      alert('Error setting preferred address!');
      console.error(error);
    }
  }
  