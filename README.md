# Dialog Element Macro
This set of [sugarcube](http://www.motoslave.net/sugarcube/2/docs/) [macros](http://www.motoslave.net/sugarcube/2/docs/#macro-api) allow you to open multiple modal dialog boxes at the same time.

![Animated GIF of a save/load dialog with a confirmation dialog before overwriting/deleting a save.](./demo.gif)

Sugarcube provides a built in [Dialog API](http://www.motoslave.net/sugarcube/2/docs/#dialog-api), but it is limited to showing one dialog box at a time.

This macro API and documentation was shamelessly stolen from https://twinelab.net/custom-macros-for-sugarcube-2/#/dialog-api-macro-set If you don't need multiple dialog boxes, consider using this macro library instead.

# Installation
You can download the releases from the github [Releases section](https://github.com/BawdyInkSlinger/dialog-element-macro/releases):

![Image of github release section](./releases.png)

Copy the `dialog-element-macro.js` and `dialog-element-macro.css` files into your project source directory. 

The `*.map` and `dialog-element-macro.d.ts` files are optional.

---

### Macro: `<<dialogelement>>`

**Syntax**: `<<dialogelement [title] [id] [classList]>> <</dialogelement>>`

The `<<dialogelement>>` macro creates a new dialog box with an optional title and an optional list of classes for styling. The content between the macro tags is parsed and appended to the dialog box's body. You will generally want to pair this with some type of interaction, like a link or button. You can use the child tags `<<onopen>>` and `<<onclose>>` to run TwineScript code when the dialog is opened and closed (see below).

**Arguments**:

* **title**: (optional) A title to appear at the top of the dialog box. If you want to omit a title but include classes, this argument can be an empty string (`''`).
* **id**: (optional) An id attribute value, e.g., `'my-id'`. This id will be added the dialog's `<dialog>` element.
* **classList**: (optional) A string of space delimited CSS class names, e.g., `'class-a class-b class-c'`. These class names will be added to the dialog's body element.

**Usage**:
```
/% creates a link that opens a dialog box called 'Character Sheet' with the classes .char-sheet and .stats %/
<<link 'View Character Sheet'>>
  <<dialogelement 'Character Sheet' null 'char-sheet stats'>>\
    |Strength|$str|
    |Dexterity|$dex|
    |Wisdom|$wis|\
  <</dialogelement>>
<</link>>

/% create an about button for your credits %/
<<button 'About'>>
  <<dialogelement 'Credits'>>\
    This game was made by John P. Nottingham in Twine!\
  <</dialogelement>>
<</button>>

/% a dialog with no title or classes %/
<<link 'Hello!'>>
  <<dialogelement>>Greetings!<</dialogelement>>
<</link>>
```

#### Child tag: `<<onopen>>`

You can use this child tag to run code when the dialog is opened.

**Usage**:
```
<<link 'View Character Sheet'>>
  <<dialogelement 'Character Sheet' null 'char-sheet stats'>>\
    |Strength|$str|
    |Dexterity|$dex|
    |Wisdom|$wis|\
  <<onopen>>
    <<audio 'click' volume 1 play>>
  <</dialogelement>>
<</link>>
```

#### Child tag: `<<onclose>>`

You can use this child tag to run code when the dialog is closed.

**Usage**:
```
<<link 'View Character Sheet'>>
  <<dialogelement 'Character Sheet' 'my-id' 'char-sheet stats'>>\
    |Strength|$str|
    |Dexterity|$dex|
    |Wisdom|$wis|\
  <<onopen>>
    <<audio 'click' volume 1 play>>
  <<onclose>>
    <<audio 'close' volume 1 play>>
  <</dialogelement>>
<</link>>
```

### Macro: `<<dialogelementclose>>`

**Syntax**: `<<dialogelementclose>>`

Closes the topmost dialog.

**Usage**:

```
<<link 'View Character Sheet'>>
  <<dialogelement 'Character Sheet' null 'char-sheet stats'>>\
    |Strength|$str|
    |Dexterity|$dex|
    |Wisdom|$wis|\
  @@float:right;
    <<button "Close">><<dialogelementclose>><</button>>
  @@
  <</dialogelement>>
<</link>>
```

# HTML Reference

This section shows what HTML is generated from a simple `<<dialogelement>>` example.

### Example Code

```
<<nobr>>
  <<dialogelement 'Example Title' 'example-id' 'class1 class2 class3'>>
    Content
    <br><br>
  <<button "Close">><<dialogelementclose>><</button>>
  <</dialogelement>>
<</nobr>>
```

### Example's HTML

```
<dialog id="example-id" class="macro-dialog-element" open="" style="padding: 0px;">
    <div class="dialog-element-titlebar">
        <h1 class="dialog-element-title">Example Title</h1><button class="dialog-element-close" type="button" role="button" tabindex="0"></button>
    </div>
    <div class="class1 class2 class3 dialog-element-body"> Content <br><br> <button class="link-internal macro-button" type="button" role="button" tabindex="0">Close</button> </div>
</dialog>
```

# JavaScript
The Dialog Element Macro exposes JavaScript functions that can be called directly. 

### `DialogElementMacro.open`

The `DialogElementMacro.open` function opens a dialog box. This function can be called in multiple ways:

**Usage**:

#### Passing `content`, `onOpen`, and/or `onClose` as markup strings:
```js
DialogElementMacro.open('Character Sheet', 'my-dialog-id', ['char-sheet', 'stats'], `\\\n|Strength|$str|\n|Dexterity|$dex|\n|Wisdom|$wis|\\\n`, '<<run console.log("onOpen")>>', '<<run console.log("onClose")>>');
```

Each markup string is parsed by the [`$.wiki()` function](http://www.motoslave.net/sugarcube/2/docs/#methods-jquery-method-wiki).

#### Passing `content`, `onOpen`, and/or `onClose` as callback functions:
```js
DialogElementMacro.open('Character Sheet', null, ['char-sheet', 'stats'],
  ($body) => {
    $body.append(`<span>CB Content</span>`);
    $body.append($(document.createElement('button'))
      .text("Cancel")
      .ariaClick(() => {
        DialogElementMacro.close();
      }));
    }, 
    ($body) => {
      $(`#event-log`).append(`<p>Opened</p>`)
    },
    () => {
      $(`#event-log`).append(`<p>Closed</p>`)
    });
```

You can mix-and-match these choices. For example, you could use a markup string for content and use callbacks for the `onOpen` and `onClose` parameters.

**Formal Syntax**:

The `DialogElementMacro.open` function is formally defined as:

```ts
type MarkupString = string;
type ContentCallback = ($dialogElementBody: JQuery<HTMLElement>) => void;
type OnOpenCallback = ($dialogElementBody: JQuery<HTMLElement>) => void;
type OnCloseCallback = () => void;
declare global {
  interface Window {
    DialogElementMacro: {
      open(
        title: MarkupString,
        idOrNull: string | null,
        classes: string[],
        contentOrCallback: MarkupString | ContentCallback,
        onOpen?: MarkupString | OnOpenCallback,
        onClose?: MarkupString | OnCloseCallback
      ): void;
      close(): void;
    };
  }
}
```

It's not important to fully understand this syntax; the key take away is the last three parameters can be passed as markup strings or callback functions. Also, the last two parameters are optional.

### `DialogElementMacro.close`

To close the topmost Dialog Element, call `DialogElementMacro.close`.

**Usage**:

```html
<<button "Close the topmost dialog box">><<run DialogElementMacro.close()>><</button>>
```

**Formal Syntax**:

```ts
function close(): void
```
