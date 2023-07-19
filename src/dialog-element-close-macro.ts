Macro.add('dialogelementclose', {
  skipArgs: true,
  handler: function closeDialogElement() {
    const $dialog = DialogStack.pop();
    $dialog[0].close();
  },
});
