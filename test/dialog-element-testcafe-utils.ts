import { t, Selector } from "testcafe";

export function dialogElementCount(): Promise<number> {
  return Selector("dialog").count;
}

export function dialogTitle(): Promise<string> {
  return Selector(".passage .macro-dialogelement .dialog-element-title")
    .innerText;
}

export function dialogBodyText(): Promise<string> {
  return Selector(".passage .macro-dialogelement .dialog-element-body")
    .innerText;
}

export function customClassNames(): Promise<string[]> {
  return Selector(".passage .macro-dialogelement .dialog-element-body")
    .classNames;
}

type AssertDialogElementOptions = Partial<{
  exactTitle: string;
  bodyText: string;
  customClassNames: string[];
}>;

export async function expectDialogElement(
  options: AssertDialogElementOptions = {}
): Promise<void> {
  options.exactTitle !== undefined &&
    (await t.expect(dialogTitle()).eql(options.exactTitle));

  options.bodyText !== undefined &&
    (await t.expect(dialogBodyText()).contains(options.bodyText));

  options.customClassNames !== undefined &&
    (await t.customActions.expectContainsSubset(
      customClassNames(),
      options.customClassNames
    ));

}
