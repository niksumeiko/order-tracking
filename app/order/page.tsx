import { OrderStatus } from './OrderStatus';
import { fetchOrder } from '../domain/OrderAdapter';

export default async function Page() {
  const order = await fetchOrder('1');

  return (
    <div>
      <h1>{`Order #${order.id.toUpperCase()}`}</h1>
      <p>Type: {order.type}</p>
      <OrderStatus order={order} />
    </div>
  );
}
