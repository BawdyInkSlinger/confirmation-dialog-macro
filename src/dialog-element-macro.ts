Macro.add('dialogelement', {
  tags: ['onopen', 'onclose'],
  handler: function () {
    const $dialog = $(document.createElement('dialog'))
      .addClass(`macro-dialog-element`)
      .css({ padding: '0' /* https://stackoverflow.com/a/72916231/61624 */ })
      .on('click', function (event) {
        if (event.target === this) {
          $dialog[0].close();
        }
      });

    const $dialogTitleBar = $(document.createElement('div')).addClass(
      'dialog-element-titlebar'
    );
    $dialogTitleBar.append(
      $(document.createElement('h1'))
        .addClass('dialog-element-title')
        .wiki(DialogElementArgumentParser.getTitle.call(this))
    );
    $dialogTitleBar.append(
      $(document.createElement('button'))
        .addClass('dialog-element-close')
        .text('')
        .ariaClick(() => {
          $dialog[0].close();
        })
    );
    $dialog.append($dialogTitleBar);

    const $dialogBody = $(document.createElement('div'))
      .addClass(DialogElementArgumentParser.getClasses.call(this))
      .addClass('dialog-element-body')
      .wiki(DialogElementArgumentParser.joinTagContents.call(this, 'onopen'))
      .wiki(DialogElementArgumentParser.getContent.call(this));
    $dialog.append($dialogBody);

    $(`.passage`).append($dialog);

    const onClose = DialogElementArgumentParser.joinTagContents.call(
      this,
      'onclose'
    );
    $dialog.on('close', () => {
      $.wiki(onClose);
    });

    const $backdrop = $(document.createElement('div'))
      .addClass('macro-dialog-element-backdrop')
      .addClass('open')
      .on('animationend', (e) => {
        const animationEvent = e.originalEvent as AnimationEvent | undefined;
        if (
          animationEvent?.animationName ===
          'macro-dialog-element-backdrop-fade-out'
        ) {
          $backdrop.remove();
        }
      });
    $(`.passage`).append($backdrop);

    $dialog.on('close', () => {
      $dialog.remove();
      $backdrop.removeClass('open').addClass('close');
    });

    DialogElementMacroStack.push($dialog);
    $dialog[0].showModal();
  },
});
