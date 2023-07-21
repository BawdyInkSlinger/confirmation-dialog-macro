import { DialogElementMacroStack } from "./dialog-stack";

Macro.add('dialogelementclose', {
  skipArgs: true,
  handler: close,
});

export function close(): void {
  const $dialog = DialogElementMacroStack.pop();
  $dialog[0].close();
}
