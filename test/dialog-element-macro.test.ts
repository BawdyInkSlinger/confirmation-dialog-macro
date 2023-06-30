import { Selector } from "testcafe";

fixture.page(`../dist_test/index.html`)(`Dialog Element Macro`);

test(`it renders a dialog element`, async (t: TestController): Promise<void> => {
  await t.setNativeDialogHandler((type, text) => {
    throw new Error(text);
  });
  await t
    .click(Selector(".passage button").withText("Open simple dialog"))
    .expect(Selector(".passage dialog").exists)
    .ok();
});
