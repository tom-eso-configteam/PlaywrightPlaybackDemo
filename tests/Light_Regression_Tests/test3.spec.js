import { test, expect } from '@playwright/test';
import exp from 'constants';
// Define user credentials and input variables
const sapUser = "teso";
const sapUserPassword = "@Tifede1995@Bafede1999";
const material = "177";
const orderNumber = "4001844";
const plant = "PB01";
const quantity = "1";
const storageLocation = "1000";

test('test', async ({ page }) => {

    // navigate to weblink
  await page.goto('https://sapce1.config.team:8443/ztctm_wm_ui_dev/index.html?sap-client=100');

  //Finds User Name field and inputs SAP user and password selects login
  await page.locator('#login_username').fill(sapUser);
  await page.locator('#login_password').fill(sapUserPassword);
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('button', { name: 'OK' }).click(); // sometimes you get that delete session popup

  //selecting menu option - important not to rename menu options
  await page.getByText('- General Postings').click();
  //selects the transaction name
  await page.getByText('NEP_GEN_POSTING', { exact: true }).click();

  //selecting goods issue and 261 movement type
  await page.getByText('Goods Issue', { exact: true }).click();
  await page.getByText('261', { exact: true }).click();

  //filling selectiion screen
  await page.getByLabel('Material:').fill(material);
  await page.getByRole('combobox', { name: 'Plant:' }).fill(plant);
  await page.getByRole('combobox', { name: 'Stor. Location:' }).fill(storageLocation);
  await page.getByLabel('Order:').fill(orderNumber);
  await page.getByRole('button', { name: 'Select' }).click();

  //filling quantity field and adding to basket
  await page.getByLabel('Quantity:').fill(quantity);

  //getting the reservation and item from the input screen
  const reservationValue = await page.getByLabel('Reservation:').inputValue();
  const itemNumber = await page.getByLabel('Item:').inputValue();

  //selection to add item to the basket
  await page.getByRole('button', { name: 'Add To Basket' }).click();

  //selectiing to view the basket
  await page.getByLabel('cart-full').click();

  console.log('Reservation Value:', reservationValue);
  console.log('Item Number:', itemNumber);
  
  // On the next screen, locate the line that contains both values
  //await page.getByText(`${'Reservation'}${reservationValue}${'Item'}${itemNumber}`).click();

  const targetLine = `${'Reservation'}${reservationValue}${'Item'}${itemNumber}`;
  console.log("Lined selected is:", targetLine);
  await page.getByText(targetLine).click();
 
  await page.waitForTimeout(3000);

});
