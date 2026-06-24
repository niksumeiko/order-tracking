import { createAdapter } from '../common/adapter/AdapterService';
import { type Order } from './OrderService';
import { markDelivered } from './OrderDeliveryActions';

export const fetchOrder = createAdapter({
  name: 'fetch-order-adapter',
  callback: async (orderId: string) => {
    // API round trip
    const response = await fetch(`http://localhost:3004/order/${orderId}`)

    return response.json();
  },
});

export const fetchOrderStatus = createAdapter({
  name: 'fetch-order-status-adapter',
  callback: async (orderId: string) => {
    // API round trip
    const response = await fetch(`http://localhost:3004/order-status`);
    const { status }: { status: string } = await response.json();

    return status;
  },
});

export const confirmOrderDelivery = createAdapter({
  name: 'confirm-order-delivery-adapter',
  callback: async (order: Order) => {
    // Calling the Server Action
    const status = await markDelivered(order.id);

    return { status };
  },
});