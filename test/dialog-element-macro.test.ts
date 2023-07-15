import { Selector, t } from 'testcafe';
import {
  closeButton,
  dialogElementCount,
  expectDialogElement,
} from './dialog-element-testcafe-utils';

fixture.page(`../dist_test/index.html`)(`Dialog Element Macro`);

test(`can create dialog element macros with various title and class name combinations`, async (t: TestController): Promise<void> => {
  await t.setNativeDialogHandler((type, text) => {
    throw new Error(text);
  });

/*
no arguments
blank arguments
blank title, one class
blank title, some classes
title, no classes
title, blank classes
title, one class
title, some classes
title, some classes, blank body
*/

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
      exactTitle: 'title',
      customClassNames: [],
    });

    await t.click(Selector('.passage button').withText('Test title, blank classes'))
    .click(Selector('.passage button').withText('Open dialog with title, blank classes'))
    .expect(dialogElementCount())
    .eql(1);
    await expectDialogElement({
      exactTitle: 'title',
      customClassNames: [],
    });

    await t.click(Selector('.passage button').withText('Test title, one-class'))
    .click(Selector('.passage button').withText('Open dialog with title, one-class'))
    .expect(dialogElementCount())
    .eql(1);
    await expectDialogElement({
      exactTitle: 'title',
      customClassNames: ['one-class'],
    });

    await t.click(Selector('.passage button').withText('Test title, more than one class'))
    .click(Selector('.passage button').withText('Open dialog with title, more than one class'))
    .expect(dialogElementCount())
    .eql(1);
    await expectDialogElement({
      exactTitle: 'title',
      customClassNames: ['more', 'than', 'one', 'class'],
    });

    await t.click(Selector('.passage button').withText('Test title, some classes, blank body'))
    .click(Selector('.passage button').withText('Open dialog with title, some classes, blank body'))
    .expect(dialogElementCount())
    .eql(1);
    await expectDialogElement({
      exactTitle: 'title',
      customClassNames: ['some', 'classes'],
      exactBodyText: ''
    });
});

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

test(`can stack multiple dialogs and close them, top to bottom, while triggering onopen and onclose`, async (t: TestController): Promise<void> => {
  await t.setNativeDialogHandler((type, text) => {
    throw new Error(text);
  });
  await t.click(
    Selector('.passage button').withText(
      `Test can stack multiple dialogs and close them, top to bottom, while triggering onopen and onclose`
    )
  );

  // open dialog 1
  await openDialog(1);
  await t.expect(dialogElementCount()).eql(1);
  await expectDialogElement({
    exactTitle: 'Dialog 1',
    customClassNames: ['dialog-number-1'],
  });
  // open dialog 2
  await openDialog(2);
  await t.expect(dialogElementCount()).eql(2);
  await expectDialogElement({
    exactTitle: 'Dialog 2',
    customClassNames: ['dialog-number-2'],
  });
  // open dialog 3
  await openDialog(3);
  await t.expect(dialogElementCount()).eql(3);
  await expectDialogElement({
    exactTitle: 'Dialog 3',
    customClassNames: ['dialog-number-3'],
  });
  // open dialog 4
  await openDialog(4);
  await t.expect(dialogElementCount()).eql(4);
  await expectDialogElement({
    exactTitle: 'Dialog 4',
    customClassNames: ['dialog-number-4'],
  });

  // close dialog 4 by clicking on its custom button
  await t
    .click(Selector('.passage button').withText('Custom close button'))
    .expect(dialogElementCount())
    .eql(3);
  await expectDialogElement({
    exactTitle: 'Dialog 4',
    customClassNames: ['dialog-number-4'],
    exists: false,
  });

  // close dialog 3 by clicking on its X button
  await t
    .click(closeButton('dialog-number-3'))
    .expect(dialogElementCount())
    .eql(2);
  await expectDialogElement({
    exactTitle: 'Dialog 3',
    customClassNames: ['dialog-number-3'],
    exists: false,
  });

  // close dialog 2 by clicking outside of it
  await t
    .click(Selector('body', { 'timeout': 200 }), {
      'offsetX': 1,
      'offsetY': 1,
    })
    .expect(dialogElementCount())
    .eql(1);
  await expectDialogElement({
    exactTitle: 'Dialog 2',
    customClassNames: ['dialog-number-2'],
    exists: false,
  });

  // close dialog 1 by pressing escape
  await t.pressKey('esc').expect(dialogElementCount()).eql(0);
  await expectDialogElement({
    exactTitle: 'Dialog 1',
    customClassNames: ['dialog-number-1'],
    exists: false,
  });

  // check that <<onopen>> and <<onclose>> worked correctly
  await t.expect(Selector('#event-log > p').nth(0).innerText).eql('Opened 1');
  await t.expect(Selector('#event-log > p').nth(1).innerText).eql('Opened 2');
  await t.expect(Selector('#event-log > p').nth(2).innerText).eql('Opened 3');
  await t.expect(Selector('#event-log > p').nth(3).innerText).eql('Opened 4');
  await t.expect(Selector('#event-log > p').nth(4).innerText).eql('Closed 4');
  await t.expect(Selector('#event-log > p').nth(5).innerText).eql('Closed 3');
  await t.expect(Selector('#event-log > p').nth(6).innerText).eql('Closed 2');
  await t.expect(Selector('#event-log > p').nth(7).innerText).eql('Closed 1');
  await t.expect(Selector('#event-log p').count).eql(8);
});

async function openDialog(dialogElementNumber: number): Promise<void> {
  await t.click(
    Selector('.passage button').withText(`Open Dialog ${dialogElementNumber}`)
  );
}

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
});
