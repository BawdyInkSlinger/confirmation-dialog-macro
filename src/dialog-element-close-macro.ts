Macro.add('dialogelementclose', {
  skipArgs: true,
  handler: closeDialogElement,
});

function closeDialogElement(): void {
  const $dialog = DialogElementMacroStack.pop();
  $dialog[0].close();
}
