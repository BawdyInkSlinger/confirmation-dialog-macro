import { Selector } from "testcafe";

fixture.page(`../dist_test/index.html`)(`Dialog Element Macro`);

test(`it renders a simple dialog element`, async (t: TestController): Promise<void> => {
  await t.setNativeDialogHandler((type, text) => {
    throw new Error(text);
  });
  await t.click(Selector(".passage button").withText("Open simple dialog"));

  await assertOpenSimpleDialog(t);
  await t
    .click(Selector(".passage button").withText("Close"))
    .expect(Selector(".passage .macro-dialogelement.dialog-element").visible)
    .notOk();
  // it can open again
  await t.click(Selector(".passage button").withText("Open simple dialog"));
  await assertOpenSimpleDialog(t);
});

test(`it renders on top of Dialog API`, async (t: TestController): Promise<void> => {
  await t.setNativeDialogHandler((type, text) => {
    throw new Error(text);
  });
  await t.click(Selector(".passage button").withText("Open Dialog API"));
  await t.click(
    Selector("#ui-dialog-body button").withText("Open simple dialog")
  );
  await assertOpenSimpleDialog(t);
});

//todo: click outside of both dialogs, only the dialog element disappears
//todo: the dialog element macro comes with a built in close button

async function assertOpenSimpleDialog(t: TestController) {
  await t
    .expect(Selector(".passage .macro-dialogelement.dialog-element").count)
    .eql(1)
    .expect(
      Selector(".passage .macro-dialogelement .dialog-element-titlebar")
        .innerText
    )
    .eql("My Title")
    .expect(
      Selector(".passage .macro-dialogelement .dialog-element-titlebar").count
    )
    .eql(1)
    .expect(
      Selector(
        ".passage .macro-dialogelement .dialog-element-body.class-a.class-b.class-c.class-d span"
      ).innerText
    )
    .eql("My content")
    .expect(
      Selector(
        ".passage .macro-dialogelement .dialog-element-body.class-a.class-b.class-c.class-d span"
      ).count
    )
    .eql(1);
}
