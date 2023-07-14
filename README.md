# Dialog Element Macro
This set of [sugarcube](http://www.motoslave.net/sugarcube/2/docs/) [macros](http://www.motoslave.net/sugarcube/2/docs/#macro-api) allow you to open multiple modal dialog boxes at the same time.

Sugarcube provides a built in [Dialog API](http://www.motoslave.net/sugarcube/2/docs/#dialog-api), but it is limited to showing one dialog box at a time. If you want to display multiple dialog boxes at the same time, this set of macros provides a way to do that. 

This macro API and documentation was shamelessly stolen from https://github.com/ChapelR/custom-macros-for-sugarcube-2#dialog-api-macros

---

### Macro: `<<dialogelement>>`

**Syntax**: `<<dialogelement [title] [classList]>> <</dialogelement>>`

The `<<dialogelement>>` macro creates a new dialog box with an optional title and an optional list of classes for styling. The content between the macro tags is parsed and appended to the dialog box's body. You will generally want to pair this with some type of interaction, like a link or button. You can use the child tags `<<onopen>>` and `<<onclose>>` to run TwineScript code when the dialog is opened and closed (see below).

**Arguments**:

* **title**: (optional) A title to appear at the top of the dialog box. If you want to omit a title but include classes, this argument can be an empty string (`''`).
* **classList**: (optional) A string of space delimited CSS class names, e.g., `'class-a class-b class-c'`. These class names will be added to the dialog's body element.

**Usage**:
```
/% creates a link that opens a dialog box called 'Character Sheet' with the classes .char-sheet and .stats %/
<<link 'View Character Sheet'>>
	<<dialogelement 'Character Sheet' 'char-sheet stats'>>\
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
	<<dialog 'Character Sheet' 'char-sheet stats'>>\
		|Strength|$str|
		|Dexterity|$dex|
		|Wisdom|$wis|\
	<<onopen>>
		<<audio 'click' volume 1 play>>
	<</dialog>>
<</link>>
```

#### Child tag: `<<onclose>>`

You can use this child tag to run code when the dialog is closed.

**Usage**:
```
<<link 'View Character Sheet'>>
	<<dialog 'Character Sheet' 'char-sheet stats'>>\
		|Strength|$str|
		|Dexterity|$dex|
		|Wisdom|$wis|\
	<<onopen>>
		<<audio 'click' volume 1 play>>
	<<onclose>>
		<<audio 'close' volume 1 play>>
	<</dialog>>
<</link>>
```

### Macro: `<<dialogelementclose>>`

**Syntax**: `<<dialogelementclose>>`

Closes the topmost dialog.

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