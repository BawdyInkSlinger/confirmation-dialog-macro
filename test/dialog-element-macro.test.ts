import { Selector, t } from 'testcafe';
import {
  dialogElementCount,
  expectDialogElement,
} from './dialog-element-testcafe-utils';

fixture.page(`../dist_test/index.html`)(`Dialog Element Macro`);

test(`can create and recreate dialog element macros`, async (t: TestController): Promise<void> => {
  await t.setNativeDialogHandler((type, text) => {
    throw new Error(text);
  });

  await t
    .click(
      Selector('.passage button').withText(
        'Test can create and recreate dialog element macros'
      )
    )
    .click(Selector('.passage button').withText('Open a dialog'))
    .expect(dialogElementCount())
    .eql(1);
  await expectDialogElement({
    exactTitle: 'My Title',
    bodyText: 'My content',
    customClassNames: [
      'dialog-number-1',
      'class-a',
      'class-b',
      'class-c',
      'class-d',
    ],
  });
  await t
    .click(Selector('.passage button.dialog-element-close'))
    .expect(Selector('.passage .macro-dialogelement.dialog-element').exists)
    .notOk()
    // it re-creates the dialog when you click the button
    .click(Selector('.passage button').withText('Open a dialog'))
    .expect(dialogElementCount())
    .eql(1);
  await expectDialogElement({
    exactTitle: 'My Title',
    bodyText: 'My content',
    customClassNames: [
      'dialog-number-2',
      'class-a',
      'class-b',
      'class-c',
      'class-d',
    ],
  });
});

test(`can stack multiple dialogs and close them, top to bottom`, async (t: TestController): Promise<void> => {
  await t.setNativeDialogHandler((type, text) => {
    throw new Error(text);
  });
  await t
    .click(
      Selector('.passage button').withText(
        'Test can stack multiple dialogs and close them, top to bottom'
      )
    )
    .click(Selector('.passage button').withText('Open simple dialog'))
    .expect(dialogElementCount())
    .eql(1);
  await expectDialogElement({
    exactTitle: 'First Title',
    customClassNames: ['dialog-number-1'],
  });
  await t
    .click(
      Selector('.dialog-number-1 button').withText('Open another simple dialog')
    )
    .expect(dialogElementCount())
    .eql(2);
  await expectDialogElement({
    exactTitle: 'Second Title',
    customClassNames: ['dialog-number-2'],
  });
  await t
    .expect(Selector('.passage .dialog-number-1').exists)
    .ok()
    .expect(Selector('.passage .dialog-number-2').exists)
    .ok()
    // it should close the topmost only
    .click(
      Selector('.dialog-number-2').parent(0).find('button.dialog-element-close')
    )
    .expect(Selector('.passage .dialog-number-1').exists)
    .ok()
    .expect(Selector('.passage .dialog-number-2').exists)
    .notOk()
    // now close the first one
    .click(
      Selector('.dialog-number-1').parent(0).find('button.dialog-element-close')
    )
    .expect(Selector('.passage .dialog-number-1').exists)
    .notOk()
    .expect(Selector('.passage .dialog-number-2').exists)
    .notOk();
});

test(`can open on top of official Sugarcube Dialog UI`, async (t: TestController): Promise<void> => {
  await t.setNativeDialogHandler((type, text) => {
    throw new Error(text);
  });
  await t
    .click(
      Selector('.passage button').withText(
        'Test can open on top of official Sugarcube Dialog UI'
      )
    )
    .click(Selector('.passage button').withText('Open Sugarcube Dialog API'))
    .click(
      Selector('#ui-dialog-body button').withText(
        'Open simple dialog over Dialog API'
      )
    );
  await expectDialogElement({
    exactTitle: 'On top of sugarcube',
    bodyText: 'My content',
    customClassNames: ['dialog-number-1'],
  });
  // attempt to click on something "behind" the dialog modal (the close button on the Dialog API)
  await t
    .click(Selector('#ui-dialog-close'))
    // this should close the topmost dialog because you clicked off it
    .expect(Selector('.passage .macro-dialogelement.dialog-element').exists)
    .notOk()
    // but the Dialog API should remain open since the topmost dialog's overlay ate the previous click
    .expect(Selector('#ui-dialog-close').visible)
    .ok()
    .expect(
      Selector('.passage .macro-dialogelement .dialog-element-titlebar').count
    )
    .eql(0);
});
