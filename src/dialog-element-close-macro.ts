import { DialogElementMacroStack } from "./dialog-stack";

Macro.add('dialogelementclose', {
  skipArgs: true,
  handler: closeDialogElement,
});

export function closeDialogElement(): void {
  const $dialog = DialogElementMacroStack.pop();
  $dialog[0].close();
}
