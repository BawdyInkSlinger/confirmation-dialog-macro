import { DialogElementArgumentParser } from './dialog-element-argument-parser';
import { DialogElementMacroStack } from './dialog-stack';

Macro.add('dialogelement', {
  tags: ['onopen', 'onclose'],
  handler: function () {
    const title = DialogElementArgumentParser.getTitle.call(this);
    const classes = DialogElementArgumentParser.getClasses.call(this);
    const content = DialogElementArgumentParser.getContent.call(this);
    const onOpen = DialogElementArgumentParser.joinTagContents.call(
      this,
      'onopen'
    );
    const onClose = DialogElementArgumentParser.joinTagContents.call(
      this,
      'onclose'
    );

    open(title, classes, content, onOpen, onClose);
  },
});

type MarkupString = string;
type ContentCallback = ($dialogElementBody: JQuery<HTMLElement>) => void;
type OnOpenCallback = ($dialogElementBody: JQuery<HTMLElement>) => void;
type OnCloseCallback = () => void;
export function open(
  title: MarkupString,
  classes: string[],
  contentOrCallback: MarkupString | ContentCallback,
  onOpen: MarkupString | OnOpenCallback = '',
  onClose: MarkupString | OnCloseCallback = ''
): void {
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
    $(document.createElement('h1')).addClass('dialog-element-title').wiki(title)
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
    .addClass(classes)
    .addClass('dialog-element-body');
  if (typeof onOpen === 'string') {
    $dialogBody.wiki(onOpen);
  } else {
    onOpen($dialogBody);
  }

  if (typeof contentOrCallback === 'string') {
    $dialogBody.wiki(contentOrCallback);
  } else {
    contentOrCallback($dialogBody);
  }

  $dialog.append($dialogBody);

  $(`.passage`).append($dialog);

  $dialog.on('close', () => {
    if (typeof onClose === 'string') {
      $dialogBody.wiki(onClose);
    } else {
      onClose();
    }
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
}
