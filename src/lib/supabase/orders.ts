// lib/supabase/orders.ts
import { supabase } from '@/utils/supabaseClient';

type OrderItem = {
  title: string;
  sku: string;
  price: number;
  qty: number;
  delivery: number;
  subtotal: number;
  vat: number;
};

export async function createOrder(order: {
  ref: string;
  type: 'user' | 'guest';
  owner: string | null; // null if guest
  items: OrderItem[];
}) {
  const { data, error } = await supabase.from('orders').insert([
    {
      ref: order.ref,
      type: order.type,
      owner: order.owner,
      items: order.items,
      status: 'processing', // status is set at creation
    },
  ]);

  if (error) throw error;
  return data;
}

export async function getMyOrders(userId: string) {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('owner', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}


export async function updateOrderStatus(ref: string, newStatus: string) {
    const { data, error } = await supabase
      .from('orders')
      .update({ status: newStatus })
      .eq('ref', ref);
  
    if (error) throw error;
    return data;
  }
  