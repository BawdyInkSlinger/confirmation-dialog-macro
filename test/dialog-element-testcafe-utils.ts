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
  const bodySelector = dialogElementBodySelector(customClassNames);

  if (exists === true || exists === undefined) {
    exactTitle !== undefined &&
      (await t.expect(findDialogTitle(bodySelector)).eql(exactTitle));

    bodyText !== undefined &&
      (await t.expect(findDialogBodyText(bodySelector)).contains(bodyText));

    customClassNames !== undefined &&
      (await t.customActions.expectContainsSubset(
        findDialogElementBodyClassNames(bodySelector),
        customClassNames
      ));
  } else {
    await t.expect(bodySelector.exists).notOk();
  }
}

function dialogElementBodySelector(customClassNames?: string[]) {
  const dialogElementBodyClasses = new Set<string>(customClassNames);
  dialogElementBodyClasses.add(`dialog-element-body`);

  const classesInCssSelectorFormat =
    '.' + [...dialogElementBodyClasses].join('.');

  return Selector(
    `.passage .macro-dialogelement ${classesInCssSelectorFormat}`
  );
}

function findDialogTitle(dialogElementBodySelector: Selector): Promise<string> {
  const dialogTitleSelector = dialogElementBodySelector
    .parent('dialog')
    .find('.dialog-element-title');
  return dialogTitleSelector.innerText;
}

function findDialogBodyText(
  dialogElementBodySelector: Selector
): Promise<string> {
  return dialogElementBodySelector.innerText;
}

function findDialogElementBodyClassNames(
  dialogElementBodySelector: Selector
): Promise<string[]> {
  return dialogElementBodySelector.classNames;
}

// function closeButtonSelector(customClassNames?: string[]): Selector {
//   return dialogElementBodySelector
//     .parent('dialog')
//     .find('.dialog-element-close');
// }
