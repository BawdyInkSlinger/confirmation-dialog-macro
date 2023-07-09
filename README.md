# Dialog Element Macro
This sugarcube macro presents a dialog to the user. Instead of using the sugarcube Dialog API, it uses an [HTML dialog](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog). The sugarcube Dialog API only allows one dialog box to be open at a time. This library allows you to get around that restriction.

This API and documentation was shamelessly stolen from https://github.com/ChapelR/custom-macros-for-sugarcube-2#dialog-api-macros

---

### Macro: `<<dialogelement>>`

**Syntax**: `<<dialogelement [title] [classList]>> <</dialogelement>>`

The `<<dialogelement>>` macro creates a new dialog box, with an optional title and an optional list of classes for styling.  The content between the macro tags is parsed and appended to the dialog box's body. You will generally want to pair this with some type of interaction, like a link or button. You can use the child tag `<<onclose>>` to run TwineScript code when the dialog is closed by any means (see below).

**Arguments**:

 * **title**: (optional) A title to appear at the top of the dialog box. If you want to omit a title but include classes, this argument can be an empty string (`''`).
 * **classList**: (optional) A list of CSS classes to add to the dialog body, for styling. The classes should be a space-separated list of quoted class names (i.e. `'class-a' 'class-b' 'class-c'`).

**Usage**:
```
/% creates a link that opens a dialog box called 'Character Sheet' with the classes .char-sheet and .stats %/
<<link 'View Character Sheet'>>
	<<dialogelement 'Character Sheet' 'char-sheet' 'stats'>>\
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

#### Child tag: `<<onclose>>`

You can use this child tag to run code when the dialog is closed.

**Usage**:
```
<<link 'View Character Sheet'>>
	<<dialogelement 'Character Sheet' 'char-sheet stats'>>\
		|Strength|$str|
		|Dexterity|$dex|
		|Wisdom|$wis|\
	<<onclose>>
		<<audio 'close' volume 1 play>>
	<</dialogelement>>
<</link>>
```

### Macro: `<<dialogelementclose>>`

**Syntax**: `<<dialogelementclose>>`

Closes the dialog.

**Usage**:

```
<<link 'View Character Sheet'>>
	<<dialogelement 'Character Sheet' 'char-sheet stats'>>\
		|Strength|$str|
		|Dexterity|$dex|
		|Wisdom|$wis|\
	@@float:right;
		<<button "Close">><<dialogelementclose>><</button>>
    @@
	<</dialogelement>>
<</link>>
```