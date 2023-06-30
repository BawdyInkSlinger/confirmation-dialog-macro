import { Selector } from "testcafe";

fixture.page(`../dist_test/index.html`)(`Dialog Element Macro`);

test(`testcafe works`, async (t: TestController): Promise<void> => {
  await t.setNativeDialogHandler((type, text) => {
    throw new Error(text);
  });
  await t.click(Selector(".passage button").withText("Open simple dialog"));
});
