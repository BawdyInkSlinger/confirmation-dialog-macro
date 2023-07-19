const DialogElementArgumentParser = {
  getTitle: function (this: TwineSugarCube.MacroContext): string {
    return this.args.length > 0 ? this.args[0] : '';
  },
  getClasses: function (this: TwineSugarCube.MacroContext): string[] {
    return this.args.length > 1 ? this.args.slice(1).flat() : [];
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
