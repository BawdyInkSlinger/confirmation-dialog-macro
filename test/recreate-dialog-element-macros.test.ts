import { Selector, t } from 'testcafe';
import {
  dialogElementCount,
  expectDialogElement,
} from './dialog-element-testcafe-utils';

fixture.page(`../dist_test/index.html`)(`Dialog Element Macro`);

test(`can recreate dialog element macros`, async (t: TestController): Promise<void> => {
  await t.setNativeDialogHandler((type, text) => {
    throw new Error(text);
  });

  await t
    .click(
      Selector('.passage button').withText(
        'Test can recreate dialog element macros'
      )
    )
    .click(Selector('.passage button').withText('Open a dialog'))
    .expect(dialogElementCount())
    .eql(1);
  await expectDialogElement({
    exactTitle: 'My Title',
    bodyText: 'My content',
    customClassNames: ['dialog-number-1'],
  });
  await t
    .click(Selector('.passage button.dialog-element-close'))
    .expect(Selector('.passage .macro-dialog-element.dialog-element').exists)
    .notOk()
    // it re-creates the dialog when you click the button
    .click(Selector('.passage button').withText('Open a dialog'))
    .expect(dialogElementCount())
    .eql(1);
  await expectDialogElement({
    exactTitle: 'My Title',
    bodyText: 'My content',
    customClassNames: ['dialog-number-2'],
  });
});
