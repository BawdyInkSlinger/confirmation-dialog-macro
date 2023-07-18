import { t, Selector } from 'testcafe';

export function dialogElementCount(): Promise<number> {
  return Selector('dialog').count;
}

export function backdropCount(): Promise<number> {
  return Selector('.macro-dialog-element-backdrop').count;
}

type ExpectDialogElementContent = Partial<{
  exactTitle: string;
  bodyText: string;
  exactBodyText: string;
  customClassNames: string[];
  exists: boolean;
}>;

export async function expectDialogElement({
  exactTitle,
  bodyText,
  exactBodyText,
  customClassNames,
  exists,
}: ExpectDialogElementContent = {}): Promise<void> {
  if (exists === true || exists === undefined) {
    exactTitle !== undefined &&
      (await t.expect(findDialogTitle(customClassNames)).eql(exactTitle));

    bodyText !== undefined &&
      (await t.expect(findDialogBodyText(customClassNames)).contains(bodyText));

    exactBodyText !== undefined &&
      (await t.expect(findDialogBodyText(customClassNames)).eql(exactBodyText));

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

export function closeButton(customClassName: string): Selector {
  return dialogElementBodySelector([customClassName])
    .parent('dialog')
    .find('.dialog-element-close');
}

function dialogElementBodySelector(customClassNames?: string[]): Selector {
  const dialogElementBodyClasses = new Set<string>(customClassNames);
  dialogElementBodyClasses.add(`dialog-element-body`);

  const classesInCssSelectorFormat =
    '.' + [...dialogElementBodyClasses].join('.');

  return Selector(
    `.passage .macro-dialog-element ${classesInCssSelectorFormat}`
  );
}
