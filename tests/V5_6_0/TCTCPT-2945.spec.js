import { test, expect } from '@playwright/test';
import exp from 'constants';
// Define user credentials and input variables
const sapUser = "teso";
const sapUserPassword = "@Tifede1995@Bafede1999";
const material = "177";
const orderNumber = "4001844";
const plant = "PB01";
const storageLocation = "1000";
const quantity = '1';

test('TCTCPT2945 - General Posting UOM list logic fails', async ({ page }) => {

    // navigate to weblink
  await page.goto('https://sapce1.config.team:8443/ztctm_wm_ui_dev/index.html?sap-client=100');

  //Finds User Name field and inputs SAP user and password selects login
  await page.locator('#login_username').fill(sapUser);
  await page.locator('#login_password').fill(sapUserPassword);
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('button', { name: 'OK' }).click(); // sometimes you get that delete session popup

  //selecting menu option - important not to rename menu options
  //await page.getByText('- General Postings').click();
  //selects the transaction name
  //await page.getByText('NEP_GEN_POSTING', { exact: true }).click();

  //selecting menu option - important not to rename menu options
  await page.locator('[id="__tctm-menuListBut-14"]').click();
  //selects the transaction name
  await page.locator('[id="__tctm-menuListBut-0"]').click();
  
  
  //selecting goods issue and 261 movement type
  await page.getByText('Goods Issue', { exact: true }).click();


  //261 movement type
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
  //getting the UOM value
  const value = await page.getByRole('combobox', { name: 'Unit of measure:' }).inputValue();
  console.log('Selected value:', value);


  //selection to add item to the basket
  await page.getByRole('button', { name: 'Add To Basket' }).click();

  //selectiing to view the basket
  await page.getByLabel('cart-full').click();

  //printing out the reservation and item values
  console.log('Reservation Value:', reservationValue);
  console.log('Item Number:', itemNumber);
  
  // selecting and printing out the target line that equals the value of the reservation and item number
  const targetLine = `${'Reservation'}${reservationValue}${'Item'}${itemNumber}`; //can you change this line
  console.log("Lined selected is:", targetLine);
  await page.getByText(targetLine).click();

  await page.getByRole('combobox', { name: 'Unit of measure:' }).click();
  const secondValue = await page.getByRole('combobox', { name: 'Unit of measure:' }).inputValue();
  console.log('Value from the second screen:', secondValue);

// Compare the values
  if (value === secondValue) {
      console.log('The values match!');
  } else {
      console.log('The values do not match.');
  }
  
  
});