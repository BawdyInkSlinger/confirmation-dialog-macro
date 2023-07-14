Macro.add('dialogelementclose', {
  skipArgs: true,
  handler: function closeDialogElement() {
    const $dialog = popDialogStack();
    $dialog[0].close();
  },
});
