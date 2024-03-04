import {test, expect} from 'playwright/test'



test.beforeEach(async({page}) => {
   await page.goto('http://localhost:4200/')
   await page.getByText("Forms").click()
   await page.getByText('Form Layouts').click()

})
test('Locator syntax rules', async({page}) => {
   //by tagname
   page.locator('input')

   //by ID
  await page.locator('#inputEmail').click()

   //by class value
   page.locator('.shape-rectangle')
   
   //by attribute
   page.locator('[placeholder="Email"]')

   //by class value (full)
   page.locator('[class=ïnput-full-width size-medium status-basic shape-rectangle nb-transition"]')

   //combine different selectors
   page.locator('input[placeholder="Email"] [nbinput]')

   //by xpath (not recommended)
   page.locator('//*[@id="inputEmail"]')

   //by partial text match 
   page.locator(':text("Using")')

   //by exact text match
   page.locator(':text-is("Using the Grid")')

})

test('user facing locators', async({page}) => {
  await page.getByRole('textbox', {name: "Email"}).first().click()
  await page.getByRole('button', {name: "Sign in"}).first().click()
  await page.getByLabel('Email').first().click()
  await page.getByPlaceholder('Jane Doe').click()
  await page.getByText('Using the Grid').click()
  await page.getByTitle("IoT Dashboard").click()
  await page.getByTestId('SignIn') //we can provide this data in html code for exampl data-testid="SignIn"
})

test('locating child elements,', async({page}) => {
   await page.locator('nb-card nb-radio :text-is("Option 1")').click()
   await page.locator('nb-card').locator('nb-radio').locator( ':text-is("Option 2")').click()

   await page.locator('nb-card').getByRole('button', {name: "Sign in"}).first().click()
   await page.locator('nb-card').nth(3).getByRole('button').click() //by index
})

test('locating parent elements', async({page}) => {
   await page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name: "Email"}).first().click()
   await page.locator('nb-card', {has: page.locator('#inputEmail')}).getByRole('textbox', {name: "Email"}).first().click()
   await page.locator('nb-card').filter({hasText: "Basic form"}).getByRole('textbox', {name: "Email"}).first().click()
   await page.locator('nb-card').filter({has: page.locator('.status-danger')}).getByRole('textbox', {name: "Password"}).first().click()
   await page.locator('nb-card').filter({has: page.locator('nb-checkbox')}).filter({hasText: 'Sign in'})
   //await page.locator(':text-is("Using the Grid")').locator('..').getByRole('textbox', {name: "Email"}).click() // we go 1 up in code
})
test('reusing the locators', async({page}) => {
   const basicForm = page.locator('nb-card').filter({hasText: "Basic form"})
   const emailField = basicForm.getByRole('textbox', {name: "Email"})
   const passwordField = basicForm.getByRole('textbox', {name: "Password"})
    await emailField.fill('anduin.wrynn@gmail.com')
    await passwordField.fill('LightBeWithYou666')
    await basicForm.locator('nb-checkbox').click()
    await basicForm.getByRole('button').click()

    await expect(emailField).toHaveValue('anduin.wrynn@gmail.com')
})
test('extracting values', async({page}) => {
   //single text value
   const basicForm = page.locator('nb-card').filter({hasText: "Basic form"})
   const buttonText = await basicForm.locator('button').textContent()
   expect(buttonText).toEqual('Submit')
   //all text values
   const allRadioLabels = await page.locator('nb-radio').allTextContents()
   expect(allRadioLabels).toContain("Option 1")
   //input value
   const emailField = basicForm.getByRole('textbox',{name: "Email"})
   await emailField.fill('anduin.wrynn@gmail.com')
   const emailValue = await emailField.inputValue()
   expect(emailValue).toEqual('anduin.wrynn@gmail.com')

   const placeholderValue =await emailField.getAttribute('placeholder')
   expect(placeholderValue).toEqual('Email')

})
test('assertions', async({page}) => {
   //general assertions
   const value = 5
   expect(value).toEqual(5)


})


