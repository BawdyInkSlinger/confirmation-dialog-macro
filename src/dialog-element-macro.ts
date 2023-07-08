Macro.add("dialogelement", {
  tags: null,
  handler: function () {
    const content = this.payload[0].contents;
    const title = this.args.length > 0 ? this.args[0] : "";
    const classes = this.args.length > 1 ? this.args.slice(1).flatten() : [];

    const $dialog = $(document.createElement("dialog"))
      .addClass(`macro-${this.name} dialog-element`)
      .css({ padding: "0" /* https://stackoverflow.com/a/72916231/61624 */ })
      .on("click", function (event) {
        if (event.target === this) {
          closeDialogElement();
        }
      });

    const $dialogTitleBar = $(document.createElement("div")).addClass(
      "dialog-element-titlebar"
    );
    $dialogTitleBar.append($(document.createElement("h1")).wiki(title));
    $dialog.append($dialogTitleBar);

    const $dialogBody = $(document.createElement("div"))
      .addClass(classes)
      .addClass("dialog-element-body")
      .wiki(content);
    $dialog.append($dialogBody);

    $(`.passage`).append($dialog);
    pushDialogStack($dialog);

    $dialog[0].showModal();
  },
});

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
