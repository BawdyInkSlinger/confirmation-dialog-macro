const DialogStack = {
  push: function ($dialog: JQuery<HTMLDialogElement>) {
    if (this.dialogStackExists()) {
      State.temporary.dialog_element_macro_stack = [];
    }
    State.temporary.dialog_element_macro_stack.push($dialog);
  },
  pop: function (): JQuery<HTMLDialogElement> {
    if (this.dialogStackExists()) {
      throw new Error(
        `Trying to pop the Dialog Element Macro's dialog stack, but it is undefined.`
      );
    }
    return State.temporary.dialog_element_macro_stack.pop();
  },
  dialogStackExists: function (): boolean {
    return (
      State.temporary?.dialog_element_macro_stack === null ||
      State.temporary?.dialog_element_macro_stack === undefined
    );
  },
};
