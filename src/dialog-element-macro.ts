Macro.add("dialogelement", {
  tags: ["onopen", "onclose"],
  handler: function () {
    let content = "";
    let onOpen: string | null = null;
    let onClose: string | null = null;
    const title = this.args.length > 0 ? this.args[0] : "";
    const classes = this.args.length > 1 ? this.args.slice(1).flatten() : [];

    this.payload.forEach(function (payload, idx) {
      if (idx === 0) {
        content = payload.contents;
      } else {
        if (payload.name === "onopen") {
          onOpen = onOpen ? onOpen + payload.contents : payload.contents;
        } else {
          onClose = onClose ? onClose + payload.contents : payload.contents;
        }
      }
    });

    classes.push("macro-" + this.name);

    Dialog.setup(title, classes.join(" "));
    Dialog.wiki(content);

    if (onOpen !== null && typeof onOpen === "string") {
      const onOpenString: string = onOpen;
      $(document).one(":dialogopened", function () {
        $.wiki(onOpenString.trim());
      });
    }

    if (onClose !== undefined && typeof onClose === "string") {
      const onCloseString: string = onClose;
      $(document).one(":dialogclosed", function () {
        $.wiki(onCloseString.trim());
      });
    }

    Dialog.open();
  },
});

Macro.add("popup", {
  handler: function () {
    // todo
  },
});

Macro.add("dialogclose", {
  skipArgs: true,
  handler: function () {
    // todo
  },
});
