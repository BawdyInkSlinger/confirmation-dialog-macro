Macro.add('dialogelement', {
  tags: null,
  handler: function () {
    const content = this.payload[0].contents;
    const title = this.args.length > 0 ? this.args[0] : '';
    const classes = this.args.length > 1 ? this.args.slice(1).flatten() : [];

    const $dialog = $(document.createElement('dialog'))
      .addClass(`macro-${this.name} dialog-element`)
      .css({ padding: '0' /* https://stackoverflow.com/a/72916231/61624 */ })
      .on('click', function (event) {
        if (event.target === this) {
          closeDialogElement();
        }
      });

    const $dialogTitleBar = $(document.createElement('div')).addClass(
      'dialog-element-titlebar'
    );
    $dialogTitleBar.append(
      $(document.createElement('h1'))
        .addClass('dialog-element-title')
        .wiki(title)
    );
    $dialogTitleBar.append(
      $(document.createElement('button'))
        .addClass('dialog-element-close')
        .text('')
        .ariaClick(() => {
          closeDialogElement();
        })
    );

    $dialog.append($dialogTitleBar);

    const $dialogBody = $(document.createElement('div'))
      .addClass(classes)
      .addClass('dialog-element-body')
      .wiki(content);
    $dialog.append($dialogBody);

    $(`.passage`).append($dialog);
    pushDialogStack($dialog);

    $dialog[0].showModal();
  },
});
