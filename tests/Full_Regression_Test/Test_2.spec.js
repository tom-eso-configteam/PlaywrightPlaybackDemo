import { test, expect } from '@playwright/test';

test('test', async ({ page, browser }) => {
  await page.goto('https://sapce1.theconfigteam.co.uk:8443/neptune/webapp/?launchpad=NEPTCT_WM&sap-client=100');
  await page.locator('#sap-user').fill('teso');
  await page.locator('#sap-password').fill('@Tifede1995@Bafede1999');
  await page.getByRole('button', { name: 'Log On' }).click();


  
});
