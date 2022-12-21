// You can build scripts with user interfaces (UIs) to make them easier to use or share with other people. Scripts with UIs can be tested from the JavaScript Editor and then saved to the file system meaning they can be opened as a Window and so docked and saved as part of a Workspace.

// If your script has assets (for example images), you should place these inside a folder and give the folder the suffix _assets. Any directory ending with _assets will be hidden when navigating the Scripts menu.

// // Create a button and set an image
// const buttonTop = new ui.Button("Top");
// buttonTop.setImage(ui.scriptLocation+"/scriptName_assets/icon.png");

// This example will create a simple window with a title and a button which will print the number of selected items in the scene.

// // Set the window title
// ui.setTitle("Print Selection Script");

// // Create a button
// var button1 = new ui.Button("Print Selected Layers");
// // Set a callback function, this will be run when the button is clicked
// button1.onClick = function () {
//     let sel = api.getSelection();
//     if (sel.length > 0) {
//         console.log("Number of selected layers: "+sel.length);
//     } else {
//         console.log("There are no selected layers");
//     }
// }
// // Create the layout, the button will be in the middle of the window
// ui.addStretch();
// ui.add(button1);
// ui.addStretch();
// // Show the window
// ui.show()

/**
 * You can build scripts with user interfaces(UIs) to make them easier to use or share with other people. Scripts with UIs can be tested from the JavaScript Editor and then saved to the file system meaning they can be opened as a Window and so docked and saved as part of a Workspace.
 * If your script has assets (for example images), you should place these inside a folder and give the folder the suffix _assets. Any directory ending with _assets will be hidden when navigating the Scripts menu.
 *
 * Each script has its own JavaScript sandbox so pollution of the global namespace is not possible.
 * When testing UI Scripts in the JavaScript Editor you can only have one such test UI Script window loaded at a time.
 */
declare namespace ui {
	/**
	 * Add a widget to the default layout
	 */
	// TODO: Define allowed objects
	function add(widget: object)

	/**
	 * Show the script window.
	 */
	function show(): void

	/**
	 * Set the script window title
	 */
	function setTitle(title: string): void

	/**
	 * Add stretch to the default layout. Adding stretch will push widgets to the other side of the layout.
	 */
	function addStretch(): void

	/**
	 * Add some fixed spacing to the default layout.
	 */
	function addSpacing(spacing: integer): void

	/**
	 * Set the amount of spacing automatically added between each item added to the default layout. The default is 3 pixels.
	 */
	function setSpaceBetween(spacing: integer): void

	/**
	 * Set the margins of the default layout (how far from the edges the widgets can be). The default value is 3 pixels on all sides.
	 */
	function setMargins(
		left: integer,
		top: integer,
		right: integer,
		bottom: integer
	): void

	/**
	 * The path to the folder which contains this script. This is blank for UIs created from the JavaScript Editor.
	 */
	const scriptLocation: string
	// const button = new ui.ImageButton(ui.scriptLocation+"/myScript_assets/icon.png")

	/**
	 * Resize the script window.
	 */
	function resize(width: integer, height: integer): void

	/**
	 * Register a callback object with the script. See the details below in the Callbacks section.
	 */
	// TODO: Define allowed objects
	function addCallbackObject(callback: object): void

	// function Callbacks() {
	//     // This callback will be called whenever the scene selection changes
	//     this.onSelectionChanged = function () {
	//         console.log("Selection Changed");
	//     }
	// }

	// // Create the callback object
	// var callbackObj = new Callbacks();

	// // Add a callback object (you can have several if you're that way inclined)
	// ui.addCallbackObject(callbackObj);

	// Widgets

	// Supported widgets:
	//     Button
	//     Checkbox
	//     ColorChip
	//     ColorPalette
	//     ColorPicker
	//     ColorWheel
	//     Dropdown
	//     FilePath
	//     HorizontalLayout
	//     VerticalLayout
	//     Image
	//     ImageButton
	//     Label
	//     LineEdit
	//     MultiLineEdit
	//     NumericField
	//     PageView
	//     ProgressBar
	//     Slider
	//     TabView

	// Layouts can be nested so highly complex layouts are possible.

	/**
	 * Create a button.
	 */
	class Button {
		/**
		 * Button requires a default label
		 */
		constructor(label: string)

		/**
		 * Set the button text.
		 *
		 * @param buttonText
		 */
		setText(buttonText: string): void

		/**
		 * Set the size.
		 * @param buttonText
		 */
		setSize(width: integer, height: integer): void

		/**
		 * Set the height.
		 * @param buttonText
		 */
		setFixedHeight(height: integer): void

		/**
		 * Set the width.
		 * @param buttonText
		 */
		setFixedWidth(width: integer): void

		/**
		 * TODO: Add link to `ui.scriptLocation`
		 * Path to an image (relative paths can be built using the `ui.scriptLocation` property)
		 * @param buttonText
		 */
		setImage(path: string): void

		/**
		 * By default buttons have a stroke affordance, you can remove this by calling this method with `false`
		 * @param buttonText
		 */
		setDrawStroke(bool): void

		/**
		 * A callback function that will be called when the button is clicked.
		 * @param buttonText
		 */
		onClick(): void

		/**
		 * Disable or enable a widget by using this function
		 * @param buttonText
		 */
		setEnabled(enabled: boolean): void

		/**
		 * Returns `true` if the widget is enabled
		 * @param buttonText
		 */
		isEnabled(): boolean

		/**
		 * Set the background color using a hex value
		 * @param buttonText
		 */
		setBackgroundColor(color: string): void

		// // create a button
		// var button = new ui.Button("Click me!");
		// // set the onClick callback function
		// button.onClick = function () {
		//     console.log("Button was clicked");
		// }
		// // add the button to the layout
		// ui.add(button);
		// // show the window
		// ui.show()
	}

	/**
	 * A standard checkbox widget. This doesn't contain a label so combining it with a Label is highly recommended. You set the default value when you create the class.
	 */
	class Checkbox {
		/**
		 * Checkbox requires a default value
		 * @param value
		 */
		// TODO: Descriptions
		constructor(value: boolean)
		getValue(): boolean
		setValue(bool): void

		/**
		 * A callback function that will be called when the checkbox is toggled.
		 */
		onValueChanged(): void

		/**
		 * You can disable/enable a widget by using this function
		 * @param enabled
		 */
		setEnabled(enabled: boolean): void

		/**
		 * Returns `true` if the widget is enabled
		 * @param enabled
		 */
		isEnabled(): boolean

		/**
		 * Set the size.
		 * @param enabled
		 */
		setSize(width: integer, height: integer): void

		/**
		 * Set the height.
		 * @param enabled
		 */
		setFixedHeight(height: integer): void

		/**
		 * Set the width.
		 * @param enabled
		 */
		setFixedWidth(width: integer): void

		/**
		 * Sets a tooltip for this widget
		 * @param enabled
		 */
		setToolTip(string): void

		// // create a Checkbox
		// var cb = new ui.Checkbox(false);
		// // set the onValueChanged callback function
		// cb.onValueChanged = function () {
		//     console.log("Checkbox toggled, new value is: "+cb.getValue());
		// }
		// // add the checkbox to a layout with a label
		// var label = new ui.Label("Super Amazing Checkbox Demo");
		// var horizontalLayout = new ui.HLayout()
		// horizontalLayout.add(label);
		// horizontalLayout.add(cb);
		// // Add the layout to the window
		// ui.add(horizontalLayout);
		// // show the window
		// ui.show()
	}

	/**
	 * A color picker widget. You can use this to set colours using the Color Editor. The callback which loads the Color Editor on double clicking is hooked up for you — the colours returned and set are all hex values. The utilities in the Cavalry Module can be used to help with conversions.
	 */
	class ColorChip {
		getColor(): string // TODO
		getColorWithAlpha(): string // TODO
		setColor(color: string) // TODO

		/**
		 * A callback function that will be called when the color changes.
		 */
		onValueChanged(): void

		/**
		 * You can disable/enable a widget by using this function
		 *
		 * @param enabled
		 */
		setEnabled(enabled: boolean)

		/**
		 * Returns `true` if the widget is enabled
		 */
		isEnabled(): boolean

		/**
		 * Set the size.
		 *
		 * @param width
		 * @param height
		 */
		setSize(width: integer, height: integer)

		/**
		 * Set the height.
		 *
		 * @param height
		 */
		setFixedHeight(height: integer)

		/**
		 * Set the width.
		 *
		 * @param width
		 */
		setFixedWidth(width: integer)

		/**
		 * Sets a tooltip for this widget
		 *
		 * @param tooltip
		 */
		setToolTip(tooltip: string)
	}

	/**
	 * A widget that can be used to display multiple colours at once, it's useful for creating scripts that deal with color workflows. This is a feedback widget in that users cannot directly interact with it. The setColors function is not fussy about the # prefix on the hex color strings (if the hash is missing it will be added automatically).
	 */
	class ColorPalette {
		getColors(): string

		/**
		 * Set the colours to be used by the palette widget.
		 *
		 * @param colors
		 */
		setColors(colors: string[])

		/**
		 * You can disable/enable a widget by using this function
		 *
		 * @param enabled
		 */
		setEnabled(enabled: boolean)

		/**
		 * Returns true if the widget is enabled
		 */
		isEnabled(): boolean

		/**
		 * set the size of the widget (by default it will fill up as much space as possible)
		 *
		 * @param width
		 * @param height
		 */
		setSize(width: integer, height: integer)

		/**
		 * Set the height.
		 *
		 * @param height
		 */
		setFixedHeight(height: integer)

		/**
		 * Set the width.
		 *
		 * @param width
		 */
		setFixedWidth(width: integer)

		/**
		 * Sets a tooltip for this widget
		 *
		 * @param tooltip
		 */
		setToolTip(tooltip: string)

		// This example demos a simple Color Palette generator script.

		// // The number of colors our palette generator will create
		// var numColors = 10;
		// // Create a color palette object
		// var colorPalette = new ui.ColorPalette();
		// // Create a color chip object
		// var colorChip = new ui.ColorChip();

		// // Set our initial color
		// colorChip.setColor("#099789");

		// // A simple and fairly dumb function that generates some color shades for our palette
		// // There's no error checking (e.g for values above 1 or below 0).
		// colorChip.getShades = function (color) {
		//     let outColors = [];
		//     // Convert hex colours to HSV
		//     let hsv = cavalry.hexToHsv(color);
		//     let step = 0.3/numColors;
		//     let startingValue = hsv.v-(step*(numColors*.5));
		//     for (let i = 0; i < numColors; i+=1) {
		//         hsv.v = startingValue+(step*i);
		//         outColors.push(cavalry.hsvToHex(hsv.h, hsv.s, hsv.v));
		//     }
		//     return outColors;
		// }

		// // Update the color palette when the color from the color chip is changed
		// colorChip.onValueChanged = function () {
		//     colorPalette.setColors(colorChip.getShades(colorChip.getColor()));
		// };

		// // Set the initial palette
		// colorPalette.setColors(colorChip.getShades(colorChip.getColor()));

		// // Create a layout for the color chip that includes a label
		// var label = new ui.Label("Main Color");
		// var hLayout = new ui.HLayout();
		// hLayout.add(label);
		// hLayout.add(colorChip);

		// ui.add(hLayout);
		// ui.add(colorPalette);

		// // Create a button that will generate our color array based on the palette
		// var button = new ui.Button("Create Color Array");
		// button.onClick = function () {
		//     // Create a color array
		//     let colorId = api.create("colorArray", "My Color Array");
		//     // By default all arrays get an entry, let's remove it so we start from a clean slate.
		//     api.removeArrayIndex(colorId, "array.0");
		//     // Get the colours from the color palette
		//     let colours = colorPalette.getColors();
		//     for (let color of colours) {
		//         // Add a new attribute to our colorArray, the index of the new array attribute is returned
		//         let index = api.addArrayIndex(colorId, "array");
		//         // To set an object name from a variable we need to use bracket notation i.e []
		//         api.set(colorId, {["array."+index]: color});
		//     }
		// }
		// ui.add(button);

		// // Show the window
		// ui.show()
	}

	/**
	 * An eye dropper button you can use to pick colours from the screen. It offers interaction callbacks.
	 */
	class ColorPicker {
		/**
		 * Returns the color value as a hex string.
		 */
		getColor(): string

		// var picker = new ui.ColorPicker();
		// picker.onColorChanged = function() {
		//     console.log(picker.getColor());
		// }
		// picker.onColorAccepted= function() {
		//     console.log("Final color: "+picker.getColor());
		// }

		// ui.add(picker);
		// ui.show();
	}

	/**
	 * A color wheel. It provides an `onColorChanged` callback.
	 */
	class ColorWheel {
		/**
		 * Returns the color value as a hex string.
		 */
		getColor(): string

		/**
		 * Set a hex string to be the current color
		 */
		setColor()

		/**
		 * A callback function that will be called whenever the ColorWheel value changes.
		 */
		onColorChanged()

		// var colorWheel = new ui.ColorWheel();
		// colorWheel.onColorChanged = function() {
		//     console.log(colorWheel.getColor());
		// }

		// ui.add(colorWheel);
		// ui.show();
	}

	/**
	 * A dropdown menu.
	 */
	class DropDown {
		/**
		 * Returns the current index of the DropDown
		 */
		getValue(): integer

		/**
		 * Returns the current text in the DropDown
		 */
		getText(): string

		/**
		 * Add an entry to the DropDown
		 *
		 * @param label
		 */
		addEntry(label: string)

		/**
		 * Set the entry index of the DropDown
		 * @param index
		 */
		setValue(index: integer)

		/**
		 * Find the DropDown entry with the matching text and set the index to it
		 * @param label
		 */
		setText(label: string)

		/**
		 * A callback function that will be called whenever the dropdown value changes.
		 */
		onValueChanged()

		/**
		 * Fill the Dropdown with available font family names.
		 */
		populateFontFamilies()

		/**
		 * Populate the Dropdown with the styles of a given font family name.
		 *
		 * @param familyName
		 */
		populateStylesForFamily(familyName: string)

		/**
		 * You can disable/enable a widget by using this function.
		 * @param enabled
		 */
		setEnabled(enabled: boolean)

		/**
		 * Returns true if the widget is enabled.
		 */
		isEnabled(): boolean

		/**
		 * Set the size.
		 *
		 * @param width
		 * @param height
		 */
		setSize(width: integer, height: integer)

		/**
		 * Set the height.
		 *
		 * @param height
		 */
		setFixedHeight(height: integer)

		/**
		 * Set the width.
		 *
		 * @param width
		 */
		setFixedWidth(width: integer) //

		/**
		 * Sets a tooltip for this widget
		 * @param tooltip
		 */
		setToolTip(tooltip: string) //

		// // Create two dropdowns
		// var familyDropDown = new ui.DropDown();
		// var stylesDropDown = new ui.DropDown();

		// // set some sizes
		// familyDropDown.setSize(150,22);
		// stylesDropDown.setSize(100,22);

		// // populate one with all the font families available to Cavalry
		// familyDropDown.populateFontFamilies();
		// // when the first dropdown changes, populate the second with the styles of that font family
		// familyDropDown.onValueChanged = function () {
		//     stylesDropDown.populateStylesForFamily(familyDropDown.getText());
		// };

		// // populate the styles for the selected font when the window shows
		// stylesDropDown.populateStylesForFamily(familyDropDown.getText());

		// // create a horizontal layout and add the dropdowns
		// var hLayout = new ui.HLayout();
		// hLayout.addStretch();
		// hLayout.add(familyDropDown);
		// hLayout.add(stylesDropDown);
		// hLayout.addStretch();

		// // add the layout to the window
		// ui.add(hLayout);

		// // Show the window
		// ui.show();
		// // resize the window
		// ui.resize(300,100);
	}

	/**
	 * A file path widget that can be used to read folders and files or to create a new file path.
	 */
	class FilePath {
		// TODO: Descriptions
		getFilePath(): string
		setFilePath(path: string)
		setMode(mode: string)
		setFilter(filter: string)

		/**
		 * You can disable/enable a widget by using this function
		 * @param enabled
		 */
		setEnabled(enabled: boolean)

		/**
		 * Returns true if the widget is enabled
		 */
		isEnabled(): boolean

		/**
		 * Sets a tooltip for this widget
		 *
		 * @param tooltip
		 */
		setToolTip(tooltip: string)

		// // Get a file path to an exact document
		// var openFileFP = new ui.FilePath();
		// openFileFP.setMode("OpenFile");
		// openFileFP.setFilter("Text (*.txt)");
		// ui.add(openFileFP);

		// // Get a folder directory
		// var openFileDir = new ui.FilePath();
		// openFileDir.setMode("OpenDirectory");
		// ui.add(openFileDir);

		// // Get a save file path (to create a new file), the file extension will be added when the file is written.
		// var openFileSave = new ui.FilePath();
		// openFileSave.setMode("SaveFile");
		// ui.add(openFileSave);

		// ui.show()
	}

	/**
	 * A horizontal layout that you can use to create more complex UIs.
	 */
	class HLayout {
		// TODO: Descriptions
		add(object)
		addStretch()
		addSpacing(pixels: integer)

		/**
		 * Set the padding space between widgets in the layout. The default value is 3 pixels.
		 * @param pixels
		 */
		setSpaceBetween(pixels: integer)

		/**
		 * Set the margins of the layout (how far from the edges the widgets can be). The default value is 3 pixels on all sides.
		 *
		 * @param left
		 * @param top
		 * @param right
		 * @param bottom
		 */
		setMargins(left: integer, top: integer, right: integer, bottom: integer)

		// // Create the ui elements
		// var button1 = new ui.Button("Button");
		// var input1 = new ui.NumericField(100);
		// // Create the horizontal layout
		// var hLayout1 = new ui.HLayout();
		// hLayout1.add(input1);
		// hLayout1.add(button1);
		// ui.add(hLayout1);
		// // Show the window
		// ui.show()
	}

	/**
	 * Create an image.
	 */
	class Image {
		/**
		 * Requires the path to an image be provided
		 * @param imagePath
		 */
		constructor(imagePath: string)

		/**
		 * Set the size.
		 * @param width
		 * @param height
		 */
		setSize(width: integer, height: integer)

		/**
		 * Set the height.
		 * @param height
		 */
		setFixedHeight(height: integer)

		/**
		 * Set the width.
		 * @param width
		 */
		setFixedWidth(width: integer)

		/**
		 * Path to an image (relative paths can be built using the `ui.scriptLocation` property)
		 * @param path
		 */
		setImage(path: string)

		/**
		 * Sets a tooltip for this widget
		 * @param tooltip
		 */
		setToolTip(tooltip: string)

		// ui.setTitle("Test Image Script");
		// var image = new ui.Image(ui.scriptLocation+"/MyScript_assets/aPicture.png");
		// ui.add(image);
		// ui.show();
	}

	/**
	 * Create a button using an image.
	 */
	class ImageButton {
		/**
		 * Requires the path to an image be provided (relative paths can be built using the `ui.scriptLocation` property)
		 * @param imagePath
		 */
		constructor(imagePath: string)

		/**
		 * Set the size.
		 * @param width
		 * @param height
		 */
		setSize(width: integer, height: integer)

		/**
		 * Set the height.
		 * @param height
		 */
		setFixedHeight(height: integer)

		/**
		 * Set the width.
		 * @param width
		 */
		setFixedWidth(width: integer)

		/**
		 * Path to an image (relative paths can be built using the ui.scriptLocation property)
		 * @param path
		 */
		setImage(path: string)

		/**
		 * By default buttons have a stroke affordance, you can remove this by calling this method with false.
		 * @param draw
		 */
		setDrawStroke(draw: boolean)

		/**
		 * Setting to true will convert the button to a state button (on/off) and clicking the button will toggle its state between `true` and `false`. When `true`, the button will colourise light parts of the image with green.
		 * @param state
		 */
		setStateButton(state: boolean)

		/**
		 * Sets the button's state.
		 * @param state
		 */
		setState(state: boolean)

		/**
		 * Returns the current button state.
		 */
		getState(): boolean

		/**
		 * A callback function that will be called when the button is clicked.
		 */
		onClick()

		/**
		 * Disable/enable a widget by using this function
		 * @param enabled
		 */
		setEnabled(enabled: boolean)

		/**
		 * Returns `true` if the widget is enabled
		 */
		isEnabled(): boolean

		/**
		 * Sets a tooltip for this widget
		 * @param tooltip
		 */
		setToolTip(tooltip: string)

		// ui.setTitle("Test Image Button Script");
		// // Real image path required ;)
		// var image = new ui.ImageButton(ui.scriptLocation+"/some_assets/somePicture.png");
		// image.setImageSize(60,60);
		// image.setSize(60,60);
		// image.setDrawStroke(false);
		// image.onClick = function () {
		//     console.log("Image Button Clicked!");
		// };
		// ui.add(image);
		// ui.show();
	}

	/**
	 * This is a non editable piece of text which can be used to give feedback, or provide instructions. This text field accepts markdown.
	 */
	class Label {
		constructor(text: string)

		/**
		 * TODO: Description
		 * @param text
		 */
		setText(text: string)

		/**
		 * Set the text colour with a hex value.
		 * @param color
		 */
		setTextColor(color: string)

		/**
		 * TODO: Description + allowed values 0: left, 1: centre, 2: right
		 * @param align
		 */
		setAlignment(align: 0 | 1 | 2)

		/**
		 * You can disable/enable a widget by using this function.
		 * @param enabled
		 */
		setEnabled(enabled: boolean)

		/**
		 * Returns true if the widget is enabled.
		 */
		isEnabled(): boolean

		/**
		 * Set the size.
		 * @param width
		 * @param height
		 */
		setSize(width: integer, height: integer)

		/**
		 * Set the height.
		 * @param height
		 */
		setFixedHeight(height: integer)

		/**
		 * Set the width.
		 * @param width
		 */
		setFixedWidth(width: integer)

		/**
		 * Sets a tooltip for this widget
		 * @param tooltip
		 */
		setToolTip(tooltip: string)

		/**
		 * Set the background color using a hex (`#FF00FF`) value
		 * @param color
		 */
		setBackgroundColor(color: string)

		/**
		 * Set the font size in pixels
		 * @param pixelSize
		 */
		setFontSize(size: integer)

		// var label = new ui.Label("Super Amazing Label");
		// ui.add(label);
		// ui.show();
	}

	/**
	 * This widget can be used for a single line of text entry. Use `MultiLineEdit` when more than one line is required.
	 */
	class LineEdit {
		getText(): string // TODO
		setPlaceholder(text: string) // TODO

		/**
		 * Sets the LineEdit's editable state.
		 * @param readonly
		 */
		setReadOnly(readonly: boolean)

		/**
		 * You can disable/enable a widget by using this function
		 * @param enabled
		 */
		setEnabled(enabled: boolean)

		/**
		 * Returns true if the widget is enabled
		 */
		isEnabled(): boolean

		/**
		 * Set the size.
		 * @param width
		 * @param height
		 */
		setSize(width: integer, height: integer)

		/**
		 * set the height.
		 * @param height
		 */
		setFixedHeight(height: integer)

		/**
		 * Set the width.
		 * @param width
		 */
		setFixedWidth(width: integer)

		/**
		 * Sets a tooltip for this widget
		 * @param tooltip
		 */
		setToolTip(tooltip: string)
	}

	/**
	 * This widget can be used for multiple lines of text entry.
	 */
	class MultiLineEdit {
		// TODO: Descriptions
		getText()
		setPlaceholder(text: string)

		/**
		 * Set a hex color for the MultiLineEdit's background.
		 * @param color
		 */
		setBackgroundColor(color: string)

		/**
		 * Set the MultiLineEdit's editable state.
		 * @param set
		 */
		setReadOnly(set: boolean)

		/**
		 * You can disable/enable a widget by using this function.
		 * @param enabled
		 */
		setEnabled(enabled: boolean)

		/**
		 * Returns true if the widget is enabled.
		 */
		isEnabled(): boolean

		/**
		 * Set the size.
		 * @param width
		 * @param height
		 */
		setSize(width: integer, height: integer)

		/**
		 * Set the height.
		 * @param height
		 */
		setFixedHeight(height: integer)

		/**
		 * Set the width.
		 * @param width
		 */
		setFixedWidth(width: integer)

		/**
		 * Set a tooltip for this widget.
		 * @param tooltip
		 */
		setToolTip(tooltip: string)

		// var lineEdit = ui.MultiLineEdit();
		// lineEdit.setPlaceholder("Hello, World.");
		// lineEdit.setBackgroundColor("#2d2d2d");
		// ui.add(lineEdit);
		// ui.show()
	}

	/**
	 * A numeric entry field, much like the ones seen in the Attribute Editor. Numeric Fields can be both doubles or ints. The type of the field is set with the setType function.
	 */
	class NumericField {
		/**
		 * The constructor requires a default value.
		 * @param value
		 */
		constructor(value: float)
		// TODO: Descriptions
		getValue(): float
		setValue(value: number)
		setMin(min: number)
		setMax(max: number)
		// TODO: 0 for integers, 1 for doubles. Should have an enum.
		setType(type: integer)

		/**
		 * You can disable/enable a widget by using this function
		 * @param enabled
		 */
		setEnabled(enabled: boolean)

		/**
		 * Returns true if the widget is enabled
		 */
		isEnabled(): boolean

		/**
		 * Override the default size of this widget
		 * @param width
		 * @param height
		 */
		setSize(width: integer, height: integer)

		/**
		 * Sets a tooltip for this widget
		 * @param tooltip
		 */
		setToolTip(tooltip: string)

		/**
		 * Implement this callback function to do something when the field's value changes.
		 */
		onValueChanged(): void

		// var num = new ui.NumericField(50);
		// var slider = new ui.Slider();
		// slider.setRange(0,100);
		// slider.setValue(50);

		// slider.onValueChanged = function() {
		//     var sliderValue = slider.getValue();
		//     num.setValue(sliderValue);
		// }

		// num.onValueChanged = function() {
		//     var numValue = num.getValue();
		//     slider.setValue(numValue);
		// }

		// ui.add(num);
		// ui.add(slider);
		// ui.show();
	}

	/**
	 * Similar to a TabView, a PageView allows you to have many 'pages' of layouts but only show one at a time. They are useful for linear journeys though pages of content - such as wizards and guides. You can then use forward and back buttons to enable paging through such a view.
	 */
	class PageView {
		/**
		 * add a layout, this is the content of the page
		 * @param layout add a layout, this is the content of the page
		 */
		add(layout: VLayout | HLayout)

		/**
		 * Set the current page index
		 * @param index
		 */
		setPage(index: integer)

		/**
		 * Get the current page index
		 */
		currentPage(): integer

		/**
		 * Get the total number of pages
		 */
		pageCount(): integer

		// var lab1 = new ui.Label("## Page 1");
		// lab1.setAlignment(1);
		// var lab2 = new ui.Label("## Page 2");
		// lab2.setAlignment(1);
		// var lab3 = new ui.Label("## Page 3");
		// lab3.setAlignment(1);

		// var pageLayout1 = new ui.HLayout();
		// pageLayout1.add(lab1);
		// var pageLayout2 = new ui.HLayout();
		// pageLayout2.add(lab2);
		// var pageLayout3 = new ui.HLayout();
		// pageLayout3.add(lab3);

		// var pageView = new ui.PageView();
		// pageView.add(pageLayout1);
		// pageView.add(pageLayout2);
		// pageView.add(pageLayout3);

		// ui.add(pageView);

		// var nextButton = new ui.Button("Next");
		// var prevButton = new ui.Button("Previous");
		// var hLay = new ui.HLayout();
		// hLay.add(prevButton);
		// hLay.add(nextButton);

		// nextButton.onClick = function () {
		//     pageView.setPage(pageView.currentPage()+1);
		// }
		// prevButton.onClick = function () {
		//     pageView.setPage(pageView.currentPage()-1);
		// }

		// ui.add(hLay);
		// ui.show();
	}

	/**
	 * A Slider which returns values in a range.
	 */
	class Slider {
		/**
		 * Get the current value
		 */
		getValue(): float

		/**
		 * Set the current value
		 */
		setValue(value: number)

		/**
		 * Set the range of the slider
		 */
		setRange(min: number, max: number)

		// TODO: Description
		onValueChanged(): void
		// var slider = new ui.Slider();
		// slider.setRange(0,100);

		// slider.onValueChanged = function() {
		//     console.log(slider.getValue());
		// }

		// ui.add(slider);
		// ui.show();
	}

	/**
	 * A progress bar so you can update your users on long processes.
	 */
	class ProgressBar {
		/**
		 * Get the current value
		 */
		// TODO: Verify return value
		getValue(): integer

		/**
		 * Set the current value
		 */
		setValue(value: number)

		/**
		 * Set the maximum value, the bar will show a percentage result of the value when compared to the maximum.
		 * @param value
		 */
		setMaximum(value: integer)

		// let progress = new ui.ProgressBar();
		// progress.setMaximum(66);
		// progress.setValue(33);
		// ui.add(progress);
		// ui.show()
	}

	/**
	 * Similar to the PageView, the Tab view is perfect for progressively disclosing controls.
	 */
	class TabView {
		/**
		 * Name the tab, and set the contents of the tab - which should be a layout
		 * @param label
		 * @param layout
		 */
		add(label: string, layout: VLayout | HLayout)

		/**
		 * Set the current tab index
		 * @param index
		 */
		setTab(index: integer)

		/**
		 * Get the current tab index
		 */
		currentTab(): integer

		/**
		 * Get the total number of tabs
		 */
		tabCount(): integer

		/**
		 * Implement this callback function to do something when the slider's value changes.
		 */
		// TODO: This is not a function, but it can be assigned one
		onValueChanged()

		// var lab1 = new ui.Label("## Page 1");
		// lab1.setAlignment(1);
		// var lab2 = new ui.Label("## Page 2");
		// lab2.setAlignment(1);
		// var lab3 = new ui.Label("## Page 3");
		// lab3.setAlignment(1);

		// var tabLayout1 = new ui.HLayout();
		// tabLayout1.add(lab1);
		// var tabLayout2 = new ui.HLayout();
		// tabLayout2.add(lab2);
		// var tabLayout3 = new ui.HLayout();
		// tabLayout3.add(lab3);

		// var tabView = new ui.TabView();
		// tabView.add("One", tabLayout1);
		// tabView.add("Two", tabLayout2);
		// tabView.add("Three", tabLayout3);

		// ui.add(tabView);
		// ui.show();
	}

	/**
	 * A vertical layout that you can use to create more complex UIs.
	 */
	class VLayout {
		// TODO: Descriptions
		// TODO: Define allowed values
		add(widget: object)
		addStretch()
		addSpacing(pixels: integer)

		/**
		 * Set the padding space between widgets in the layout. The default value is 3 pixels.
		 * @param space
		 */
		setSpaceBetween(space: integer)

		/**
		 * Set the margins of the layout (how far from the edges the widgets can be). The default value is 3 pixels on all sides.
		 * @param left
		 * @param top
		 * @param right
		 * @param bottom
		 */
		setMargins(left: integer, top: integer, right: integer, bottom: integer)

		/**
		 * Add a horizontal line with a title.
		 * @param label
		 */
		addSeparator(label: string)

		// // Create the ui elements
		// var button1 = new ui.Button("Button");
		// var input1 = new ui.NumericField(100);
		// // Create the vertical layout.
		// var vLayout1 = new ui.VLayout();
		// vLayout1.add(input1);
		// vLayout1.add(button1);
		// ui.add(vLayout1);
		// // Show the window
		// ui.show()
	}

	// TODO: Callbacks
	// You can register callbacks to learn about various changes in the app.
	// Supported callbacks
	//     Composition Changed
	//     Scene Changed
	//     Selection Changed
	//     Attribute Changed

	// If you'd like to see any additional callbacks, please get in touch.

	// ui.setTitle("Test Callbacks Script");

	// // Three labels that we'll set when the callbacks are hit
	// selLabel = new ui.Label("Waiting for selection message");
	// compLabel = new ui.Label("Waiting for Composition message");
	// sceneLabel = new ui.Label("Waiting for Scene message");

	// // The important thing about this object is the function names within it.
	// // As long as one of the callback functions is present the `addCallbackObject` function will take the object.
	// function Callbacks() {
	//     // This callback will be called whenever the scene selection changes
	//     this.onSelectionChanged = function () {
	//         selLabel.setText("Selection size: "+api.getSelection().length);
	//     }
	//     // This callback will be called whenever the composition changes
	//     this.onCompChanged = function () {
	//         compLabel.setText("Composition Changed: "+api.getNiceName(api.getActiveComp()));
	//     }
	//     // This callback will be called whenever the Scene is changed (e.g Load Scene or New Scene).
	//     this.onSceneChanged = function () {
	//         let currentTime = new Date().toLocaleTimeString();
	//         sceneLabel.setText("Scene Changed at: "+currentTime);
	//     }
	//     // This callback will be called when ANY attribute in the scene changes.
	//     // Do not call heavy functions inside this callback.
	//     // Remember to check layer types and attr ids to see if you're interested in this callback. If you aren't, `return`.
	//     this.onAttrChanged = function (layerId, attrId) {
	//         console.log("attr changed: "+ layerId + " attr: " + attrId);
	//     }
	// }

	// // Create the callback object
	// var callbackObj = new Callbacks();

	// // build the UI
	// ui.add(selLabel);
	// ui.add(compLabel);
	// ui.add(sceneLabel);
	// ui.addStretch();

	// // Add a callback object (you can have several if you're that way inclined)
	// ui.addCallbackObject(callbackObj);
	// // Show the window
	// ui.show();

	/**
	 * Timers can be used in UI scripts and can be useful for polling Web APIs. When the Timer is triggered it will call an `onTimeout()` function on the Timer object. Implement this function to have the Timer execute logic for you when this happens.
	 * Caution: Timers should not be used to detect changes to the scene, please use callbacks for this purpose.
	 */
	class Timer {
		/**
		 * Start the timer.
		 */
		start()

		/**
		 * Stop the timer.
		 */
		stop()

		/**
		 * Returns if the timer is currently running.
		 */
		isActive(): boolean

		/**
		 * Set how long the timer is (in milliseconds).
		 * @param interval
		 */
		setInterval(interval: integer)

		/**
		 * Set if the timer is repeating (`true` by default).
		 * @param repeat
		 */
		setRepeating(repeat: boolean)

		/**
		 * Implement this callback function on a timer object and it will be called when the timer runs out.
		 */
		onTimeout()

		// // Define a callback class to be used by the timer
		// function Callbacks() {
		//     // This callback will be called whenever the timer times out
		//     this.onTimeout = function () {
		//         console.log("Timer Expired");
		//     }
		// }

		// // Create the callback class
		// var callbackObj = new Callbacks();

		// // Make the timer and feed it the callback object
		// var timer = new api.Timer(callbackObj);
	}
}
