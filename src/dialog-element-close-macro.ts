Macro.add('dialogelementclose', {
  skipArgs: true,
  handler: function closeDialogElement() {
    const $dialog = DialogElementMacroStack.pop();
    $dialog[0].close();
  },
});
