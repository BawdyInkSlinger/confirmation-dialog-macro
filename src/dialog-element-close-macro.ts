Macro.add("dialogelementclose", {
  skipArgs: true,
  handler: closeDialogElement,
});

function closeDialogElement() {
  const $dialog = popDialogStack();
  $dialog[0].close(); // fire a dialog close event
  $dialog.remove();
}

function pushDialogStack($dialog: JQuery<HTMLDialogElement>) {
  if (isDialogStackDefined()) {
    State.temporary.dialog_element_macro_stack = [];
  }
  State.temporary.dialog_element_macro_stack.push($dialog);
}

function popDialogStack(): JQuery<HTMLDialogElement> {
  if (isDialogStackDefined()) {
    throw new Error(
      `Trying to pop the Dialog Element Macro's dialog stack, but it is undefined.`
    );
  }
  return State.temporary.dialog_element_macro_stack.pop();
}

function isDialogStackDefined(): boolean {
  return (
    State.temporary?.dialog_element_macro_stack === null ||
    State.temporary?.dialog_element_macro_stack === undefined
  );
}
