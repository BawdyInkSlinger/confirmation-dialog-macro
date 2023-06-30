import { Selector } from "testcafe";

fixture.page(`../dist_test/index.html`)(`Dialog Element Macro`);

test(`it renders a simple dialog element`, async (t: TestController): Promise<void> => {
  await t.setNativeDialogHandler((type, text) => {
    throw new Error(text);
  });
  await assertOpenSimpleDialog(t)
  await t
  .click(Selector(".passage button").withText("Close"))
  .expect(Selector(".passage .macro-dialogelement.dialog-element").exists)
  .notOk()
  // it can open again
  await assertOpenSimpleDialog(t)
});

async function assertOpenSimpleDialog(t: TestController) {
    await t.click(Selector(".passage button").withText("Open simple dialog"))
    .expect(Selector(".passage .macro-dialogelement.dialog-element").exists)
    .ok()
    .expect(Selector(".passage .macro-dialogelement .dialog-element-titlebar").innerText)
    .eql("My Title")
    .expect(Selector(".passage .macro-dialogelement .dialog-element-body.class-a.class-b.class-c.class-d span").innerText)
    .eql("My content")
}