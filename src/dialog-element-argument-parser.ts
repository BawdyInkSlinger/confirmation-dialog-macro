export const DialogElementArgumentParser = {
  getTitle: function (this: TwineSugarCube.MacroContext): string {
    return this.args.length > 0 ? this.args[0] : '';
  },
  getId: function (this: TwineSugarCube.MacroContext): string | null {
    return this.args[1] ?? null;
  },
  getClasses: function (this: TwineSugarCube.MacroContext): string[] {
    const classList: string = this.args[2];
    return classList?.split(/\s+/) ?? [];
  },
  getContent: function (this: TwineSugarCube.MacroContext): string {
    return this.payload[0].contents ?? '';
  },
  joinTagContents: function (
    this: TwineSugarCube.MacroContext,
    tagName: string
  ): string {
    return this.payload
      .map(function (payload) {
        if (payload.name === tagName) {
          return payload.contents;
        } else {
          return '';
        }
      })
      .join('');
  },
};
