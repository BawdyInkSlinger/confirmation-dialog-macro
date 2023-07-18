import { Selector } from 'testcafe';
import {
  dialogElementCount,
  expectDialogElement,
} from './dialog-element-testcafe-utils';

fixture.page(`../dist_test/index.html`)(`Dialog Element Macro`);

// prettier-ignore
test(`can create dialog element macros with various title and class name combinations`, async (t: TestController): Promise<void> => {
  await t.setNativeDialogHandler((type, text) => {
    throw new Error(text);
  });

  await t
    .click(
      Selector('.passage button').withText(
        `can create dialog element macros with various title and class name combinations`
      )
    )
    .click(Selector('.passage button').withText('Open dialog with no arguments'))
    .expect(dialogElementCount())
    .eql(1);
    await expectDialogElement({
      exactTitle: '',
      customClassNames: [],
    });
    
    await t.click(Selector('.passage button').withText('Test blank arguments'))
    .click(Selector('.passage button').withText('Open dialog with blank arguments'))
    .expect(dialogElementCount())
    .eql(1);
    await expectDialogElement({
      exactTitle: '',
      customClassNames: [],
    });

    await t.click(Selector('.passage button').withText('Test blank title, one-class'))
    .click(Selector('.passage button').withText('Open dialog with blank title, one-class'))
    .expect(dialogElementCount())
    .eql(1);
    await expectDialogElement({
      exactTitle: '',
      customClassNames: [],
    });

    await t.click(Selector('.passage button').withText('Test blank title, some classes'))
    .click(Selector('.passage button').withText('Open dialog with blank title, some classes'))
    .expect(dialogElementCount())
    .eql(1);
    await expectDialogElement({
      exactTitle: '',
      customClassNames: [],
    });

    await t.click(Selector('.passage button').withText('Test title, no classes'))
    .click(Selector('.passage button').withText('Open dialog with title, no classes'))
    .expect(dialogElementCount())
    .eql(1);
    await expectDialogElement({
      exactTitle: 'TITLE',
      customClassNames: [],
    });

    await t.click(Selector('.passage button').withText('Test title, blank classes'))
    .click(Selector('.passage button').withText('Open dialog with title, blank classes'))
    .expect(dialogElementCount())
    .eql(1);
    await expectDialogElement({
      exactTitle: 'TITLE',
      customClassNames: [],
    });

    await t.click(Selector('.passage button').withText('Test title, one-class'))
    .click(Selector('.passage button').withText('Open dialog with title, one-class'))
    .expect(dialogElementCount())
    .eql(1);
    await expectDialogElement({
      exactTitle: 'TITLE',
      customClassNames: ['one-class'],
    });

    await t.click(Selector('.passage button').withText('Test title, more than one class'))
    .click(Selector('.passage button').withText('Open dialog with title, more than one class'))
    .expect(dialogElementCount())
    .eql(1);
    await expectDialogElement({
      exactTitle: 'TITLE',
      customClassNames: ['more', 'than', 'one', 'class'],
    });

    await t.click(Selector('.passage button').withText('Test title, some classes, blank body'))
    .click(Selector('.passage button').withText('Open dialog with title, some classes, blank body'))
    .expect(dialogElementCount())
    .eql(1);
    await expectDialogElement({
      exactTitle: 'TITLE',
      customClassNames: ['some', 'classes'],
      exactBodyText: ''
    });
});
