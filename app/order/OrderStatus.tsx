'use client';

import { useEffect, useState } from 'react';
import { confirmOrderDelivery, fetchOrderStatus } from '../domain/OrderAdapter';
import { Order } from '../domain/OrderService';

type Props = { order: Order };

export const OrderStatus = ({ order }: Props) => {
  const [status, setStatus] = useState<string>();

  const handleClick = async () => {
    const response = await confirmOrderDelivery(order);

    setStatus(response.status);
  };

  useEffect(() => {
    fetchOrderStatus(order.id).then(setStatus);
  }, [order.id]);

  if (!status) {
    return null;
  }

  return (
    <div>
      <p>
        Status: {status}
        {status === 'delivered' && ' ✅'}
        {status !== 'delivered' && (
          <>
            {' · '}
            <button onClick={handleClick}>Confirm delivered</button>
          </>
        )}
      </p>
    </div>
  );
};
