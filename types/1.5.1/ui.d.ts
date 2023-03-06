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
 * Scripts with user interfaces (UIs) can be built to make them easier to use
 * or share with other people. They can be tested from the JavaScript Editor
 * and then saved to the file system meaning they can be opened as a Window
 * and so docked and saved as part of a workspace.
 *
 * If a script has assets (for example images), these should be placed inside
 * a folder with the suffix `_assets`. Any directory ending with `_assets` will
 * be hidden when navigating the `Scripts` menu.
 *
 * Each script has its own JavaScript sandbox so pollution of the global
 * namespace is not possible.
 */

declare namespace ui {
	type Layouts = HLayout | VLayout
	type Widgets =
		| Button
		| Checkbox
		| ColorChip
		| ColorPalette
		| ColorPicker
		| ColorWheel
		| DropDown
		| FilePath
		| Image
		| ImageButton
		| Label
		| LineEdit
		| MultiLineEdit
		| NumericField
		| Slider
		| ProgressBar
		| PageView
		| TabView
		| ScrollView
	type WidgetsOrLayouts = Widgets | Layouts

	/**
	 * Callbacks can be registered to learn about various changes in the app.
	 */
	interface EventCallbacks {
		/**
		 * TODO: Description
		 */
		onCompChanged(): void

		/**
		 * TODO: Description
		 */
		onSceneChanged(): void

		/**
		 * TODO: Description
		 */
		onSelectionChanged(): void

		/**
		 * TODO: Description
		 */
		onAttrChanged(): void

		/**
		 * TODO: Description
		 */
		onAssetAdded(): void

		/**
		 * TODO: Description
		 */
		onAssetRemoved(): void

		/**
		 * TODO: Description
		 */
		onLayerAdded(): void

		/**
		 * TODO: Description
		 */
		onLayerRemoved(): void

		/**
		 * TODO: Description
		 */
		onJSError(): void

		/**
		 * TODO: Description
		 */
		onAttributeSelectionChanged(): void

		/**
		 * TODO: Description
		 */
		onPointSelectionChanged(): void

		/**
		 * TODO: Description
		 */
		onKeySelectionChanged(): void
	}

	/**
	 * The path to the folder which contains this script. This is blank for UIs
	 * created from the JavaScript Editor.
	 *
	 * @example
	 * const button = new ui.ImageButton(`${ui.scriptLocation}/myScript_assets/icon.png`)
	 */
	const scriptLocation: string

	/**
	 * Add a widget to the default layout
	 *
	 * @param widget
	 */
	function add(...widget: WidgetsOrLayouts[]): void

	/**
	 * Show the script window.
	 */
	function show(): void

	/**
	 * Set the script window title
	 *
	 * @param title
	 */
	function setTitle(title: string): void

	/**
	 * Add stretch to the default layout. Adding stretch will push widgets to
	 * the other side of the layout.
	 *
	 */
	function addStretch(): void

	/**
	 * Add some fixed spacing to the default layout.
	 *
	 * @param spacing
	 */
	function addSpacing(spacing: integer): void

	/**
	 * Set the amount of spacing automatically added between each item added to
	 * the default layout. The default is 3 pixels.
	 *
	 * @param spacing
	 */
	function setSpaceBetween(spacing: integer): void

	/**
	 * Set the margins of the default layout (how far from the edges the widgets
	 * can be). The default value is 3 pixels on all sides.
	 *
	 * @param left
	 * @param top
	 * @param right
	 * @param bottom
	 */
	function setMargins(
		left: integer,
		top: integer,
		right: integer,
		bottom: integer
	): void

	/**
	 * Register a callback object with the script.
	 *
	 * @param callback
	 *
	 * @example
	 * function Callbacks() {
	 * // This callback will be called whenever the scene selection changes
	 *   this.onSelectionChanged = () => {
	 *     console.log('Selection Changed')
	 *   }
	 * }
	 * // Create the callback object
	 * const callbackObj = new Callbacks()
	 * // Add a callback object (you can have several if you're that way inclined)
	 * ui.addCallbackObject(callbackObj)
	 */
	function addCallbackObject(callback: EventCallbacks): void

	/**
	 * Tells the window that it's a toolbar, it will not include a docking tab.
	 *
	 * @example
	 * ui.setToolbar()
	 * //32px for Icon, 12px for Window Title
	 * ui.setFixedHeight(44)
	 * const layout = new ui.HLayout()
	 * const button = new ui.ImageButton(`${api.getAppAssetsPath()}/icons/shelf_Cel.png`);
	 * button.setImageSize(32, 32);
	 *
	 * const button2 = new ui.ImageButton(`${api.getAppAssetsPath()}/icons/shelf_Extrude.png`);
	 * button2.setImageSize(32, 32);
	 *
	 * const button3 = new ui.ImageButton(`${api.getAppAssetsPath()}/icons/shelf_LayoutGrid.png`);
	 * button3.setImageSize(32, 32);
	 *
	 * layout.add(button, button2, button3)
	 * layout.addStretch()
	 * ui.add(layout)
	 * ui.show()
	 */
	function setToolbar(): void

	/**
	 * Tells a toolbar window to expect a vertical layout, it will not include
	 * a docking tab.
	 *
	 * @example
	 * ui.setToolbar()
	 * ui.setVerticalToolbar()
	 * ui.setFixedWidth(44)
	 *
	 * const layout = new ui.VLayout()
	 * const button = new ui.ImageButton(`${api.getAppAssetsPath()}/icons/shelf_Cel.png`);
	 * button.setImageSize(32, 32);
	 *
	 * const button2 = new ui.ImageButton(`${api.getAppAssetsPath()}/icons/shelf_Extrude.png`);
	 * button2.setImageSize(32, 32);
	 *
	 * const button3 = new ui.ImageButton(`${api.getAppAssetsPath()}/icons/shelf_LayoutGrid.png`);
	 * button3.setImageSize(32, 32);
	 *
	 * layout.add(button, button2, button3)
	 * layout.addStretch()
	 * ui.add(layout)
	 * ui.show()
	 */
	function setVerticalToolbar(): void

	/**
	 * Set a minimum width for a UI window.
	 *
	 * Caution: Specifying a value could break a layout when docking a window.
	 *
	 * @example
	 * ui.setMinimumWidth(200);
	 * ui.show();
	 *
	 * @param width
	 */
	function setMinimumWidth(width: integer): void

	/**
	 * Set a minimum height for a UI window.
	 *
	 * Caution: Specifying a value could break a layout when docking a window.
	 *
	 * @param height
	 *
	 * @example
	 * ui.setMinimumHeight(200);
	 * ui.show();
	 */
	function setMinimumHeight(height: integer): void

	/**
	 * Set a maxmimum width for a UI window.
	 *
	 * Caution: Specifying a value could break a layout when docking a window.
	 *
	 * @param width
	 *
	 * @example
	 * ui.setMaximumWidth(200);
	 * ui.show();
	 */
	function setMaximumWidth(width: integer): void

	/**
	 * Set a maximum height for a UI window.
	 *
	 * Caution: Specifying a value could break a layout when docking a window.
	 *
	 * @param height
	 *
	 * @example
	 * ui.setMaximumHeight(200);
	 * ui.show();
	 */
	function setMaximumHeight(height: integer): void

	/**
	 * Set a fixed width for a UI window.
	 *
	 * Caution: Specifying a value could break a layout when docking a window.
	 *
	 * @param width
	 *
	 * @example
	 * ui.setFixedWidth(200);
	 * ui.show();
	 */
	function setFixedWidth(width: integer): void

	/**
	 * Set a fixed height for a UI window.
	 *
	 * Caution: Specifying a value could break a layout when docking a window.
	 *
	 * @param height
	 *
	 * @example
	 * ui.setFixedHeight(200);
	 * ui.show();
	 */
	function setFixedHeight(height: integer): void

	/**
	 * Set a fixed width and height for a UI window.
	 *
	 * Caution: Specifying a value could break a layout when docking a window.
	 *
	 * @param width
	 * @param height
	 *
	 * @example
	 * ui.setFixedSize(400, 200);
	 * ui.show();
	 */
	function setFixedSize(width: integer, height: integer): void

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
	 * Internal base class for widgets. You cannot call `new Widget()`.
	 * @private
	 */
	class Widget {
		/**
		 * Disable or enable a widget by using this function
		 *
		 * @param enabled
		 */
		setEnabled(enabled: boolean): void

		/**
		 * Returns `true` if the widget is enabled
		 */
		isEnabled(): boolean

		/**
		 * TODO: Description
		 *
		 * @param hidden
		 */
		setHidden(hidden: boolean): void

		/**
		 * TODO: Description
		 */
		isHidden(): boolean

		/**
		 * Set the background color using a hex value
		 *
		 * @param color
		 */
		setBackgroundColor(color: string): void

		/**
		 * Set the size.
		 *
		 * @param width
		 * @param height
		 */
		setSize(width: integer, height: integer): void

		/**
		 * Set the height.
		 *
		 * @param height
		 */
		setFixedHeight(height: integer): void

		/**
		 * Set the width.
		 *
		 * @param width
		 */
		setFixedWidth(width: integer): void

		/**
		 * Sets a tooltip for this widget
		 *
		 * @param enabled
		 */
		setToolTip(enabled: string): void
	}

	/**
	 * Create a button.
	 *
	 * @example
	 * // create a button
	 * const button = new ui.Button("Click me!");
	 * // set the onClick callback function
	 * button.onClick = function () {
	 *     console.log("Button was clicked");
	 * }
	 * // add the button to the layout
	 * ui.add(button);
	 * // show the window
	 * ui.show()
	 */
	class Button extends Widget {
		/**
		 * Button requires a default label
		 *
		 * @param label
		 */
		constructor(label: string)

		/**
		 * Set the button text.
		 *
		 * @param buttonText
		 */
		setText(buttonText: string): void

		/**
		 * Set an icon for the button on the left side of the text. Relative
		 * paths can be built using `ui.scriptLocation`.
		 *
		 * TODO: Add link to `ui.scriptLocation`
		 *
		 * @param path
		 */
		setImage(path: string): void

		/**
		 * By default buttons have a stroke affordance, you can remove this by
		 * calling this method with `false`
		 *
		 * TODO: Requires clarification of stroke affordance meaning
		 *
		 * @param removeAffordance
		 */
		setDrawStroke(removeAffordance: boolean): void

		/**
		 * A callback function that will be called when the button is clicked.
		 */
		onClick(): void
	}

	/**
	 * A standard checkbox widget. This doesn't contain a label so combining
	 * it with a `ui.Label is highly recommended. You set the default value
	 * when you create the class.
	 *
	 * @example
	 * // create a Checkbox
	 * const cb = new ui.Checkbox(false);
	 * // set the onValueChanged callback function
	 * cb.onValueChanged = function () {
	 *     console.log(`Checkbox toggled, new value is: ${cb.getValue()}`);
	 * }
	 * // add the checkbox to a layout with a label
	 * const label = new ui.Label("Super Amazing Checkbox Demo");
	 * const horizontalLayout = new ui.HLayout()
	 * horizontalLayout.add(label);
	 * horizontalLayout.add(cb);
	 * // Add the layout to the window
	 * ui.add(horizontalLayout);
	 * // show the window
	 * ui.show()
	 */
	class Checkbox extends Widget {
		/**
		 * Checkbox requires a default value
		 *
		 * @param value
		 */
		constructor(value: boolean)

		/**
		 * TODO: Description
		 */
		getValue(): boolean

		/**
		 * TODO: Description
		 *
		 * @param value
		 */
		setValue(value: boolean): void

		/**
		 * A callback function that will be called when the checkbox is toggled.
		 */
		onValueChanged(): void
	}

	/**
	 * A color picker widget. You can use this to set colours using the Color
	 * Editor. The callback which loads the Color Editor on double clicking is
	 * hooked up for you — the colours returned and set are all hex values. The
	 * utilities in the Cavalry Module can be used to help with conversions.
	 */
	class ColorChip extends Widget {
		/**
		 * TODO: Description
		 */
		getColor(): string

		/**
		 * TODO: Description
		 */
		getColorWithAlpha(): string

		/**
		 * TODO: Description
		 *
		 * @param color
		 */
		setColor(color: string): void

		/**
		 * A callback function that will be called when the color changes.
		 */
		onValueChanged(): void
	}

	/**
	 * A widget that can be used to display multiple colours at once, it's useful
	 * for creating scripts that deal with color workflows. This is a feedback
	 * widget in that users cannot directly interact with it. The `setColors` function
	 * is not fussy about the # prefix on the hex color strings (if the hash is
	 * missing it will be added automatically).
	 *
	 * @example
	 * // This example demos a simple Color Palette generator script.
	 * // The number of colors our palette generator will create
	 * const numColors = 10;
	 * // Create a color palette object
	 * const colorPalette = new ui.ColorPalette();
	 * // Create a color chip object
	 * const colorChip = new ui.ColorChip();
	 * // Set our initial color
	 * colorChip.setColor("#099789");
	 * // A simple and fairly dumb function that generates some color shades for our palette
	 * // There's no error checking (e.g for values above 1 or below 0).
	 * colorChip.getShades = (color) => {
	 *  let outColors = [];
	 *  // Convert hex colours to HSV
	 *  let hsv = cavalry.hexToHsv(color);
	 *  let step = 0.3 / numColors;
	 *  let startingValue = hsv.v - (step * (numColors * 0.5));
	 *  for (let i = 0; i < numColors; i += 1) {
	 *    hsv.v = startingValue + (step * i);
	 *    outColors.push(cavalry.hsvToHex(hsv.h, hsv.s, hsv.v));
	 *  }
	 *  return outColors;
	 * }
	 * // Update the color palette when the color from the color chip is changed
	 * colorChip.onValueChanged = () => {
	 *   colorPalette.setColors(colorChip.getShades(colorChip.getColor()));
	 * };
	 * // Set the initial palette
	 * colorPalette.setColors(colorChip.getShades(colorChip.getColor()));
	 * // Create a layout for the color chip that includes a label
	 * const label = new ui.Label("Main Color");
	 * const hLayout = new ui.HLayout();
	 * hLayout.add(label);
	 * hLayout.add(colorChip);
	 * ui.add(hLayout);
	 * ui.add(colorPalette);
	 * // Create a button that will generate our color array based on the palette
	 * const button = new ui.Button("Create Color Array");
	 * button.onClick = () => {
	 *   // Create a color array
	 *   let colorId = api.create("colorArray", "My Color Array");
	 *   // By default all arrays get an entry, let's remove it so we start from a clean slate.
	 *   api.removeArrayIndex(colorId, "array.0");
	 *   // Get the colours from the color palette
	 *   let colours = colorPalette.getColors();
	 *   for (let color of colours) {
	 *     // Add a new attribute to our colorArray, the index of the new array attribute is returned
	 *     let index = api.addArrayIndex(colorId, "array");
	 *     // To set an object name from a variable we need to use bracket notation i.e []
	 *     api.set(colorId, {[`array.${index}`]: color});
	 *   }
	 * }
	 * ui.add(button);
	 * // Show the window
	 * ui.show()
	 */
	class ColorPalette extends Widget {
		getColors(): string[]

		/**
		 * Set the colours to be used by the palette widget.
		 *
		 * @param colors
		 */
		setColors(colors: string[]): void
	}

	/**
	 * An eye dropper button you can use to pick colours from the screen. It
	 * offers interaction callbacks.
	 *
	 * @example
	 * const picker = new ui.ColorPicker();
	 * picker.onColorChanged = () => {
	 *   console.log(picker.getColor());
	 * }
	 * picker.onColorAccepted = () => {
	 *   console.log(`Final color: ${picker.getColor()}`);
	 * }
	 * ui.add(picker);
	 * ui.show();
	 */
	class ColorPicker extends Widget {
		/**
		 * Returns the color value as a hex string.
		 */
		getColor(): string
	}

	/**
	 * A color wheel. It provides an `onColorChanged` callback.
	 *
	 * @example
	 * const colorWheel = new ui.ColorWheel();
	 * colorWheel.onColorChanged = () => {
	 *   console.log(colorWheel.getColor());
	 * }
	 * ui.add(colorWheel);
	 * ui.show();
	 */
	class ColorWheel extends Widget {
		/**
		 * Returns the color value as a hex string.
		 */
		getColor(): string

		/**
		 * Set a hex string to be the current color
		 */
		setColor(color: string): void

		/**
		 * A callback function that will be called whenever the ColorWheel value
		 * changes.
		 */
		onColorChanged(): void
	}

	/**
	 * A dropdown menu.
	 *
	 * @example
	 * // Create two dropdowns
	 * const familyDropDown = new ui.DropDown();
	 * const stylesDropDown = new ui.DropDown();
	 * // set some sizes
	 * familyDropDown.setSize(150,22);
	 * stylesDropDown.setSize(100,22);
	 * // populate one with all the font families available to Cavalry
	 * familyDropDown.populateFontFamilies();
	 * // when the first dropdown changes, populate the second with the styles of that font family
	 * familyDropDown.onValueChanged = function () {
	 *   stylesDropDown.populateStylesForFamily(familyDropDown.getText());
	 * };
	 * // populate the styles for the selected font when the window shows
	 * stylesDropDown.populateStylesForFamily(familyDropDown.getText());
	 * // create a horizontal layout and add the dropdowns
	 * const hLayout = new ui.HLayout();
	 * hLayout.addStretch();
	 * hLayout.add(familyDropDown);
	 * hLayout.add(stylesDropDown);
	 * hLayout.addStretch();
	 * // add the layout to the window
	 * ui.add(hLayout);
	 * // Show the window
	 * ui.show();
	 */
	class DropDown extends Widget {
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
		addEntry(label: string): void

		/**
		 * Add a dividing line at a given index to visually organise the entries.
		 * A separator is counted as an index.
		 *
		 * @param index
		 */
		insertSeparator(index: integer): void

		/**
		 * Set the entry index of the DropDown
		 *
		 * @param index
		 */
		setValue(index: integer): void

		/**
		 * Find the DropDown entry with the matching text and set the index to it
		 *
		 * @param label
		 */
		setText(label: string): void

		/**
		 * A callback function that will be called whenever the dropdown value
		 * changes.
		 */
		onValueChanged(): void

		/**
		 * Fill the Dropdown with available font family names.
		 */
		populateFontFamilies(): void

		/**
		 * Populate the Dropdown with the styles of a given font family name.
		 *
		 * @param familyName
		 */
		populateStylesForFamily(familyName: string): void

		/**
		 * Empty the DropDown so it can be repopulated.
		 */
		clear(): void
	}

	/**
	 * A file path widget that can be used to read folders and files or to create
	 * a new file path.
	 *
	 * @example
	 * // Get a file path to an exact document
	 * const openFileFP = new ui.FilePath();
	 * openFileFP.setMode("OpenFile");
	 * openFileFP.setFilter("Text (*.txt; *.js)");
	 * ui.add(openFileFP);
	 * // Get a folder directory
	 * const openFileDir = new ui.FilePath();
	 * openFileDir.setMode("OpenDirectory");
	 * ui.add(openFileDir);
	 * // Get a save file path (to create a new file), the file extension will be added when the file is written.
	 * const openFileSave = new ui.FilePath();
	 * openFileSave.setMode("SaveFile");
	 * ui.add(openFileSave);
	 * ui.show()
	 */
	class FilePath extends Widget {
		/**
		 * TODO: Description
		 */
		getFilePath(): string

		/**
		 * Add placeholder text
		 *
		 * @param placeholder
		 */
		setPlaceholder(placeholder: string): void

		/**
		 * Set the `path` which opens when clicking the folder icon
		 *
		 * @param path
		 */
		setOpenLocation(path: string): void

		/**
		 * TODO: Description
		 *
		 * @param path
		 */
		setFilePath(path: string): void

		/**
		 * TODO: Description
		 *
		 * @param mode Valid arguments are 'OpenFile', 'OpenDirectory' and 'SaveFile'
		 */
		setMode(mode: 'OpenFile' | 'OpenDirectory' | 'SaveFile'): void

		/**
		 * TODO: Description
		 *
		 * @param filter
		 *
		 * @example
		 * const getImage = new ui.FilePath();
		 * getImage.setMode("OpenFile");
		 * getImage.setFilter("Image (*.jpg; *.jpeg; *.png)");
		 * ui.add(getImage);
		 * ui.show()
		 */
		setFilter(filter: string): void

		/**
		 * A callback function that will be called whenever the FilePath value
		 * changes.
		 */
		onValueChanged(): void
	}

	/**
	 * Create an image.
	 *
	 * @example
	 * ui.setTitle("Test Image Script");
	 * const image = new ui.Image(`${ui.scriptLocation}/MyScript_assets/aPicture.png`);
	 * ui.add(image);
	 * ui.show();
	 */
	class Image extends Widget {
		/**
		 * Requires the path to an image be provided
		 *
		 * @param imagePath
		 */
		constructor(imagePath: string)

		/**
		 * Path to an image (relative paths can be built using the
		 * `ui.scriptLocation` property)
		 *
		 * @param path
		 */
		setImage(path: string): void
	}

	/**
	 * Create a button using an image.
	 *
	 * TODO: Which file types are supported?
	 *
	 * @example
	 * ui.setTitle("Test Image Button Script");
	 * const image = new ui.ImageButton(`${ui.scriptLocation}/Icons/transform@2x.png`);
	 * image.setImageSize(60,60);
	 * image.setSize(60,60);
	 * image.setDrawStroke(false);
	 * image.onClick = function () {
	 *     console.log("Image Button Clicked!");
	 * };
	 * ui.add(image);
	 * ui.show();
	 */
	class ImageButton extends Widget {
		/**
		 * Requires the path to an image be provided (relative paths can be
		 * built using the `ui.scriptLocation` property)
		 *
		 * @param imagePath
		 */
		constructor(imagePath: string)

		/**
		 * Path to an image (relative paths can be built using the
		 * `ui.scriptLocation` property)
		 *
		 * @param path
		 */
		setImage(path: string): void

		/**
		 * Set the image's dimensions.
		 *
		 * @param width
		 * @param height
		 */
		setImageSize(width: integer, height: integer): void

		/**
		 * By default buttons have a stroke affordance, you can remove this by
		 * calling this method with false.
		 *
		 * @param draw
		 */
		setDrawStroke(draw: boolean): void

		/**
		 * Setting to true will convert the button to a state button (on/off)
		 * and clicking the button will toggle its state between `true` and
		 * `false`. When `true`, the button will colourise light parts of the
		 * image with green.
		 *
		 * @param state
		 */
		setStateButton(state: boolean): void

		/**
		 * Sets the button's state.
		 *
		 * @param state
		 */
		setState(state: boolean): void

		/**
		 * Returns the current button state.
		 */
		getState(): boolean

		/**
		 * A callback function that will be called when the button is clicked.
		 */
		onClick(): void

		/**
		 * TODO: Description
		 *
		 * @param width
		 * @param height
		 */
		setImageSize(width: number, height: number): void
	}

	/**
	 * This is a non editable piece of text which can be used to give feedback,
	 * or provide instructions. This text field accepts Markdown.
	 *
	 * @example
	 * const label = new ui.Label("Super Amazing Label");
	 * ui.add(label);
	 * ui.show();
	 */
	class Label extends Widget {
		constructor(text: string)

		/**
		 * TODO: Description
		 *
		 * @param text
		 */
		setText(text: string): void

		/**
		 * Set the text colour with a hex value.
		 *
		 * @param color
		 */
		setTextColor(color: string): void

		/**
		 * TODO: Description + allowed values 0: left, 1: centre, 2: right
		 *
		 * @param align
		 */
		setAlignment(align: 0 | 1 | 2): void

		/**
		 * Set the font size in pixels
		 *
		 * @param pixelSize
		 */
		setFontSize(size: integer): void

		/**
		 * Use Markdown to format the label. Note that `setFontSize` will not
		 * work if using Markdown.
		 *
		 * @param markdown
		 */
		setMarkdown(markdown: string): void
	}

	/**
	 * This widget can be used for a single line of text entry. Use
	 * `MultiLineEdit` when more than one line is required.
	 *
	 * @example
	 * const lineEdit = ui.LineEdit();
	 * lineEdit.setPlaceholder("Hello, World.");
	 * lineEdit.setBackgroundColor("#2d2d2d");
	 * lineEdit.setTextColor("#e62163");
	 * lineEdit.onValueChanged = function () {
	 *     console.log(`Text has been edited: ${lineEdit.getText()}`);
	 * }
	 * lineEdit.onValueCommitted = function () {
	 *     console.log(`Return pressed: ${lineEdit.getText()}`);
	 * }
	 * ui.add(lineEdit);
	 * ui.show()
	 */
	class LineEdit extends Widget {
		/**
		 * TODO: Description
		 */
		getText(): string

		/**
		 * Populate the widget with a string.
		 */
		setText(text: string): void

		/**
		 * TODO: Description
		 *
		 * @param text
		 */
		setPlaceholder(text: string): void

		/**
		 * Sets the LineEdit's editable state.
		 *
		 * @param readonly
		 */
		setReadOnly(readonly: boolean): void

		/**
		 * Clear the widget's contents.
		 */
		clear(): void

		/**
		 * Assign a function to this variable to be called when the widget's
		 * content is changed.
		 */
		onValueChanged(): void

		/**
		 * Assign a function to this variable to be called when a change to
		 * the widget is committed – either by the user pressing the return/
		 * enter key or by the field losing focus.
		 */
		onValueCommitted(): void
	}

	/**
	 * This widget can be used for multiple lines of text entry.
	 *
	 * @example
	 * const lineEdit = ui.MultiLineEdit();
	 * lineEdit.setPlaceholder("Hello, World.");
	 * lineEdit.setBackgroundColor("#2d2d2d");
	 * ui.add(lineEdit);
	 * ui.show()
	 */
	class MultiLineEdit extends Widget {
		/**
		 * TODO: Description
		 */
		getText(): string

		/**
		 * Populate the widget with a string.
		 *
		 * @param text
		 */
		setText(text: string): void

		/**
		 * TODO: Description
		 *
		 * @param text
		 */
		setPlaceholder(text: string): void

		/**
		 * Set the MultiLineEdit's editable state.
		 *
		 * @param set
		 */
		setReadOnly(set: boolean): void

		/**
		 * Clear the widget's contents.
		 */
		clear(): void

		/**
		 * Assign a function to this variable to be called when the widget's
		 * content is changed.
		 */
		onValueChanged(): void
	}

	/**
	 * A numeric entry field, much like the ones seen in the Attribute Editor.
	 * Numeric Fields can be both doubles or ints. The type of the field is set
	 * with the setType function.
	 *
	 * @example
	 * const num = new ui.NumericField(50);
	 * const slider = new ui.Slider();
	 * slider.setRange(0, 100);
	 * slider.setValue(50);
	 * slider.onValueChanged = () => {
	 *     var sliderValue = slider.getValue();
	 *     num.setValue(sliderValue);
	 * }
	 * num.onValueChanged = () => {
	 *     var numValue = num.getValue();
	 *     slider.setValue(numValue);
	 * }
	 * ui.add(num);
	 * ui.add(slider);
	 * ui.show();
	 */
	class NumericField extends Widget {
		/**
		 * The NumericField requires a default value.
		 *
		 * @param value
		 */
		constructor(value: float)

		/**
		 * TODO: Description
		 */
		getValue(): float

		/**
		 * TODO: Description
		 *
		 * @param value
		 */
		setValue(value: number): void

		/**
		 * TODO: Description
		 *
		 * @param min
		 */
		setMin(min: number): void

		/**
		 * TODO: Description
		 *
		 * @param max
		 */
		setMax(max: number): void

		/**
		 * TODO: Description
		 *
		 * @param type `0` for integers, `1` for doubles
		 */
		// TODO: Replace with enum once implemented
		setType(type: 0 | 1): void

		/**
		 * Implement this callback function to do something when the field's
		 * value changes.
		 */
		onValueChanged(): void
	}

	/**
	 * A Slider which returns values in a range.
	 *
	 * @example
	 * const slider = new ui.Slider();
	 * slider.setRange(0,100);
	 * slider.onValueChanged = () => {
	 *   console.log(slider.getValue());
	 * }
	 * ui.add(slider);
	 * ui.show();
	 */
	class Slider extends Widget {
		/**
		 * Get the current value
		 */
		getValue(): float

		/**
		 * Set the current value
		 */
		setValue(value: number): void

		/**
		 * Set the range of the slider
		 */
		setRange(min: number, max: number): void

		/**
		 * Implement this callback function to do something when the slider's
		 * value changes.
		 */
		onValueChanged(): void
	}

	/**
	 * A progress bar that can be used to update users on long processes.
	 *
	 * @example
	 * const progress = new ui.ProgressBar();
	 * progress.setMaximum(66);
	 * progress.setValue(33);
	 * ui.add(progress);
	 * ui.show()
	 */
	class ProgressBar extends Widget {
		/**
		 * Get the current value
		 */
		getValue(): integer

		/**
		 * Set the current value
		 */
		setValue(value: number): void

		/**
		 * Set the maximum value, the bar will show a percentage result of the
		 * value when compared to the maximum.
		 *
		 * @param value
		 */
		setMaximum(value: integer): void
	}

	/**
	 * Similar to the PageView, the Tab view is perfect for progressively
	 * disclosing controls.
	 *
	 * @example
	 * const lab1 = new ui.Label("## Tab 1");
	 * lab1.setAlignment(1);
	 * const lab2 = new ui.Label("## Tab 2");
	 * lab2.setAlignment(1);
	 * const lab3 = new ui.Label("## Tab 3");
	 * lab3.setAlignment(1);
	 *
	 * const tabLayout1 = new ui.HLayout();
	 * tabLayout1.add(lab1);
	 * const tabLayout2 = new ui.HLayout();
	 * tabLayout2.add(lab2);
	 * const tabLayout3 = new ui.HLayout();
	 * tabLayout3.add(lab3);
	 *
	 * const tabView = new ui.TabView();
	 * tabView.add("One", tabLayout1);
	 * tabView.add("Two", tabLayout2);
	 * tabView.add("Three", tabLayout3);
	 *
	 * ui.add(tabView);
	 * ui.show();
	 */
	class TabView {
		/**
		 * Name the tab, and set the contents of the tab - which should be a
		 * layout
		 *
		 * @param label
		 * @param layout
		 */
		add(label: string, layout: Layouts): void

		/**
		 * Set the current tab index
		 *
		 * @param index
		 */
		setTab(index: integer): void

		/**
		 * Get the current tab index
		 */
		currentTab(): integer

		/**
		 * Get the total number of tabs
		 */
		tabCount(): integer
	}

	/**
	 * Draw custom shapes using `cavalry.Path`. Paths can be described by using
	 * the `paint` object (examples below).
	 *
	 * The `pathObject` is an object made from a `cavalry.Path()` object when
	 * calling `.toObject()`, for example:
	 *
	 * @example
	 * const path = new cavalry.Path();
	 * const paint = { color: "#4fac3c", stroke: true, strokeWidth: 5 };
	 * draw.addPath(path.toObject(), paint);
	 *
	 * @example
	 * // If you wish for a path to have a fill and a stroke, add the path via
	 * // `addPath()` twice, first with a fill paint object, and then with a stroke
	 * // object.
	 * // The paint object has keys for `color`, `stroke` (to determine if the paint
	 * // is a stroke or fill, it's fill by default), and `strokeWidth`. e.g:
	 * const examplePaint = { color: "#4ffd7a", stroke: true, strokeWidth: 4 }
	 *
	 * @example
	 * // A full example of the Draw Widget:
	 * ui.setTitle("Custom Draw");
	 * const draw = new ui.Draw();
	 * const size = 200;
	 * const margin = 2;
	 * draw.setSize(size, size);
	 * const bezierPath = new cavalry.Path();
	 * bezierPath.moveTo(0, margin);
	 * bezierPath.cubicTo(size * 0.6, 0.0, size * 0.4, size, size, size - margin);
	 * const bezierPaint = { color: "#4ffd7a", stroke: true, strokeWidth: margin * 2 };
	 * draw.addPath(bezierPath.toObject(), bezierPaint);
	 * const textPath = new cavalry.Path();
	 * textPath.addText("easeInOut", 24, 30, 10);
	 * const textPaint = { color: "#6437ff" }
	 * draw.addPath(textPath.toObject(), textPaint)
	 * draw.setBackgroundColor("#c8c8c8");
	 * const saveButton = ui.Button("Save Image");
	 * saveButton.onClick = () => {
	 *   // YOUR PATH HERE
	 *   draw.saveImage("/Path/To/TestSave.png")
	 * }
	 * const layout = ui.HLayout()
	 * layout.addStretch()
	 * layout.add(draw)
	 * layout.addStretch()
	 * ui.add(layout)
	 * ui.add(saveButton)
	 * ui.setMinimumHeight(240)
	 * ui.setMinimumWidth(220)
	 * ui.show()
	 */
	class Draw extends Widget {
		/**
		 * Adds a path to be drawn.
		 *
		 * @param pathObject
		 * @param paintInfo
		 */
		addPath(pathObject: cavalry.Path, paintInfo: object): void

		/**
		 * Erase all paths from the draw store.
		 */
		clearPaths(): void

		/**
		 * Ask for an update, use this if you update the paths once the UI has
		 * been created.
		 */
		redraw(): void

		/**
		 * Save the contents of the draw to the filesystem. Use width and height
		 * to scale the output to your desired size.
		 *
		 * @param filePath
		 * @param width
		 * @param height
		 */
		saveImage(filePath: string, width: integer, height: integer): boolean
	}

	/**
	 * A Container can be used to give a background to a layout and/or to make
	 * separate controls look like they're related. You can also use Containers
	 * to detect drag and drop events and respond to mouse events (e.g. trigger
	 * a context menu). See `addMenuItem` for more information on creating
	 * context menus.
	 *
	 * @example
	 * const prefix = new ui.Label("X1");
	 * prefix.setTextColor("#c8c8c8");
	 * const numeric = new ui.NumericField(100);
	 * const layout = new ui.HLayout();
	 * layout.add(prefix);
	 * layout.add(numeric);
	 * // Container can be used to compose layouts into 'widgets'
	 * // That way different elements can be designed to seem connected
	 * const container = new ui.Container();
	 * container.setBackgroundColor("#6437ff");
	 * container.setRadius(3,3,3,3);
	 * container.setSize(150,22);
	 * container.setLayout(layout);
	 * ui.setMargins(6, 6, 6, 6);
	 * ui.add(container);
	 * ui.show();
	 */
	class Container {
		/**
		 * Set the corner rounding of the Container.
		 *
		 * @param topLeft
		 * @param topRight
		 * @param bottomRight
		 * @param bottomLeft
		 */
		setRadius(
			topLeft: float,
			topRight: float,
			bottomRight: float,
			bottomLeft: float
		): void

		/**
		 * Set a layout for the container.
		 *
		 * @param layout Layout that the container will contain
		 */
		setLayout(layout: ui.VLayout | ui.HLayout): void
	}

	/**
	 * A vertical layout that can be used to create more complex UIs. Layouts
	 * can be nested so highly complex layouts are possible.
	 *
	 * @example
	 * // Create the ui elements
	 * const button1 = new ui.Button("Button");
	 * const input1 = new ui.NumericField(100);
	 * // Create the vertical layout.
	 * const vLayout1 = new ui.VLayout();
	 * vLayout1.add(input1);
	 * vLayout1.add(button1);
	 * ui.add(vLayout1);
	 * // Show the window
	 * ui.show()
	 */
	class VLayout {
		/**
		 * TODO: Description
		 *
		 * @param widget
		 */
		add(...widget: WidgetsOrLayouts[]): void

		/**
		 * TODO: Description
		 */
		addStretch(): void

		/**
		 * TODO: Description
		 *
		 * @param pixels
		 */
		addSpacing(pixels: integer): void

		/**
		 * Set the padding space between widgets in the layout. The default
		 * value is 3 pixels.
		 *
		 * @param space
		 */
		setSpaceBetween(space: integer): void

		/**
		 * Set the margins of the layout (how far from the edges the widgets can
		 * be). The default value is 3 pixels on all sides.
		 *
		 * @param left
		 * @param top
		 * @param right
		 * @param bottom
		 */
		setMargins(
			left: integer,
			top: integer,
			right: integer,
			bottom: integer
		): void

		/**
		 * Add a horizontal line with a title.
		 * @param label
		 */
		addSeparator(label: string): void

		/**
		 * Returns the number of items in the layout.
		 */
		itemCount(): integer

		/**
		 * Clear the Layout. All references to any added Widgets will be
		 * invalidated.
		 *
		 * @example
		 * // Clear layout example
		 * ui.setTitle("Clear Layout Demo");
		 * // Create a layout and add a label to it.
		 * const layout = new ui.VLayout();
		 * const label = new ui.Label("A label!");
		 * layout.add(label);
		 * // Create a button that clears the layout.
		 * const button = new ui.Button("Clear Layout");
		 * button.onClick = () => {
		 *   layout.clear();
		 * };
		 * // Create a button that adds the label.
		 * const button2 = new ui.Button("Add Label");
		 * button2.onClick = () => {
		 *   const label = new ui.Label("A label!");
		 *   layout.add(label);
		 * };
		 * // Create the UI
		 * ui.add(layout);
		 * ui.addStretch();
		 * ui.add(button);
		 * ui.add(button2);
		 * ui.show();
		 */
		clear(): void
	}

	/**
	 * A horizontal layout that can be used to create more complex UIs. Layouts
	 * can be nested so highly complex layouts are possible.
	 *
	 * @example
	 * // Create the ui elements
	 * const button1 = new ui.Button("Button");
	 * const input1 = new ui.NumericField(100);
	 * // Create the horizontal layout
	 * const hLayout1 = new ui.HLayout();
	 * hLayout1.add(input1);
	 * hLayout1.add(button1);
	 * ui.add(hLayout1);
	 * // Show the window
	 * ui.show()
	 *
	 * @example
	 * // Clear layout example
	 * ui.setTitle('Clear Layout Demo')
	 * // Create a layout and add a label to it.
	 * const layout = new ui.VLayout()
	 * const label = new ui.Label('A label!')
	 * layout.add(label)
	 * // Create a button that clears the layout.
	 * const button = new ui.Button('Clear Layout')
	 * button.onClick = () => {
	 * 	layout.clear()
	 * }
	 * // Create a button that adds the label.
	 * const button2 = new ui.Button('Add Label')
	 * button2.onClick = () => {
	 * 	const label = new ui.Label('A label!')
	 * 	layout.add(label)
	 * }
	 * // Create the UI
	 * ui.add(layout)
	 * ui.addStretch()
	 * ui.add(button)
	 * ui.add(button2)
	 * ui.show()
	 */

	class HLayout {
		/**
		 * TODO: Description
		 *
		 * @param widget
		 */
		add(...widget: WidgetsOrLayouts[]): void

		/**
		 * TODO: Description
		 */
		addStretch(): void

		/**
		 * TODO: Description
		 *
		 * @param pixels
		 */
		addSpacing(pixels: integer): void

		/**
		 * Set the padding space between widgets in the layout. The default
		 * value is 3 pixels.
		 *
		 * @param pixels
		 */
		setSpaceBetween(pixels: integer): void

		/**
		 * Set the margins of the layout (how far from the edges the widgets can
		 * be). The default value is 3 pixels on all sides.
		 *
		 * @param left
		 * @param top
		 * @param right
		 * @param bottom
		 */
		setMargins(
			left: integer,
			top: integer,
			right: integer,
			bottom: integer
		): void

		/**
		 * Returns the number of items in the layout.
		 */
		itemCount(): integer

		/**
		 * Clear the Layout. All references to any added Widgets will be
		 * invalidated.
		 */
		clear(): void
	}

	/**
	 * Similar to a TabView, a PageView allows a UI to have many 'pages' of
	 * layouts but only show one at a time. They are useful for linear journeys
	 * though pages of content - such as wizards and guides. Use forward and
	 * back buttons to enable paging through such a view.
	 *
	 * @example
	 * const lab1 = new ui.Label("## Page 1");
	 * lab1.setAlignment(1);
	 * const lab2 = new ui.Label("## Page 2");
	 * lab2.setAlignment(1);
	 * const lab3 = new ui.Label("## Page 3");
	 * lab3.setAlignment(1);
	 *
	 * const pageLayout1 = new ui.HLayout();
	 * pageLayout1.add(lab1);
	 * const pageLayout2 = new ui.HLayout();
	 * pageLayout2.add(lab2);
	 * const pageLayout3 = new ui.HLayout();
	 * pageLayout3.add(lab3);
	 *
	 * const pageView = new ui.PageView();
	 * pageView.add(pageLayout1);
	 * pageView.add(pageLayout2);
	 * pageView.add(pageLayout3);
	 * ui.add(pageView);
	 *
	 * const nextButton = new ui.Button("Next");
	 * const prevButton = new ui.Button("Previous");
	 * const hLay = new ui.HLayout();
	 * hLay.add(prevButton);
	 * hLay.add(nextButton);
	 *
	 * nextButton.onClick = () => {
	 *   pageView.setPage(pageView.currentPage() + 1);
	 * }
	 *
	 * prevButton.onClick = () => {
	 *   pageView.setPage(pageView.currentPage() - 1);
	 * }
	 *
	 * ui.add(hLay);
	 * ui.show();
	 */
	class PageView {
		/**
		 * Add a layout, this is the content of the page
		 *
		 * @param layout add a layout, this is the content of the page
		 */
		add(layout: Layouts): void

		/**
		 * Set the current page index
		 *
		 * @param index The index of the page (starting at 0)
		 */
		setPage(index: integer): void

		/**
		 * Get the current page index
		 */
		currentPage(): integer

		/**
		 * Get the previous page index
		 */
		previousPage(): integer

		/**
		 * Get the total number of pages
		 */
		pageCount(): integer
	}

	/**
	 * Control where scroll bars appear in a UI. Set a fixed size for a
	 * ScrollView and then when too many items are added, scroll bars will
	 * appear. It's generally a good idea to only restrict a ScrollView's size
	 * in one dimension (width or height).
	 *
	 * @example
	 * const label1 = new ui.Label("Hello");
	 * const label2 = new ui.Label("Hello Again");
	 * const label3 = new ui.Label("Hello Some More");
	 * const label4 = new ui.Label("Hello, are you still here?");
	 * const layout = new ui.HLayout();
	 * layout.add(label1, label2, label3, label4);
	 * //use a ScrollView to manually control where scroll bars should
	 * // go, you can set a fixed height etc.
	 * const scrollView = new ui.ScrollView();
	 * scrollView.setLayout(layout);
	 * ui.add(scrollView);
	 * ui.show();
	 */
	class ScrollView {
		/**
		 * Set the contents of the ScrollView.
		 *
		 * @param layout
		 */
		setLayout(layout: Layouts): void

		/**
		 * Set a fixed size for the ScrollView.
		 *
		 * @param width
		 * @param height
		 */
		setSize(width: integer, height: integer): void

		/**
		 * Set a fixed width for the ScrollView.
		 *
		 * @param width
		 */
		setFixedWidth(width: integer): void

		/**
		 * Set a fixed height for the ScrollView.
		 *
		 * @param height
		 */
		setFixedHeight(height: integer): void

		/**
		 * TODO: Description
		 */
		alwaysShowHorizontalScrollBar(): void

		/**
		 * TODO: Description
		 */
		alwaysShowVerticalScrollBar(): void
	}

	// ui.setTitle("Test Callbacks Script");

	// // Three labels that we'll set when the callbacks are hit
	// selLabel = new ui.Label("Waiting for selection message");
	// compLabel = new ui.Label("Waiting for Composition message");
	// sceneLabel = new ui.Label("Waiting for Scene message");
	// layerLabel = new ui.Label('Waiting for Layer message')

	// // The important thing about this object is the function names within it.
	// // As long as one of the callback functions is present the `addCallbackObject` function will take the object.
	// function Callbacks() {
	//     // This callback will be called whenever the scene selection changes
	//     this.onSelectionChanged = function () {
	//         selLabel.setText("Selection size: "+api.getSelection().length);
	//     }
	// This callback will be called whenever the attribute selection changes
	// this.onAttributeSelectionChanged = function () {
	// 	selLabel.setText(
	// 		'Attribute Selection Changed: ' + api.getSelectedAttributes().length
	// 	)
	// }
	// // This callback will be called whenever the keyframe selection changes
	// this.onKeySelectionChanged = function () {
	// 	// Please note api.getSelectedKeyframes() is also available.
	// 	selLabel.setText(
	// 		'Keyframe Selection Changed: ' + api.getSelectedKeyframeIds().length
	// 	)
	// }
	// // This callback will be called whenever the editable point selection changes
	// this.onPointSelectionChanged = function () {
	// 	selLabel.setText('Editable Point Selection Changed')
	// }
	// This callback will be called whenever a new composition is loaded
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
	// This callback will be called whenever an asset is added
	// this.onAssetAdded = function (layerId) {
	// 	layerLabel.setText('Asset added with id: ' + layerId)
	// }
	// // This callback will be called whenever an asset is removed
	// this.onAssetRemoved = function (layerId) {
	// 	layerLabel.setText('Asset removed with id: ' + layerId)
	// }
	// // This callback will be called whenever a layer is added
	// this.onLayerAdded = function (layerId) {
	// 	layerLabel.setText('Layer added with id: ' + layerId)
	// }
	// // This callback will be called whenever a layer is removed
	// this.onLayerRemoved = function (layerId) {
	// 	layerLabel.setText('Layer removed with id: ' + layerId)
	// }
	// // This callback will be called whenever JavaScript errors from an `exec` or `load` call
	// this.onJSError = function (error) {
	// 	console.log('Message from onJSError Callback: ' + error)
	// }
	// }
	// // Create the callback object
	// var callbackObj = new Callbacks();
	// // build the UI
	// ui.add(selLabel);
	// ui.add(compLabel);
	// ui.add(sceneLabel);
	// ui.add(layerLabel)
	// ui.addStretch();
	// // Add a callback object (you can have several if you're that way inclined)
	// ui.addCallbackObject(callbackObj);
	// // Show the window
	// ui.show();
}
