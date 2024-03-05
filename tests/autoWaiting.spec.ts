import {test, expect} from 'playwright/test'



test.beforeEach(async({page}, testInfo) => {
   await page.goto('http://uitestingplayground.com/ajax')
   await page.getByText("Button triggering Ajax Request").click()
   testInfo.setTimeout(testInfo.timeout + 2000)
   

})

test('auto waiting', async({page}) => {
  const successButton = page.locator('.bg-success')
  // wait for element
  //await page.waitForSelector('.bg-success)

  // wait for particular response
  await page.waitForResponse('http://uitestingplayground.com/ajaxdata')
  
  //wait for network calls to be completed ( 'not recomended)
    await page.waitForLoadState('networkidle')

    await page.waitForTimeout(5000) //not recomended
    
  const text = await successButton.allTextContents()
  expect(text).toEqual('Data loaded with AJAX get request.')
 
})

test('timeouts', async ({page}) => {
  // test.setTimeout(10000)
  test.slow() //it will multiple timeout 3x
  const successButton = page.locator('.bg-success')
  await successButton.click({timeout: 16000})
})