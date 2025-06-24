'use client';

import { useParams } from 'next/navigation';
import { useOrderContext } from '@/context/OrderContext';


import DataFetch from "@/context/datafetch";

import OrderDetail from '@/components/Orders/OrderDetail';


export default function OrderPage() {
  const params = useParams(); 
  const { ref } = params;

  const { orders } = useOrderContext();
  // const { products, productGroups } = useProductContext();

  // Ensure comparison is valid (string === string)
  const order = orders.find(o => o.ref === ref);

//   console.log(products)
  

 
    return ( <div >
        <DataFetch />
        <h2 className="title">Order {order?.id} <hr /></h2>
        {order ? (
          <OrderDetail
            order={order}
          />
        ) : (
          <>
            <h2>Order not found</h2>
            <p>We couldn’t find the order you're looking for.</p>
          </>
        )}
      </div>
  );
}
