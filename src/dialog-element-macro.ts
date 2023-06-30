Macro.add("dialogelement", {
  tags: ["onopen", "onclose"],
  handler: function () {
    const content = this.payload[0].contents;
    const title = this.args.length > 0 ? this.args[0] : "";
    const classes = this.args.length > 1 ? this.args.slice(1).flatten() : [];

    const $dialog = $(document.createElement("dialog"))
        .addClass(`macro-${this.name} dialog-element`);

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

    $dialog[0].showModal();
  },
});

Macro.add("dialogcloseelement", {
  skipArgs: true,
  handler: function () {
    $("dialog").remove();
  },
});
