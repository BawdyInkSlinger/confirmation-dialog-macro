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
  const dialogElementBodyClasses = new Set<string>(customClassNames);
  dialogElementBodyClasses.add(`dialog-element-body`);

  const classesInCssSelectorFormat =
    '.' + [...dialogElementBodyClasses].join('.');

  const dialogElementBodySelector = Selector(
    `.passage .macro-dialogelement ${classesInCssSelectorFormat}`
  );

  if (exists === true || exists === undefined) {
    exactTitle !== undefined &&
      (await t
        .expect(dialogTitleSelector(dialogElementBodySelector))
        .eql(exactTitle));

    bodyText !== undefined &&
      (await t
        .expect(dialogBodyTextSelector(dialogElementBodySelector))
        .contains(bodyText));

    customClassNames !== undefined &&
      (await t.customActions.expectContainsSubset(
        customClassNamesSelector(dialogElementBodySelector),
        customClassNames
      ));
  } else {
    await t.expect(dialogElementBodySelector.exists).notOk();
  }
}

function dialogTitleSelector(
  dialogElementBodySelector: Selector
): Promise<string> {
  const dialogTitleSelector = dialogElementBodySelector
    .parent('dialog')
    .find('.dialog-element-title');
  return dialogTitleSelector.innerText;
}

function dialogBodyTextSelector(
  dialogElementBodySelector: Selector
): Promise<string> {
  return dialogElementBodySelector.innerText;
}

function customClassNamesSelector(
  dialogElementBodySelector: Selector
): Promise<string[]> {
  return dialogElementBodySelector.classNames;
}
