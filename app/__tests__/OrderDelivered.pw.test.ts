import { test, expect } from '../../playwright/fixtures';
import {
  confirmOrderDelivery,
  fetchOrder,
  fetchOrderStatus,
} from '../domain/OrderAdapter';

test('confirm order delivery', async ({ page, stubAdapter }) => {
  await stubAdapter(fetchOrder, { id: 'ORDER_ID', type: 'Wholesale' });
  await stubAdapter(fetchOrderStatus, 'lost on the way');
  await stubAdapter(confirmOrderDelivery, { status: 'delivered' });

  await page.goto('/order');

  await expect(
    page.getByRole('heading', { name: 'Order #ORDER_ID' }),
  ).toBeVisible();
  await expect(page.getByText('Type: Wholesale')).toBeVisible();
  await expect(page.getByText('Status: lost on the way')).toBeVisible();

  await page.getByRole('button', { name: 'Confirm delivered' }).click();

  await expect(page.getByText('Status: delivered')).toBeVisible();
});
