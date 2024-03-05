import { test, expect } from "playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/");
});
test.describe("Form Layouts page", () => {
  test.beforeEach(async ({ page }) => {
    await page.getByText("Forms").click();
    await page.getByText("Form Layouts").click();
  });
  test("input fields", async ({ page }) => {
    const usingTheGridEmailInput = page
      .locator("nb-card", { hasText: "Using the Grid" })
      .getByRole("textbox", { name: "Email" });
    await usingTheGridEmailInput.fill("anduin.wrynn@gmail.com");
    await usingTheGridEmailInput.clear(); //u can not chain it

    await usingTheGridEmailInput.pressSequentially("arthas@gmail.com"); // {delay: 500}) //it type slower

    //generic asertion
    const inputValue = await usingTheGridEmailInput.inputValue();
    expect(inputValue).toEqual("arthas@gmail.com");

    //locator assertion
    await expect(usingTheGridEmailInput).toHaveValue("arthas@gmail.com");
  });
  test("raadio buttons", async ({ page }) => {
    const usingTheGridForm = page.locator("nb-card", {
      hasText: "Using the Grid",
    });

    //await usingTheGridForm.getByLabel('Option 1').check({force: true})
    await usingTheGridForm
      .getByRole("radio", { name: "Option 1" })
      .check({ force: true });

    const radioStatus = await usingTheGridForm
      .getByRole("radio", { name: "Option 1" })
      .isChecked();
    expect(radioStatus).toBeTruthy();
    await expect(
      usingTheGridForm.getByRole("radio", { name: "Option 1" })
    ).toBeChecked();

    await usingTheGridForm
      .getByRole("radio", { name: "Option 2" })
      .check({ force: true });
    expect(
      await usingTheGridForm
        .getByRole("radio", { name: "Option 1" })
        .isChecked()
    ).toBeFalsy();
    expect(
      await usingTheGridForm
        .getByRole("radio", { name: "Option 2" })
        .isChecked()
    ).toBeTruthy();
  });
});
test('checkboxes', async({page}) => {
   
})
