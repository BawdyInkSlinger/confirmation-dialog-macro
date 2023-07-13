Macro.add('dialogelementclose', {
  skipArgs: true,
  handler: closeDialogElement,
});

function closeDialogElement() {
  const $dialog = popDialogStack();
  $dialog[0].close();
}
