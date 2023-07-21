export {};

type MarkupString = string;
type ContentCallback = ($dialogElementBody: JQuery<HTMLElement>) => void;
type OnOpenCallback = ($dialogElementBody: JQuery<HTMLElement>) => void;
type OnCloseCallback = () => void;
declare global {
  interface Window {
    DialogElementMacro: {
      open(
        title: MarkupString,
        classes: string[],
        contentOrCallback: MarkupString | ContentCallback,
        onOpen?: MarkupString | OnOpenCallback,
        onClose?: MarkupString | OnCloseCallback
      ): void
      close(): void;
    };
  }
}
