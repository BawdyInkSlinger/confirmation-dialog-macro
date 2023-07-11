import { t, Selector } from 'testcafe';

export function dialogElementCount(): Promise<number> {
  return Selector('dialog').count;
}

type ExpectDialogElementContent = Partial<{
  exactTitle: string;
  bodyText: string;
  customClassNames: string[];
  exists: boolean;
}>;

export async function expectDialogElement({
  exactTitle,
  bodyText,
  customClassNames,
  exists,
}: ExpectDialogElementContent = {}): Promise<void> {
  if (exists === true || exists === undefined) {
    exactTitle !== undefined &&
      (await t.expect(findDialogTitle(customClassNames)).eql(exactTitle));

    bodyText !== undefined &&
      (await t.expect(findDialogBodyText(customClassNames)).contains(bodyText));

    customClassNames !== undefined &&
      (await t.customActions.expectContainsSubset(
        findDialogElementBodyClassNames(customClassNames),
        customClassNames
      ));
  } else {
    await t.expect(dialogElementBodySelector(customClassNames).exists).notOk();
  }
}

function findDialogTitle(customClassNames?: string[]): Promise<string> {
  const dialogTitleSelector = dialogElementBodySelector(customClassNames)
    .parent('dialog')
    .find('.dialog-element-title');
  return dialogTitleSelector.innerText;
}

function findDialogBodyText(customClassNames?: string[]): Promise<string> {
  return dialogElementBodySelector(customClassNames).innerText;
}

function findDialogElementBodyClassNames(
  customClassNames?: string[]
): Promise<string[]> {
  return dialogElementBodySelector(customClassNames).classNames;
}

// function closeButtonSelector(customClassNames?: string[]): Selector {
//   return dialogElementBodySelector
//     .parent('dialog')
//     .find('.dialog-element-close');
// }

function dialogElementBodySelector(customClassNames?: string[]): Selector {
  const dialogElementBodyClasses = new Set<string>(customClassNames);
  dialogElementBodyClasses.add(`dialog-element-body`);

  const classesInCssSelectorFormat =
    '.' + [...dialogElementBodyClasses].join('.');

  return Selector(
    `.passage .macro-dialogelement ${classesInCssSelectorFormat}`
  );
}
