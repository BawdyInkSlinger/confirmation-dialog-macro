import { Selector, t } from 'testcafe';
import {
  dialogElementCount,
  expectDialogElement,
} from './dialog-element-testcafe-utils';

fixture.page(`../dist_test/index.html`)(`Dialog Element Macro`);

test(`can open with javascript api`, async (t: TestController): Promise<void> => {
  await t.setNativeDialogHandler((type, text) => {
    throw new Error(text);
  });

  await t
    .click(
      Selector('.passage button').withText(
        'Test can open with javascript api'
      )
    )
    .click(Selector('.passage button').withText('Open a dialog by passing content as string'))
    .expect(dialogElementCount())
    .eql(1);
    await expectDialogElement({
      exactTitle: 'CONTENT AS STRING',
      bodyText: 'S Content',
    });
    await t
    .click(Selector('.passage button').withText('Cancel'))
    .expect(dialogElementCount())
    .eql(0)
    
    .click(Selector('.passage button').withText('Open a dialog by passing content as callback'))
    .expect(dialogElementCount())
    .eql(1);
    await expectDialogElement({
      exactTitle: 'CONTENT AS CALLBACK',
      bodyText: 'CB Content',
    });
    await t
    .click(Selector('.passage button').withText('Cancel'))
    .expect(dialogElementCount())
    .eql(0)

});
