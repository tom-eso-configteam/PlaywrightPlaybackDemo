import { test, expect } from '@playwright/test';


test('test', async ({ page }) => {
  await page.goto('https://sapce1.config.team:8443/ztctm_wm_ui_dev/index.html?sap-client=100');
  await page.getByPlaceholder('Enter User Name').click();
  await page.getByPlaceholder('Enter User Name').fill('teso');
  await page.getByRole('textbox', { name: 'Password:' }).click();
  await page.getByRole('textbox', { name: 'Password:' }).fill('@Tifede1995@Bafede1999');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByText('NEPOUT00').click();
  await page.getByLabel('Navigate Back').click();
  await page.getByText('- General Postings').click();
  await page.getByText('NEP_GEN_POSTING', { exact: true }).click();
  await page.locator('[id="__hbox3-__clone1"]').click();
  await page.getByText('Movement Type261Goods Issue').click();
  await page.getByLabel('Material:').click();
  await page.getByLabel('Material:').fill('177');
  await page.getByRole('combobox', { name: 'Plant:' }).click();
  await page.getByRole('combobox', { name: 'Plant:' }).press('CapsLock');
  await page.getByRole('combobox', { name: 'Plant:' }).fill('PB01');
  await page.getByRole('combobox', { name: 'Stor. Location:' }).click();
  await page.getByRole('combobox', { name: 'Stor. Location:' }).fill('1000');
  await page.getByLabel('Order:').click();
  await page.getByLabel('Order:').click();
  await page.getByLabel('Order:').fill('4001844');
  await page.getByRole('button', { name: 'Select' }).click();
  await page.getByLabel('Quantity:').fill('1');
  await page.getByRole('button', { name: 'Add To Basket' }).click();
  await page.getByLabel('cart-full').click();
  await page.getByText('Reservation0000004481Item0005').click();
  await page.getByRole('combobox', { name: 'Unit of measure:' }).click();
  await page.locator('[id="__jsview1--oPage5100-in-ENTRY_UOM-arrow"]').click();
});