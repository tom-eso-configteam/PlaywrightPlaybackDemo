import { test, expect } from '@playwright/test';
import exp from 'constants';
// Define user credentials and input variables
const sapUser = "teso";
const sapUserPassword = "@Tifede1995@Bafede1999";
const material = "90";
const batch = "1600007382"; // Variable name changed to lowercase
const quantity = "20";
test('Perform Adhoc IM PI Regression', async ({ page}) => {

  // Navigate to the SAP login page
  await page.goto('https://sapce1.theconfigteam.co.uk:8443/neptune/webapp/?launchpad=NEPTCT_WM&sap-client=100&sap-language=EN');

  //Assertion: validates the page contains the correct URL
  await expect(page).toHaveURL('https://sapce1.theconfigteam.co.uk:8443/neptune/webapp/?launchpad=NEPTCT_WM&sap-client=100&sap-language=EN');

  //Assertion: validates the title page is found
  await expect(page).toHaveTitle('Logon');

  //Assertion: page locator is visible
  const sapUserId = await page.locator('#sap-user');
  await expect(sapUserId).toBeVisible();

  // Login
  await page.locator('#sap-user').fill(sapUser);
  await page.locator('#sap-password').fill(sapUserPassword);
  await page.getByRole('button', { name: 'Log On' }).click();

  // Navigate to menu
  await page.getByRole('group', { name: 'PreBilt IM/WM Menu Avatar' }).click();
  await page.getByText('REG_INTERNAL').click();
  await page.getByText('- Adhoc IM PI Regression').click();

  // Select plant and storage location
  await page.getByRole('button', { name: 'Plant: Select Options' }).click();
  await page.getByText('PB01 - TCT PreBilt Plant').click();
  await page.getByRole('button', { name: 'Storage Location: Select' }).click();
  await page.getByRole('option', { name: '- IM SLOC 1000' }).click();

  // Fill material and batch details
  await page.getByRole('textbox', { name: 'Material:' }).fill(material);
  await page.getByRole('textbox', { name: 'Batch:' }).fill(batch);

  // Perform selection
  await page.getByRole('button', { name: 'Select', exact: true }).click();
  // Perform quantity actions and save
  await page.locator('div').filter({ hasText: /^000000000000000090$/ }).click();
  //await page.getByRole('option', { name: 'List Item 1 of 1 Has Details' }).click();
  await page.locator('[id="__data233"]').click();


  //assertion: to have text - direct match of test
  //creating a variable for the Item text box.
  const itemNumber = await page.getByRole('textbox', { name: 'Item:' });

  //checking if the text box is visible
  await expect(itemNumber).toBeVisible;

  //checks the item field value is the first value.
  await expect(itemNumber).toHaveValue('001');

  //assertion: if the string contains certain numbers
  //checking the batch field contain '1600'
  //await expect (page.locator('[id="__jsview2--oPage3000-in-ISEG-CHARG-inner"]')).toContainText('1600');

  //Enters the quantity into the box
  await page.getByRole('textbox', { name: 'Quantity:' }).fill(quantity);

  //checks the value in the input box is the expect quantity
  const inputValue = await page.getByRole('textbox', { name: 'Quantity:' });
  await expect(inputValue).toHaveValue(quantity);

  //save and accept quantity
  await page.getByRole('button', { name: 'Save' }).click();
  await page.getByRole('button', { name: 'Accept Quantity' }).click();
  
  // Final actions
  await page.locator('[id="__jsview2--oPage2200-butActionKebab-FM"]').click();
  await page.getByLabel('of 1').click();
  await page.getByRole('button', { name: 'Close' }).click();
});