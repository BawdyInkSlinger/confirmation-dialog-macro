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
      Selector('.passage button').withText('Test can open with javascript api')
    )
    .click(
      Selector('.passage button').withText(
        'Open a dialog by passing content as string'
      )
    )
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

    .expect(Selector(`#event-log > *`).count)
    .eql(0)
    .click(
      Selector('.passage button').withText('Open a dialog by passing callbacks')
    )
    .expect(dialogElementCount())
    .eql(1);
  await expectDialogElement({
    exactTitle: 'CALLBACKS',
    bodyText: 'CB Content',
  });
  await t
    .expect(Selector(`#event-log > p`).nth(0).innerText)
    .eql('Opened')
    .expect(Selector(`#event-log > *`).count)
    .eql(1)
    .click(Selector('.passage button').withText('Cancel'))
    .expect(dialogElementCount())
    .eql(0)
    .expect(Selector(`#event-log > p`).nth(1).innerText)
    .eql('Closed')
    .expect(Selector(`#event-log > *`).count)
    .eql(2);
});
