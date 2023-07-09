import { Selector } from "testcafe";

fixture.page(`../dist_test/index.html`)(`Dialog Element Macro`);

test(`can create and recreate dialog element macros`, async (t: TestController): Promise<void> => {
  await t.setNativeDialogHandler((type, text) => {
    throw new Error(text);
  });
  await t
    .click(
      Selector(".passage button").withText(
        "Test can create and recreate dialog element macros"
      )
    )
    .click(Selector(".passage button").withText("Open a dialog"))

    //  assertOpenSimpleDialog(t, 1) OPEN
    .expect(Selector(".passage .macro-dialogelement.dialog-element").count)
    .eql(1)
    .expect(
      Selector(".passage .macro-dialogelement .dialog-element-title").innerText
    )
    .eql("My Title")
    .expect(
      Selector(".passage .macro-dialogelement .dialog-element-title").count
    )
    .eql(1)
    .expect(
      Selector(
        `.passage .macro-dialogelement .dialog-element-body.class-a.class-b.class-c.class-d.dialog-number-1 span`
      ).innerText
    )
    .eql("My content")
    //  assertOpenSimpleDialog(t, 1) CLOSE

    .click(Selector(".passage button.dialog-element-close"))
    .expect(Selector(".passage .macro-dialogelement.dialog-element").exists)
    .notOk()
    // it re-creates the dialog when you click the button
    .click(Selector(".passage button").withText("Open a dialog"))

    //  assertOpenSimpleDialog(t, 2) OPEN
    .expect(Selector(".passage .macro-dialogelement.dialog-element").count)
    .eql(1)
    .expect(
      Selector(".passage .macro-dialogelement .dialog-element-title").innerText
    )
    .eql("My Title")
    .expect(
      Selector(".passage .macro-dialogelement .dialog-element-title").count
    )
    .eql(1)
    .expect(
      Selector(
        `.passage .macro-dialogelement .dialog-element-body.class-a.class-b.class-c.class-d.dialog-number-2 span`
      ).innerText
    )
    .eql("My content");
  //  assertOpenSimpleDialog(t, 2) CLOSE
});

test(`can stack multiple dialogs and close them, top to bottom`, async (t: TestController): Promise<void> => {
  await t.setNativeDialogHandler((type, text) => {
    throw new Error(text);
  });
  await t
    .click(
      Selector(".passage button").withText(
        "Test can stack multiple dialogs and close them, top to bottom"
      )
    )
    .click(Selector(".passage button").withText("Open simple dialog"))

    //  assertOpenSimpleDialog(t, 1) OPEN
    .expect(Selector(".passage .macro-dialogelement.dialog-element").count)
    .eql(1)
    .expect(
      Selector(".passage .macro-dialogelement .dialog-element-title").innerText
    )
    .eql("My Title")
    .expect(
      Selector(".passage .macro-dialogelement .dialog-element-title").count
    )
    .eql(1)
    .expect(
      Selector(
        `.passage .macro-dialogelement .dialog-element-body.class-a.class-b.class-c.class-d.dialog-number-1 span`
      ).innerText
    )
    .eql("My content")
    //  assertOpenSimpleDialog(t, 1) CLOSE

    .click(
      Selector(".dialog-number-1 button").withText("Open another simple dialog")
    )
    .expect(Selector(".passage .dialog-number-1").exists)
    .ok()
    .expect(Selector(".passage .dialog-number-2").exists)
    .ok()
    // it should close the topmost only
    .click(
      Selector(".dialog-number-2").parent(0).find("button.dialog-element-close")
    )
    .expect(Selector(".passage .dialog-number-1").exists)
    .ok()
    .expect(Selector(".passage .dialog-number-2").exists)
    .notOk()
    // now close the first one
    .click(
      Selector(".dialog-number-1").parent(0).find("button.dialog-element-close")
    )
    .expect(Selector(".passage .dialog-number-1").exists)
    .notOk()
    .expect(Selector(".passage .dialog-number-2").exists)
    .notOk();
});

test(`can open on top of official Sugarcube Dialog UI`, async (t: TestController): Promise<void> => {
  await t.setNativeDialogHandler((type, text) => {
    throw new Error(text);
  });
  await t
    .click(
      Selector(".passage button").withText(
        "Test can open on top of official Sugarcube Dialog UI"
      )
    )
    .click(Selector(".passage button").withText("Open Sugarcube Dialog API"))
    .click(
      Selector("#ui-dialog-body button").withText(
        "Open simple dialog over Dialog API"
      )
    )

    //  assertOpenSimpleDialog(t, 1) OPEN
    .expect(Selector(".passage .macro-dialogelement.dialog-element").count)
    .eql(1)
    .expect(
      Selector(".passage .macro-dialogelement .dialog-element-title").innerText
    )
    .eql("My Title")
    .expect(
      Selector(".passage .macro-dialogelement .dialog-element-title").count
    )
    .eql(1)
    .expect(
      Selector(
        `.passage .macro-dialogelement .dialog-element-body.class-a.class-b.class-c.class-d.dialog-number-1 span`
      ).innerText
    )
    .eql("My content")
  //  assertOpenSimpleDialog(t, 1) CLOSE

  // attempt to click on something "behind" the dialog modal (the close button on the Dialog API)
    .click(Selector("#ui-dialog-close"))
    // this should close the topmost dialog because you clicked off it
    .expect(Selector(".passage .macro-dialogelement.dialog-element").exists)
    .notOk()
    // but the Dialog API should remain open since the topmost dialog's overlay ate the previous click
    .expect(Selector("#ui-dialog-close").visible)
    .ok()
    .expect(
      Selector(".passage .macro-dialogelement .dialog-element-titlebar").count
    )
    .eql(0);
});
