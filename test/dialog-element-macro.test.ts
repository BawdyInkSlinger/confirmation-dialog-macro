import { Selector } from "testcafe";

fixture.page(`../dist_test/index.html`)(`Dialog Element Macro`);

test(`it renders a simple dialog element`, async (t: TestController): Promise<void> => {
  await t.setNativeDialogHandler((type, text) => {
    throw new Error(text);
  });
  await t.click(Selector(".passage button").withText("Open simple dialog"));

  await assertOpenSimpleDialog(t, 1);
  await t
    .click(Selector(".passage button").withText("Close"))
    .expect(Selector(".passage .macro-dialogelement.dialog-element").exists)
    .notOk();
  // it re-creates the dialog when you click the button
  await t.click(Selector(".passage button").withText("Open simple dialog"));
  await assertOpenSimpleDialog(t, 2);
});

test(`it renders on top of Dialog API`, async (t: TestController): Promise<void> => {
  await t.setNativeDialogHandler((type, text) => {
    throw new Error(text);
  });
  await t.click(Selector(".passage button").withText("Open Dialog API"));
  await t.click(
    Selector("#ui-dialog-body button").withText("Open simple dialog over Dialog API")
  );
  await assertOpenSimpleDialog(t, 1);
  // attempt to click on something "behind" the dialog modal (the close button on the Dialog API)
  await t
    .click(Selector("#ui-dialog-close"))
    // this should close the topmost dialog because you clicked off it
    .expect(Selector(".passage .macro-dialogelement.dialog-element").exists)
    .notOk()
    // but the Dialog API should remain open since the topmost dialog's overlay ate the previous click
    .expect(Selector("#ui-dialog-close").visible)
    .ok()
    .click(Selector("#ui-dialog-close"));
});

//todo: click outside of both dialogs, only the dialog element disappears
//todo: the dialog element macro comes with a built in close button

async function assertOpenSimpleDialog(
  t: TestController,
  expectedDialogCount: number
) {
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
        `.passage .macro-dialogelement .dialog-element-body.class-a.class-b.class-c.class-d.dialog-number-${expectedDialogCount} span`
      ).innerText
    )
    .eql("My content");
}
