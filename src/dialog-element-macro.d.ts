export {};

type TwineScript = string;
declare global {
  interface Window {
    DialogElementMacro: {
      open(
        title: TwineScript,
        classes: string[],
        content: TwineScript,
        onOpen?: TwineScript,
        onClose?: TwineScript
      ): void;
      open(
        title: TwineScript,
        classes: string[],
        callback: ($dialogElementBody: JQuery<HTMLElement>) => void,
        onOpen?: TwineScript,
        onClose?: TwineScript
      ): void;
      closeDialogElement(): void;
    };
  }
}
