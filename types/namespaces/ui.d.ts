declare namespace ui {
  /**
   * Add a widget to the default layout. Multiple comma separated items can be added at once.
   */
  function add(...widgets: object[]): void;
  /**
   * Show the script window.
   */
  function show(): void;
  /**
   * Set the script window title.
   * @example
   * ui.setTitle('Print Selection Script')
   * ui.show()
   */
  function setTitle(title: string): void;
  /**
   * Set the script window's background color.
   * @example
   * ui.setBackgroundColor('#7a7a7a')
   * //ui.setBackgroundColor("red");
   * ui.show()
   */
  function setBackgroundColor(color: string): void;
  /**
   * Add stretch to the default layout. Adding stretch will push widgets to the other side of the layout.
   */
  function addStretch(): void;
  /**
   * Add some fixed spacing to the default layout.
   */
  function addSpacing(spacing: number): void;
  /**
   * Set the amount of spacing automatically added between each item added to the default layout. The default is 3 pixels.
   * @example
   * // Ensure no space is added between widgets when they are added to the default layout
   * ui.setSpaceBetween(0)
   */
  function setSpaceBetween(spacing: number): void;
  /**
   * Set the margins of the default layout (how far from the edges the widgets can be). The default value is 3 pixels on all sides.
   * @example
   * // Remove all margins from the default layout
   * ui.setMargins(0, 0, 0, 0)
   */
  function setMargins(
    left: number,
    top: number,
    right: number,
    bottom: number,
  ): void;
  /**
   * The path to the folder which contains this script. This is blank for UIs created from the JavaScript Editor.
   * @example
   * var button = new ui.ImageButton(ui.scriptLocation + '/myScript_assets/icon.png')
   */
  const scriptLocation: void;
  /**
   * Register a callback object with the script. See the details below in the [Application Callbacks](#application-callbacks) section.
   * @example
   * function Callbacks() {
   * 	// This callback will be called whenever the scene selection changes
   * 	this.onSelectionChanged = function () {
   * 		console.log('Selection Changed')
   * 	}
   * }
   *
   * // Create the callback object
   * var callbackObj = new Callbacks()
   *
   * // Add a callback object (you can have several if you're that way inclined)
   * ui.addCallbackObject(callbackObj)
   */
  function addCallbackObject(callback: unknown): void;
  /**
   * Tells the window that it's a toolbar, it will not include a docking tab.
   * @example
   * ui.setToolbar()
   * //32px for Icon, 12px for Window Title
   * ui.setFixedHeight(44)
   *
   * var layout = new ui.HLayout()
   *
   * var button = new ui.ImageButton(`${api.getAppAssetsPath()}/icons/shelf_Cel.png`)
   * button.setImageSize(32, 32)
   *
   * var button2 = new ui.ImageButton(
   * 	`${api.getAppAssetsPath()}/icons/shelf_Extrude.png`,
   * )
   * button2.setImageSize(32, 32)
   *
   * var button3 = new ui.ImageButton(
   * 	`${api.getAppAssetsPath()}/icons/shelf_LayoutGrid.png`,
   * )
   * button3.setImageSize(32, 32)
   *
   * layout.add(button, button2, button3)
   * layout.addStretch()
   *
   * ui.add(layout)
   * ui.show()
   */
  function setToolbar(): void;
  /**
   * Tells a toolbar window to expect a vertical layout, it will not include a docking tab.
   * @example
   * ui.setToolbar()
   * ui.setVerticalToolbar()
   * ui.setFixedWidth(44)
   *
   * var layout = new ui.VLayout()
   *
   * var button = new ui.ImageButton(`${api.getAppAssetsPath()}/icons/shelf_Cel.png`)
   * button.setImageSize(32, 32)
   *
   * var button2 = new ui.ImageButton(
   * 	`${api.getAppAssetsPath()}/icons/shelf_Extrude.png`,
   * )
   * button2.setImageSize(32, 32)
   *
   * var button3 = new ui.ImageButton(
   * 	`${api.getAppAssetsPath()}/icons/shelf_LayoutGrid.png`,
   * )
   * button3.setImageSize(32, 32)
   *
   * layout.add(button, button2, button3)
   * layout.addStretch()
   *
   * ui.add(layout)
   * ui.show()
   */
  function setVerticalToolbar(): void;
  /**
   * Set a minimum width for a UI window. ⚠️ Specifying a value could break a layout when docking a window.
   * @example
   * ui.setMinimumWidth(200)
   * ui.show()
   */
  function setMinimumWidth(width: number): void;
  /**
   * Set a minimum height for a UI window. ⚠️ Specifying a value could break a layout when docking a window.
   * @example
   * ui.setMinimumHeight(200)
   * ui.show()
   */
  function setMinimumHeight(height: number): void;
  /**
   * Set a maximum width for a UI window. ⚠️ Specifying a value could break a layout when docking a window.
   * @example
   * ui.setMaximumWidth(200)
   * ui.show()
   */
  function setMaximumWidth(width: number): void;
  /**
   * Set a maximum height for a UI window. ⚠️ Specifying a value could break a layout when docking a window.
   * @example
   * ui.setMaximumHeight(200)
   * ui.show()
   */
  function setMaximumHeight(height: number): void;
  /**
   * Set a fixed width for a UI window. ⚠️ Specifying a value could break a layout when docking a window.
   * @example
   * ui.setFixedWidth(200)
   * ui.show()
   */
  function setFixedWidth(width: number): void;
  /**
   * Set a fixed height for a UI window. ⚠️ Specifying a value could break a layout when docking a window.
   * @example
   * ui.setFixedHeight(200)
   * ui.show()
   */
  function setFixedHeight(height: number): void;
  /**
   * Set a fixed width and height for a UI window. ⚠️ Specifying a value could break a layout when docking a window.
   * @example
   * ui.setFixedSize(400, 200)
   * ui.show()
   */
  function setFixedSize(width: number, height: number): void;
  /**
   * Gets the default width for a numeric field.
   */
  const fieldWidth: number;
  /**
   * Gets the default height for a numeric field.
   */
  const fieldHeight: number;
  /**
   * Returns the size of the window.
   */
  function size(): unknown;
  /**
	* UI windows support drag and drop functionality. The [Container](#container) Widget can also be used to create multiple, distinct (noncontiguous) drag and drop areas within the same UI window – meaning the event will only occur within the Container rather than the entire UI window. At least one `MIME type` for the UI window to accept **must** be registered. To register multiple MIME types, add each on a separate line.

Valid `MIME type` values are:

* `layerIds` // Accepts a Layer(s). Returns `{"layerIds":[layerId:string]}`
* `assetIds` // Accepts an Asset(s) from the Assets Window. Returns `{"assetIds":[assetId:string]}`
* `url` // Accepts a file or web URL. Returns `{"text":URL:string,"url":URL:string}`
* `color` // Accepts a color swatch. Returns `{"colorHexA":hexA:string,"colorHex":hex:string}`
* `text` // Accepts a string. Returns `{"text":text:string}`
	*/
  function registerDragDropMimeType(mimeType: string): void;
  /**
   * fire when the drag event enters the UI window/Container
   */
  let onDragEnter: () => void;
  /**
   * fire when the drag event leaves the UI window/Container
   */
  let onDragLeave: () => void;
  /**
   * fire when the drop event occurs
   */
  let onDrop: (info: unknown) => void;
  /**
   * clear and re-populate the UI context menu
   */
  let onContextMenuAboutToShow: () => void;
  /**
   * fire when the window resizes
   */
  let onResize: () => void;
  /**
   * Run UI Scripts from within other UI Scripts.
   * @example
   * // create a button
   * var button = new ui.Button('Run Script')
   * // set the onClick callback function
   * button.onClick = function () {
   * 	ui.runFileScript('/Path/To/Script.js')
   * }
   * // add the button to the layout
   * ui.add(button)
   * // show the window
   * ui.show()
   */
  function runFileScript(filePath: string): void;
  /**
	* Add a new context (right click) menu item to a UI window or Container.

The object contains the following properties:

* `name:string` // The menu item text. If the name is empty (i.e. ""), a separator will be added.
* `enabled:bool` // This is optional. Set this to false to disable the context menu item.
* `onMouseRelease:function` // this is a callback function. Set a function on this property and it will be called when the menu item is clicked.
* `icon:string` // an optional path to an icon for the menu item.
	* @example
	* // Context Menu example
	* var label = new ui.Label('Right click in here')
	* var layout = new ui.HLayout()
	* layout.addStretch()
	* layout.add(label)
	* layout.addStretch()
	* 
	* var firstMenuItem = {
	* 	name: 'Item One',
	* 	onMouseRelease: function () {
	* 		return console.log('Clicked ' + firstMenuItem.name)
	* 	},
	* 	icon: `${api.getAppAssetsPath()}/icons/load.png`,
	* }
	* 
	* var separatorItem = {
	* 	name: '',
	* }
	* 
	* var secondMenuItem = {
	* 	name: 'Item Two',
	* 	onMouseRelease: function () {
	* 		return console.log('Clicked ' + secondMenuItem.name)
	* 	},
	* }
	* 
	* var thirdMenuItem = {
	* 	name: 'Item Three',
	* 	onMouseRelease: function () {
	* 		return console.log('Clicked ' + thirdMenuItem.name)
	* 	},
	* 	enabled: false,
	* }
	* 
	* ui.addMenuItem(firstMenuItem)
	* ui.addMenuItem(separatorItem)
	* ui.addMenuItem(secondMenuItem)
	* ui.addMenuItem(thirdMenuItem)
	* ui.showContextMenuOnRightClick()
	* 
	* ui.setMargins(6, 6, 6, 6)
	* ui.add(layout)
	* ui.show()
	* @example
	* // Context Menu example including a showContextMenu() function
	* var label = new ui.Label('Right click in here')
	* var layout = new ui.HLayout()
	* layout.addStretch()
	* layout.add(label)
	* layout.addStretch()
	* 
	* var container = new ui.Container()
	* container.setBackgroundColor('#1755a6')
	* container.setRadius(3, 3, 3, 3)
	* container.setLayout(layout)
	* 
	* var firstMenuItem = {
	* 	name: 'Item One',
	* 	onMouseRelease: function () {
	* 		return console.log('Clicked ' + firstMenuItem.name)
	* 	},
	* 	icon: `${api.getAppAssetsPath()}/icons/load.png`,
	* }
	* 
	* var separatorItem = {
	* 	name: '',
	* }
	* 
	* var secondMenuItem = {
	* 	name: 'Item Two',
	* 	onMouseRelease: function () {
	* 		return console.log('Clicked ' + secondMenuItem.name)
	* 	},
	* }
	* 
	* var thirdMenuItem = {
	* 	name: 'Item Three',
	* 	onMouseRelease: function () {
	* 		return console.log('Clicked ' + thirdMenuItem.name)
	* 	},
	* 	enabled: false,
	* }
	* 
	* ui.addMenuItem(firstMenuItem)
	* ui.addMenuItem(separatorItem)
	* ui.addMenuItem(secondMenuItem)
	* ui.addMenuItem(thirdMenuItem)
	* 
	* container.onMousePress = function (position, button) {
	* 	if (button == 'right') {
	* 		ui.showContextMenu()
	* 	}
	* }
	* 
	* ui.setMargins(6, 6, 6, 6)
	* ui.add(container)
	* ui.show()
	*/
  function addMenuItem(object: unknown): void;
  /**
	* Add a new sub menu item to a context menu item. A menu object must be created, populated and then added to the Menu Item via the addSubMenu function with a new [Menu](#menu) class. See example below.

See [addMenuItem](#addmenuitem) for object property descriptions.
	* @example
	* // Context Menu with sub-menu example
	* var label = new ui.Label('Right click in here')
	* var layout = new ui.HLayout()
	* layout.addStretch()
	* layout.add(label)
	* layout.addStretch()
	* 
	* var container = new ui.Container()
	* container.setBackgroundColor('#1755a6')
	* container.setRadius(3, 3, 3, 3)
	* container.setLayout(layout)
	* 
	* var firstMenuItem = {
	* 	name: 'Item One',
	* 	onMouseRelease: function () {
	* 		return console.log('Clicked ' + firstMenuItem.name)
	* 	},
	* 	icon: `${api.getAppAssetsPath()}/icons/load.png`,
	* }
	* 
	* var separatorItem = {
	* 	name: '',
	* }
	* 
	* var secondMenuItem = {
	* 	name: 'Item Two',
	* 	onMouseRelease: function () {
	* 		return console.log('Clicked ' + secondMenuItem.name)
	* 	},
	* }
	* 
	* var thirdMenuItem = {
	* 	name: 'Item Three',
	* 	onMouseRelease: function () {
	* 		return console.log('Clicked ' + thirdMenuItem.name)
	* 	},
	* 	enabled: false,
	* }
	* 
	* ui.addMenuItem(firstMenuItem)
	* ui.addMenuItem(separatorItem)
	* ui.addMenuItem(secondMenuItem)
	* ui.addMenuItem(thirdMenuItem)
	* 
	* var subMenu = new ui.Menu('Sub-Menu')
	* var subOne = {
	* 	name: 'Sub One',
	* }
	* var subTwo = {
	* 	name: 'Sub Two',
	* }
	* subMenu.addMenuItem(subOne)
	* subMenu.addMenuItem(subTwo)
	* ui.addSubMenu(subMenu)
	* 
	* container.onMousePress = function (position, button) {
	* 	if (button == 'right') {
	* 		ui.showContextMenu()
	* 	}
	* }
	* 
	* ui.setMargins(6, 6, 6, 6)
	* ui.add(container)
	* ui.show()
	*/
  function addSubMenu(object: unknown): void;
  /**
   * Automatically show the context menu at the mouse location when right clicking in the window.
   * @example
   * ui.showContextMenuOnRightClick()
   *
   * ui.addMenuItem({
   * 	name: 'Item',
   * 	onMouseRelease: function () {
   * 		return console.log('Clicked')
   * 	},
   * 	enabled: true,
   * })
   *
   * ui.show()
   */
  function showContextMenuOnRightClick(): void;
  /**
   * Show the context at the mouse location. Use this to show menus on left click.
   */
  function showContextMenu(): void;
  /**
   * Clear the context menu. This can be used to update context menu items.
   */
  function clearContextMenu(): void;
  /**
   * A callback function that can be used to perform actions (e.g. remove temporary files) when closing the ui Window.
   * @example
   * ui.onClose = function () {
   * 	console.log('About to close')
   * }
   * ui.show()
   */
  let onClose: () => void;
  /**
	* Returns a hex string for a color label from the UI theme. Note - this will not provide all the colors in the UI as some UI elements 'anchor' off these colours to create darker/lighter variations as needed.

Possible color labels are: `AppBackground`, `Window`, `Base`, `AlternateBase`, `Text`, `Highlight`, `Midlight`, `Shadow`, `Dark`, `Mid`, `Light`, `Accent1`, `Accent2`, `Accent3`, `Accent4` and `Accent5`.
	* @example
	* console.log(ui.getThemeColor('Window'))
	* ui.show()
	*/
  function getThemeColor(colorName: string): string;
  /**
   * Returns the chosen folder path or empty if the user presses cancel from the dialog box.
   */
  function chooseFolderPath(startFilePath: string): string;
  /**
   * Returns the chosen file path to create or empty if the user presses cancel from the dialog box. The file filter string should follow the format "Palettes (\_.pal \_.ase \*.theme)"
   * @example
   * var filePath = ui.chooseFileToSave(api.getRenderPath(), 'PNG (*.png)')
   * if (!filePath) {
   * 	return
   * }
   * api.renderPNGFrame(filePath, 100)
   */
  function chooseFileToSave(startFilePath: string, fileFilter: string): string;
  /**
   * Return the chosen file path. This is empty if the User presses 'Cancel' from the dialog box. The file filter string should follow the format "Palettes (\_.pal \_.ase \*.theme)".
   */
  function chooseFileToOpen(startFilePath: string, fileFilter: string): string;
  /**
   * Open a file browser to open a Cavalry scene (.cv).
   */
  function openSceneDialog(): void;
  /**
   * This can be used to temporarily disable UI callbacks.
   */
  function setCallbacksActive(active: boolean): void;
  /**
   *
   */
  class Widget {
    /** enable/disable the widget */
    setEnabled(state: boolean): void;
    /** check if a widget is enabled */
    isEnabled(): boolean;
    /** hide a widget */
    setHidden(state: boolean): void;
    /** check if a widget is hidden */
    isHidden(): boolean;
    /** set the size of a widget */
    setSize(width: number, height: number): void;
    /** set a fixed width for the widget */
    setFixedWidth(width: number): void;
    /** set a fixed height for the widget */
    setFixedHeight(height: number): void;
    /** set a minimum height for the widget */
    setMinimumHeight(height: number): void;
    /** set a maximum height for the widget */
    setMaximumHeight(height: number): void;
    /** set a minimum width for the widget */
    setMinimumWidth(width: number): void;
    /** set a maximum width for the widget */
    setMaximumWidth(width: number): void;
    /** set a tooltip for the widget */
    setToolTip(tooltip: string): void;
    /** set the background color for the widget */
    setBackgroundColor(hex: string): void;
    /** returns a unique identifier for the widget */
    getUUID(): void;
    /** return a widget's geometry in Global coordinates. This can be useful to anchor a popover  to a widget. */
    geometry(): {
      x: number;
      y: number;
      width: number;
      height: number;
      centre: { x: number; y: number };
      left: number;
      right: number;
      top: number;
      bottom: number;
    };
    /** set corner rounding for a widget */
    setCornerRounding(radius: number): void;
    /** set the distance from the edges of the widget that content is allowed to be placed */
    setContentsMargins(
      left: number,
      top: number,
      right: number,
      bottom: number,
    ): void;
    /** set to true to make a widget see-through for mouse events */
    setTransparentForMouseEvents(transparent?: boolean): void;
  }
  /**
   * Create a button.
   * @example
   * // create a button
   * var button = new ui.Button('Click me!')
   * // set the onClick callback function
   * button.onClick = function () {
   * 	console.log('Button was clicked')
   * }
   * // add the button to the layout
   * ui.add(button)
   * // show the window
   * ui.show()
   */
  class Button extends Widget {
    constructor(buttonText: string);
    /** set the button text. */
    setText(buttonText: string): void;
    /**  */
    setFontSize(pixelSize: number): void;
    /** path to an image (relative paths can be built using the ui.scriptLocation property). */
    setImage(path: string): void;
    /**  */
    setImageSize(width: number, height: number): void;
    /** by default buttons have a stroke affordance, this can be removed by calling this method with false. */
    setDrawStroke(state: boolean): void;
    /** sets the space before the icon */
    setSpacing(spacing: number): void;
    /** a callback function that will be called when the button is clicked. */
    onClick: () => void;
  }
  /**
   * A standard checkbox widget. This doesn't contain a label so combining it with a [Label](#label) is highly recommended. You set the default value when you create the class.
   * @example
   * // create a Checkbox
   * var cb = new ui.Checkbox(false)
   * // set the onValueChanged callback function
   * cb.onValueChanged = function () {
   * 	console.log('Checkbox toggled, new value is: ' + cb.getValue())
   * }
   * // add the checkbox to a layout with a label
   * var label = new ui.Label('Super Amazing Checkbox Demo')
   * var horizontalLayout = new ui.HLayout()
   * horizontalLayout.add(label)
   * horizontalLayout.add(cb)
   * // Add the layout to the window
   * ui.add(horizontalLayout)
   * // show the window
   * ui.show()
   */
  class Checkbox extends Widget {
    constructor(state: boolean);
    /**  */
    getValue(): boolean;
    /**  */
    setValue(state: boolean): void;
    /** assign a function to this variable to be called when the widget's state is changed. */
    onValueChanged: () => void;
  }
  /**
   * A color picker widget. Double clicking will automatically load the Color Editor. The colours returned and set are all hex values – the utilities in the [Cavalry Module](./cavalry-module.mdx) can be used to help with conversions.
   * @example
   * var colorChip = new ui.ColorChip()
   * colorChip.setAcceptsDrops(true)
   * colorChip.setSize(100, 18)
   * colorChip.setColor('#f2bf5e')
   * ui.add(colorChip)
   * ui.show()
   */
  class ColorChip extends Widget {
    /**  */
    getColor(): string;
    /**  */
    getColorWithAlpha(): string;
    /**  */
    setColor(hex: string): void;
    /** when true, dragging a dropping colors dragged allow dragging */
    setAcceptsDrops(accepts: boolean): void;
    /** assign a function to this variable to be called when the widget's color is changed. */
    onValueChanged: () => void;
  }
  /**
	* A widget that can be used to display multiple colours at once, it's useful for creating scripts that deal with color workflows. This is a feedback widget in that users cannot directly interact with it. The `setColors` function is not fussy about the `#` prefix on the hex color strings (if the hash is missing it will be added automatically).

This example demos a simple Color Palette generator script.
	* @example
	* // The number of colors our palette generator will create
	* var numColors = 10
	* // Create a color palette object
	* var colorPalette = new ui.ColorPalette()
	* // Create a color chip object
	* var colorChip = new ui.ColorChip()
	* 
	* // Set our initial color
	* colorChip.setColor('#099789')
	* 
	* // A simple and fairly dumb function that generates some color shades for our palette
	* // There's no error checking (e.g for values above 1 or below 0).
	* colorChip.getShades = function (color) {
	* 	let outColors = []
	* 	// Convert hex colours to HSV
	* 	let hsv = cavalry.hexToHsv(color)
	* 	let step = 0.3 / numColors
	* 	let startingValue = hsv.v - step * (numColors * 0.5)
	* 	for (let i = 0; i < numColors; i += 1) {
	* 		hsv.v = startingValue + step * i
	* 		outColors.push(cavalry.hsvToHex(hsv.h, hsv.s, hsv.v))
	* 	}
	* 	return outColors
	* }
	* 
	* // Update the color palette when the color from the color chip is changed
	* colorChip.onValueChanged = function () {
	* 	colorPalette.setColors(colorChip.getShades(colorChip.getColor()))
	* }
	* 
	* // Set the initial palette
	* colorPalette.setColors(colorChip.getShades(colorChip.getColor()))
	* 
	* // Create a layout for the color chip that includes a label
	* var label = new ui.Label('Main Color')
	* var hLayout = new ui.HLayout()
	* hLayout.add(label)
	* hLayout.add(colorChip)
	* 
	* ui.add(hLayout)
	* ui.add(colorPalette)
	* 
	* // Create a button that will generate our color array based on the palette
	* var button = new ui.Button('Create Color Array')
	* button.onClick = function () {
	* 	// Create a color array
	* 	let colorId = api.create('colorArray', 'My Color Array')
	* 	// By default all arrays get an entry, let's remove it so we start from a clean slate.
	* 	api.removeArrayIndex(colorId, 'array.0')
	* 	// Get the colours from the color palette
	* 	let colours = colorPalette.getColors()
	* 	for (let color of colours) {
	* 		// Add a new attribute to our colorArray, the index of the new array attribute is returned
	* 		let index = api.addArrayIndex(colorId, 'array')
	* 		// To set an object name from a variable we need to use bracket notation i.e []
	* 		api.set(colorId, { ['array.' + index]: color })
	* 	}
	* }
	* ui.add(button)
	* 
	* // Show the window
	* ui.show()
	*/
  class ColorPalette extends Widget {
    /**  */
    getColors(): string[];
    /** Set the colours to be used by the palette widget. */
    setColors(hex: string[]): void;
  }
  /**
   * An eye dropper button you can use to pick colours from the screen.
   * @example
   * var picker = new ui.ColorPicker()
   * picker.onColorChanged = function () {
   * 	console.log(picker.getColor())
   * }
   * picker.onColorAccepted = function () {
   * 	console.log('Final color: ' + picker.getColor())
   * }
   *
   * ui.add(picker)
   * ui.show()
   */
  class ColorPicker extends Widget {
    /** returns the color value as a hex string. */
    getColor(): string;
    /**  */
    onColorChanged: () => void;
    /**  */
    onColorAccepted: () => void;
  }
  /**
   * A color wheel.
   * @example
   * var colorWheel = new ui.ColorWheel()
   * colorWheel.onColorChanged = function () {
   * 	console.log(colorWheel.getColor())
   * }
   *
   * ui.add(colorWheel)
   * ui.show()
   */
  class ColorWheel extends Widget {
    /** returns the color value as a hex string. */
    getColor(): string;
    /** set a hex string to be the current color */
    setColor(hex: string): void;
    /**  */
    onColorChanged: () => void;
  }
  /**
   * A Container can be used in several scenarios such as:
   * @example
   * var prefix = new ui.Label('X1')
   * prefix.setTextColor('#c8c8c8')
   * var numeric = new ui.NumericField(100)
   * var layout = new ui.HLayout()
   * layout.add(prefix)
   * layout.add(numeric)
   *
   * // Container can be used to compose layouts into 'widgets'
   * // That way different elements can be designed to seem connected
   * var container = new ui.Container()
   * container.setBackgroundColor('#6437ff')
   * container.setRadius(3, 3, 3, 3)
   * container.setSize(150, 22)
   * container.setLayout(layout)
   *
   * ui.setMargins(6, 6, 6, 6)
   * ui.add(container)
   * ui.show()
   * @example
   * // Using mouse click events
   * ui.setTitle('Flow Layout')
   *
   * var flowLayout = new ui.FlowLayout(2, 2)
   * flowLayout.setSpaceBetween(3)
   * flowLayout.setMargins(2, 2, 2, 2)
   *
   * for (let step = 0; step < 25; step++) {
   * 	let container = new ui.Container()
   * 	container.setSize(60, 60)
   * 	container.setBackgroundColor('#4ffd7a')
   * 	container.setRadius(3, 3, 3, 3)
   * 	container.onMousePress = function (position, button) {
   * 		container.setBackgroundColor('#c8c8c8')
   * 	}
   * 	flowLayout.add(container)
   * }
   *
   * ui.add(flowLayout)
   * ui.show()
   * @example
   * // Drag and drop example using Containers
   * function createLayout() {
   * 	const label = new ui.Label('Drag and drop a color swatch')
   * 	const layout = new ui.HLayout()
   * 	layout.addStretch()
   * 	layout.add(label)
   * 	layout.addStretch()
   * 	return layout
   * }
   *
   * var topContainer = new ui.Container()
   * topContainer.setBackgroundColor('#1755a6')
   * topContainer.setRadius(3, 3, 3, 3)
   * topContainer.setLayout(createLayout())
   *
   * topContainer.registerDragDropMimeType('color')
   * topContainer.onDragEnter = function () {
   * 	topContainer.setBorder('#9e9e9e', '2', '5', '5')
   * }
   * topContainer.onDragLeave = function () {
   * 	topContainer.setBorder()
   * }
   * topContainer.onDrop = function (dropInfo) {
   * 	topContainer.setBackgroundColor(dropInfo['colorHex'])
   * 	topContainer.setBorder()
   * }
   *
   * var bottomContainer = new ui.Container()
   * bottomContainer.setBackgroundColor('#6838c0')
   * bottomContainer.setRadius(3, 3, 3, 3)
   * bottomContainer.setLayout(createLayout())
   *
   * bottomContainer.registerDragDropMimeType('color')
   * bottomContainer.onDragEnter = function () {
   * 	bottomContainer.setBorder('#9e9e9e', '2', '5', '5')
   * }
   * bottomContainer.onDragLeave = function () {
   * 	bottomContainer.setBorder()
   * }
   * bottomContainer.onDrop = function (dropInfo) {
   * 	bottomContainer.setBackgroundColor(dropInfo['colorHex'])
   * 	bottomContainer.setBorder()
   * }
   *
   * ui.setMargins(6, 6, 6, 6)
   * ui.add(topContainer)
   * ui.add(bottomContainer)
   * ui.show()
   * @example
   * // Loading a Container as a secondary window
   * var label = new ui.Label('Congratulations!')
   * var layout = new ui.HLayout()
   * layout.addStretch()
   * layout.add(label)
   * layout.addStretch()
   *
   * var container = new ui.Container()
   * container.setMinimumWidth(200)
   * container.setMinimumHeight(200)
   * container.setBackgroundColor('#6437ff')
   * container.setRadius(3, 3, 3, 3)
   * container.setLayout(layout)
   *
   * var openButton = new ui.Button('Show Container Window')
   *
   * openButton.onClick = function () {
   * 	container.show()
   * }
   *
   * var closeButton = new ui.Button('Close Container Window')
   * closeButton.onClick = function () {
   * 	container.close()
   * }
   *
   * ui.add(openButton)
   * ui.add(closeButton)
   *
   * ui.show()
   * @example
   * // Loading a Container as a Popover
   * var label = new ui.Label('Congratulations!')
   * var layout = new ui.HLayout()
   * layout.addStretch()
   * layout.add(label)
   * layout.addStretch()
   *
   * var container = new ui.Container()
   * container.setMinimumWidth(200)
   * container.setMinimumHeight(200)
   * container.setBackgroundColor('#6437ff')
   * container.setRadius(3, 3, 3, 3)
   * container.setLayout(layout)
   *
   * var openButton = new ui.Button('Show Popover Window')
   *
   * openButton.onClick = function () {
   * 	let geo = openButton.geometry()
   * 	container.setPreferredPopoverSide(0)
   * 	container.showAsPopover(geo.left, geo.centre.y)
   * }
   *
   * ui.add(openButton)
   *
   * ui.show()
   */
  class Container extends Widget {
    /** set the corner rounding of the Container. */
    setRadius(
      topLeft: number,
      topRight: number,
      btmRight: number,
      btmLeft: number,
    ): void;
    /** set a layout for the container. */
    setLayout(layout: unknown): void;
    /** if set to true, mouseMoveEvents will fire even when the mouse isn't pressed. */
    useHoverEvents(use: boolean): void;
    /** dashWidth and dashGap are optional. The color argument is a hex colour string. A border can be removed by calling setBorder(). */
    setBorder(
      color: string,
      width: number,
      dashWidth?: number,
      dashGap?: number,
    ): void;
    /** can be be used to launch a Container as a secondary window. */
    show(): void;
    /** close a Container opened via show(). */
    close(): void;
    /** will offset the secondary window by the given coordinates (relative to the parent window). */
    move(x: number, y: number): void;
    /** shows the Container as a popover at the given location. */
    showAsPopover(x: number, y: number): void;
    /** determine in which direction a popover should appear. */
    setPreferredPopoverSide(side: number): void;
    /** fire when the mouse is pressed */
    onMousePress: (position: { x: number; y: number }, button: string) => void;
    /** fire when the mouse is released */
    onMouseRelease: (
      position: { x: number; y: number },
      button: string,
    ) => void;
    /** fire when the mouse is double clicked */
    onMouseDoubleClick: (
      position: { x: number; y: number },
      button: string,
    ) => void;
    /** only fires when the mouse is pressed unless useHoverEvents is true */
    onMouseMove: (position: { x: number; y: number }) => void;
    /** fire when the mouse enters the Container */
    onMouseEnter: () => void;
    /** fire when the mouse leaves the Container */
    onMouseLeave: () => void;
    /** fire when the drag event enters the Container. See  for more information. */
    onDragEnter: () => void;
    /** fire when the drag event leaves the Container. See  for more information. */
    onDragLeave: () => void;
    /** fire when the drop event occurs. See  for more information. */
    onDrop: (info: unknown) => void;
  }
  /**
	* Draw custom shapes via [cavalry.Path](./cavalry-module.mdx#path-class).
Paths can be described by using the `paint` object (examples below).

Possible values for `button` are:

The `pathObject` is an object made from a `cavalry.Path()` object when calling `.toObject()`, for example:

If you wish for a path to have a fill and a stroke, add the path via `addPath()` twice, first with a fill paint object, and then with a stroke object.
The paint object has keys for `color`, `stroke` (to determine if the paint is a stroke or fill, it's fill by default), and `strokeWidth`. e.g:
	* @example
	* var path = new cavalry.Path()
	* var paint = { color: '#4fac3c', stroke: true, strokeWidth: 5 }
	* draw.addPath(path.toObject(), paint)
	* @example
	* // Create a stroke paint
	* var examplePaint = { color: '#4ffd7a', stroke: true, strokeWidth: 4 }
	* @example
	* // A full example of the Draw Widget
	* ui.setTitle('Custom Draw')
	* var draw = new ui.Draw()
	* var size = 200
	* var margin = 2
	* draw.setSize(size, size)
	* 
	* var bezierPath = new cavalry.Path()
	* bezierPath.moveTo(0, margin)
	* bezierPath.cubicTo(size * 0.6, 0.0, size * 0.4, size, size, size - margin)
	* var bezierPaint = { color: '#4ffd7a', stroke: true, strokeWidth: margin * 2 }
	* draw.addPath(bezierPath.toObject(), bezierPaint)
	* 
	* var textPath = new cavalry.Path()
	* textPath.addText('easeInOut', 24, 30, 10)
	* var textPaint = { color: '#6437ff' }
	* draw.addPath(textPath.toObject(), textPaint)
	* 
	* draw.setBackgroundColor('#c8c8c8')
	* 
	* var saveButton = ui.Button('Save Image')
	* saveButton.onClick = function () {
	* 	// YOUR PATH HERE
	* 	draw.saveImage('/Path/To/TestSave.png', 300, 300)
	* }
	* 
	* var layout = ui.HLayout()
	* layout.addStretch()
	* layout.add(draw)
	* layout.addStretch()
	* ui.add(layout)
	* ui.add(saveButton)
	* ui.setMinimumHeight(240)
	* ui.setMinimumWidth(220)
	* ui.show()
	* @example
	* // Draw example using interactivity
	* ui.setTitle('Click and Drag')
	* var draw = new ui.Draw()
	* var size = 200
	* var margin = 2
	* draw.setSize(size, size)
	* 
	* //enable this line to have the circle follow the mouse even when the mouse isn't pressed
	* //draw.useHoverEvents(true);
	* 
	* draw.onMousePress = function (position, button) {
	* 	if (button == 'left') {
	* 		mouseDraw(position)
	* 	}
	* }
	* 
	* draw.onMouseRelease = function (position, button) {
	* 	console.log(
	* 		`Release, x: ${position.x}, y: ${position.y}, button: ${button}`,
	* 	)
	* }
	* 
	* draw.onMouseDoubleClick = function (position, button) {
	* 	console.log(
	* 		`Double Click, x: ${position.x}, y: ${position.y}, button: ${button}`,
	* 	)
	* }
	* 
	* draw.onMouseMove = function (position) {
	* 	mouseDraw(position)
	* }
	* 
	* function commonDraw() {
	* 	var textPath = new cavalry.Path()
	* 	textPath.addText('Click and drag!', 22, 0, 10)
	* 
	* 	/// centre the text in the window, size is declared above
	* 	let bbox = textPath.boundingBox()
	* 	textPath.translate((size - bbox.width) / 2, 0)
	* 
	* 	let textPaint = { color: '#6437ff' }
	* 	draw.addPath(textPath.toObject(), textPaint)
	* }
	* 
	* function mouseDraw(position) {
	* 	draw.clearPaths()
	* 
	* 	commonDraw()
	* 
	* 	var mousePath = new cavalry.Path()
	* 	mousePath.addEllipse(position.x, position.y, 5, 5)
	* 	let mousePaint = { color: '#ff24e0' }
	* 	draw.addPath(mousePath.toObject(), mousePaint)
	* 
	* 	draw.redraw()
	* }
	* 
	* commonDraw()
	* draw.setBackgroundColor('#c8c8c8')
	* 
	* var layout = ui.HLayout()
	* layout.addStretch()
	* layout.add(draw)
	* layout.addStretch()
	* ui.add(layout)
	* ui.setMinimumHeight(220)
	* ui.setMinimumWidth(220)
	* ui.show()
	*/
  class Draw extends Widget {
    /** adds a path to be drawn. */
    addPath(pathObject: unknown, paintInfo: unknown): void;
    /** erase all paths from the draw store. */
    clearPaths(): void;
    /** ask for an update, use this if you update the paths once the UI has been created. */
    redraw(): void;
    /** save the contents of the draw to the filesystem. Use width and height to scale the output to your desired size. */
    saveImage(filePath: string, width: number, height: number): void;
    /** if set to true, mouseMoveEvents will fire even when the mouse isn't pressed. */
    useHoverEvents(use: boolean): void;
    /** fire when the mouse is pressed */
    onMousePress: (position: { x: number; y: number }, button: string) => void;
    /** fire when the mouse is released */
    onMouseRelease: (
      position: { x: number; y: number },
      button: string,
    ) => void;
    /** fire when the mouse is double clicked */
    onMouseDoubleClick: (
      position: { x: number; y: number },
      button: string,
    ) => void;
    /** only fires when the mouse is pressed unless useHoverEvents is true */
    onMouseMove: (position: { x: number; y: number }) => void;
  }
  /**
   * A dropdown menu.
   * @example
   * // Create two dropdowns
   * var familyDropDown = new ui.DropDown()
   * var stylesDropDown = new ui.DropDown()
   *
   * // Set some sizes
   * familyDropDown.setSize(150, 22)
   * stylesDropDown.setSize(100, 22)
   *
   * // Populate one with all the font families available to Cavalry
   * familyDropDown.populateFontFamilies()
   * // When the first dropdown changes, populate the second with the styles of that font family
   * familyDropDown.onValueChanged = function () {
   * 	stylesDropDown.populateStylesForFamily(familyDropDown.getText())
   * }
   *
   * // Populate the styles for the selected font when the window shows
   * stylesDropDown.populateStylesForFamily(familyDropDown.getText())
   *
   * // Create a horizontal layout and add the dropdowns
   * var hLayout = new ui.HLayout()
   * hLayout.addStretch()
   * hLayout.add(familyDropDown)
   * hLayout.add(stylesDropDown)
   * hLayout.addStretch()
   *
   * // Add the layout to the window
   * ui.add(hLayout)
   *
   * // Resize the window
   * ui.setMinimumWidth(300)
   * ui.setMinimumHeight(100)
   *
   * // Show the window
   * ui.show()
   */
  class DropDown extends Widget {
    /** returns the current index of the DropDown. */
    getValue(): number;
    /** returns the current text in the DropDown. */
    getText(): string;
    /** add an entry to the DropDown. */
    addEntry(rowText: string): void;
    /** add a dividing line at a given index to visually organise the entries. A separator is counted as an index. */
    insertSeparator(index: number): void;
    /** set the entry index of the DropDown. */
    setValue(index: number): void;
    /** find the DropDown entry with the matching text and set the index to it. */
    setText(rowText: string): void;
    /** fill the Dropdown with available font family names. */
    populateFontFamilies(): void;
    /** populate the Dropdown with the styles of a given font family name. */
    populateStylesForFamily(familyName: string): void;
    /** empty the DropDown so it can be repopulated. */
    clear(): void;
    /** assign a function to this variable to be called when the widget's value is changed. */
    onValueChanged: () => void;
  }
  /**
   * A file path widget that can be used to read folders and files or to create a new file path.
   * @example
   * // Filter a file path to an exact document
   * var openFileFP = new ui.FilePath()
   * openFileFP.setMode('OpenFile')
   * openFileFP.setFilter('Text (*.txt)')
   * ui.add(openFileFP)
   *
   * ui.show()
   * @example
   * // Get a folder directory
   * var openFileDir = new ui.FilePath()
   * openFileDir.setMode('OpenDirectory')
   * ui.add(openFileDir)
   *
   * ui.show()
   * @example
   * // Set a save file path (to create a new file), the file extension will be added when the file is written.
   * var openFileSave = new ui.FilePath()
   * openFileSave.setMode('SaveFile')
   * ui.add(openFileSave)
   *
   * ui.show()
   * @example
   * // Set the directory that will open when clicking the folder icon to the Project's Assets path.
   * var setOpen = new ui.FilePath()
   * setOpen.setMode('OpenDirectory')
   * setOpen.setOpenLocation(api.getAssetPath())
   * ui.add(setOpen)
   *
   * ui.show()
   */
  class FilePath extends Widget {
    /**  */
    getFilePath(): string;
    /** add placeholder text. */
    setPlaceholder(placeholder: string): void;
    /**  */
    setFilePath(path: string): void;
    /** set the path which opens when clicking the folder icon. */
    setOpenLocation(path: string): void;
    /** valid arguments are "OpenFile", "OpenDirectory" and "SaveFile". */
    setMode(argument: string): void;
    /**  */
    setFilter(filetype: string): void;
    /**  */
    setFontSize(pixelSize: number): void;
    /** hide the file icon */
    hideLoadButton(): void;
    /** set the widget to read-only to prevent editing the path. */
    setReadOnly(readOnly: boolean): void;
    /** assign a function to this variable to be called as a user changes the widget's value. */
    onValueChanged: () => void;
    /** assign a function to this variable to be called when a change to the widget is committed – either by the user pressing the <kbd>Return</kbd> key or by the field losing focus. */
    onValueCommitted: () => void;
  }
  /**
   * Add an image.
   * @example
   * ui.setTitle('Test Image Script')
   * var image = new ui.Image(ui.scriptLocation + '/MyScript_assets/aPicture.png')
   * ui.add(image)
   * ui.show()
   */
  class Image extends Widget {
    constructor(path: string);
    /** path to an image (relative paths can be built using the ui.scriptLocation property) */
    setImage(path: string): void;
    /** sets a tooltip for this widget */
    setToolTip(tooltip: string): void;
  }
  /**
   * Create a button using an image.
   * @example
   * ui.setTitle('Test Image Button Script')
   * // Real image path required ;)
   * var image = new ui.ImageButton(
   * 	ui.scriptLocation + '/some_assets/somePicture.png',
   * )
   * image.setImageSize(60, 60)
   * image.setSize(60, 60)
   * image.setDrawStroke(false)
   * image.onClick = function () {
   * 	console.log('Image Button Clicked!')
   * }
   * ui.add(image)
   * ui.show()
   */
  class ImageButton extends Widget {
    constructor(path: string);
    /** path to an image (relative paths can be built using the ui.scriptLocation property) */
    setImage(path: string): void;
    /** set the image's dimensions. */
    setImageSize(width: number, height: number): void;
    /** by default buttons have a stroke affordance, you can remove this by calling this method with false. */
    setDrawStroke(state: boolean): void;
    /** setting to true will convert the button to a state button (on/ off) and clicking the button will toggle its state between true and false. When true, the button will colourise light parts of the image with green. */
    setStateButton(state: boolean): void;
    /** sets the button's state. */
    setState(state: boolean): void;
    /** returns the current button state. */
    getState(): boolean;
    /** sets a tooltip for this widget */
    setToolTip(tooltip: string): void;
    /** a callback function that will be called when the button is clicked. */
    onClick: () => void;
  }
  /**
   * This is a non editable piece of text which can be used to give feedback, or provide instructions. This text field accepts markdown.
   * @example
   * var label = new ui.Label('Super Amazing Label')
   * ui.add(label)
   * ui.show()
   */
  class Label extends Widget {
    constructor(text: string);
    /** Set the Label's text. */
    setText(text: string): void;
    /** Set the text colour with a hex value. */
    setTextColor(hex: string): void;
    /** 0: left, 1: centre, 2: right. */
    setAlignment(state: number): void;
    /** Sets a tooltip for this widget. */
    setToolTip(tooltip: string): void;
    /** Set the font size in pixels. */
    setFontSize(pixelSize: number): void;
    /** Use markdown to format the label. Note that setFontSize will not work if using markdown. */
    setMarkdown(markdown: string): void;
  }
  /**
   * This widget can be used for a single line of text entry. Use [MultiLineEdit](#multilineedit) when more than one line is required.
   * @example
   * var lineEdit = ui.LineEdit()
   * lineEdit.setPlaceholder('Hello, World.')
   * lineEdit.setBackgroundColor('#2d2d2d')
   * lineEdit.setTextColor('#e62163')
   *
   * lineEdit.onValueChanged = function () {
   * 	console.log('Text has been edited: ' + lineEdit.getText())
   * }
   *
   * lineEdit.onValueCommitted = function () {
   * 	console.log('Return Pressed: ' + lineEdit.getText())
   * }
   *
   * ui.add(lineEdit)
   * ui.show()
   */
  class LineEdit extends Widget {
    /** get the widget's contents. */
    getText(): string;
    /** populate the widget with a string. */
    setText(text: string): void;
    /** set the color of the text. */
    setTextColor(hex: string): void;
    /** // set placeholder text to be used as a hint. */
    setPlaceholder(placeholder: string): void;
    /** sets the LineEdit's editable state. */
    setReadOnly(state: boolean): void;
    /** clear the widget's contents. */
    clear(): void;
    /**  */
    setFontSize(pixelSize: number): void;
    /** assign a function to this variable to be called as a user changes the widget's value. */
    onValueChanged: () => void;
    /** assign a function to this variable to be called when a change to the widget is committed – either by the user pressing the <kbd>Return</kbd> key or by the field losing focus. */
    onValueCommitted: () => void;
  }
  /**
	* A searchable, selectable and re-orderable list with support for icons, colour swatches, and context menus.

Each row in the model is an object with the following fields:

| Field           | Type   | Description                                                 |
| --------------- | ------ | ----------------------------------------------------------- |
| `uuid`          | string | **Required**. Unique identifier for the row.                |
| `label`         | string | Display text for the row.                                   |
| `tooltip`       | string | Tooltip shown on hover.                                     |
| `icon`          | string | Path to an 18x18px (+ @2x) icon image.                      |
| `swatch`        | string | Hex colour for a colour chip (with picker on double-click). |
| `threeDotsMenu` | bool   | Show a three-dot context menu button.                       |
| `borderColor`   | string | Hex colour for the row border.                              |
| `borderWidth`   | number | Width of the row border.                                    |

The `onContextMenuRequest` callback should return an array of menu item objects:
	* @example
	* // List Widget Example
	* ui.setTitle('List Widget Demo')
	* 
	* // Create the list
	* var list = new ui.List()
	* list.showSearchBar(true)
	* list.setSelectionMode('extended')
	* list.setRowsRenamable(true)
	* list.setRowsDeletable(true)
	* list.setRowsReorderable(true)
	* list.setPlaceholder('No items in list')
	* 
	* // Sample data with various row features
	* var sampleData = [
	* 	{
	* 		uuid: 'item1',
	* 		label: 'Rectangle Layer',
	* 		icon: api.getAppAssetsPath() + '/icons/load.png',
	* 		threeDotsMenu: true,
	* 	},
	* 	{
	* 		uuid: 'item2',
	* 		label: 'Ellipse Layer',
	* 		swatch: '#4ffd7a',
	* 		threeDotsMenu: true,
	* 	},
	* 	{
	* 		uuid: 'item3',
	* 		label: 'Star Layer',
	* 		swatch: '#e62163',
	* 		threeDotsMenu: true,
	* 		tooltip: 'A star shape',
	* 	},
	* 	{ uuid: 'item4', label: 'Text Layer', threeDotsMenu: true },
	* 	{
	* 		uuid: 'item5',
	* 		label: 'Highlighted Item',
	* 		swatch: '#6437ff',
	* 		borderColor: '#6437ff',
	* 		borderWidth: 1,
	* 	},
	* ]
	* 
	* list.setModel(sampleData)
	* 
	* // Selection changed callback
	* list.onSelectionChanged = function (selectedUUIDs) {
	* 	console.log('Selection changed: ' + selectedUUIDs.join(', '))
	* }
	* 
	* // Row deleted callback
	* list.onRowDeleted = function (uuid) {
	* 	console.log('Row deleted: ' + uuid)
	* }
	* 
	* // Row renamed callback
	* list.onRowRenamed = function (uuid, newName) {
	* 	console.log('Row renamed: ' + uuid + ' -> ' + newName)
	* }
	* 
	* // Row double-clicked callback (only fires if not renamable)
	* list.onRowDoubleClicked = function (uuid) {
	* 	console.log('Row double-clicked: ' + uuid)
	* }
	* 
	* // Reorder callback
	* list.onReorder = function (fromIndex, toIndex) {
	* 	console.log('Reordered from ' + fromIndex + ' to ' + toIndex)
	* }
	* 
	* // Swatch changed callback
	* list.onSwatchChanged = function (uuid, hexColor) {
	* 	console.log('Swatch changed for ' + uuid + ': ' + hexColor)
	* }
	* 
	* // Decorator (delete/cross button) clicked callback
	* list.onDecoratorClicked = function (uuid) {
	* 	console.log('Decorator clicked: ' + uuid)
	* }
	* 
	* // Context menu - return array of menu items
	* list.onContextMenuRequest = function (uuid) {
	* 	return [
	* 		{ label: 'Action One', id: 'action1' },
	* 		{ label: 'Action Two', id: 'action2' },
	* 	]
	* }
	* 
	* // Context menu action handler
	* list.onContextMenuAction = function (uuid, actionId) {
	* 	console.log("Menu action '" + actionId + "' on " + uuid)
	* 	if (actionId === 'action1') {
	* 		console.log('Action One requested for: ' + uuid)
	* 	} else if (actionId === 'action2') {
	* 		console.log('Action Two requested for: ' + uuid)
	* 	}
	* }
	* 
	* // Control buttons
	* var addButton = new ui.Button('Add Item')
	* addButton.onClick = function () {
	* 	var newItem = {
	* 		uuid: 'item' + Date.now(),
	* 		label: 'New Item',
	* 		swatch:
	* 			'#' +
	* 			Math.floor(Math.random() * 16777215)
	* 				.toString(16)
	* 				.padStart(6, '0'),
	* 		threeDotsMenu: true,
	* 	}
	* 	list.addRow(newItem)
	* }
	* 
	* var clearSearchButton = new ui.Button('Clear Search')
	* clearSearchButton.onClick = function () {
	* 	list.setSearchFilter('')
	* }
	* 
	* var logSelectionButton = new ui.Button('Log Selection')
	* logSelectionButton.onClick = function () {
	* 	console.log('Current selection: ' + JSON.stringify(list.getSelection()))
	* }
	* 
	* var logFilteredButton = new ui.Button('Log Filtered')
	* logFilteredButton.onClick = function () {
	* 	console.log('Filtered UUIDs: ' + JSON.stringify(list.getFilteredUUIDs()))
	* }
	* 
	* // Layout
	* var buttonLayout = new ui.HLayout()
	* buttonLayout.add(
	* 	addButton,
	* 	clearSearchButton,
	* 	logSelectionButton,
	* 	logFilteredButton,
	* )
	* 
	* ui.add(list)
	* ui.addSpacing(8)
	* ui.add(buttonLayout)
	* 
	* ui.setMinimumHeight(400)
	* ui.setMinimumWidth(350)
	* ui.show()
	*/
  class List extends Widget {
    /** show or hide the integrated search bar */
    showSearchBar(show: boolean): void;
    /** set selection behaviour: "none", "single", or "extended" */
    setSelectionMode(mode: string): void;
    /** allow rows to be renamed by double-clicking */
    setRowsRenamable(renamable: boolean): void;
    /** allow rows to be deleted */
    setRowsDeletable(deletable: boolean): void;
    /** allow rows to be reordered by dragging */
    setRowsReorderable(reorderable: boolean): void;
    /** set the height of each row */
    setRowHeight(height: number): void;
    /** set placeholder text shown when the list is empty */
    setPlaceholder(text: string): void;
    /** set the list data (array of row objects) */
    setModel(model: unknown): void;
    /** update a single row by its uuid */
    updateRow(rowData: unknown): void;
    /** add a new row to the list */
    addRow(rowData: unknown): void;
    /** get the current list data */
    getModel(): unknown;
    /** get an array of selected row uuids */
    getSelection(): string[];
    /** programmatically set the search filter text */
    setSearchFilter(filter: string): void;
    /** get the current search filter text */
    getSearchFilter(): string;
    /** get uuids of rows visible after filtering */
    getFilteredUUIDs(): string[];
    /** called when the selection changes, receives an array of selected uuids */
    onSelectionChanged: () => void;
    /** called when a row is deleted, receives the uuid */
    onRowDeleted: () => void;
    /** called when a row is renamed, receives uuid and new name */
    onRowRenamed: () => void;
    /** called when a row is double-clicked (only fires if rows are not re-namable), receives uuid */
    onRowDoubleClicked: () => void;
    /** called when rows are reordered, receives fromIndex and toIndex */
    onReorder: () => void;
    /** called when a colour swatch is changed, receives uuid and hex colour */
    onSwatchChanged: () => void;
    /** called to build the context menu, receives uuid, should return an array of menu items */
    onContextMenuRequest: () => void;
    /** called when a context menu item is clicked, receives uuid and action id */
    onContextMenuAction: () => void;
  }
  /**
   * This widget can be used to show context menus.
   */
  class Menu extends Widget {
    constructor(name?: string);
    /** add a menu item */
    addMenuItem(object: unknown): void;
  }
  /**
   * This widget can be used to show modal windows where an action requires confirmation or further input. Note that order the options appear in is dependent on the OS.
   * @example
   * var modal = new ui.Modal()
   * modal.showMessage('Your message here.')
   * //console.log(modal.showQuestion("Title", "Your question here."));
   * //console.log(modal.showStringInput("Enter your name.", "Name", "Your name here."));
   */
  class Modal extends Widget {
    /**  */
    showMessage(message: string): void;
    /** No/Yes - returns true if 'yes' is clicked. */
    showQuestion(title: string, question: string): boolean;
    /** Cancel/Okay - returns true if 'Okay' is clicked. */
    showConfirmation(title: string, question: string): boolean;
    /** returns the string entered by the user. */
    showStringInput(
      windowTitle: string,
      fieldName: string,
      defaultValue: string,
    ): string;
  }
  /**
   * This widget can be used for multiple lines of text entry.
   * @example
   * var lineEdit = ui.MultiLineEdit()
   * lineEdit.setPlaceholder('Hello, World.')
   * lineEdit.setBackgroundColor('#2d2d2d')
   * ui.add(lineEdit)
   * ui.show()
   */
  class MultiLineEdit extends Widget {
    /** get the widget's contents. */
    getText(): string;
    /** populate the widget with a string. */
    setText(text: string): void;
    /** set the color of the text. */
    setTextColor(hex: string): void;
    /** set placeholder text to be used as a hint. */
    setPlaceholder(placeholder: string): void;
    /** set the MultiLineEdit's editable state. */
    setReadOnly(state: boolean): void;
    /** clear the widget's contents. */
    clear(): void;
    /**  */
    setFontSize(pixelSize: number): void;
    /** perform a callback when the widget's contents changes. */
    onValueChanged: () => void;
  }
  /**
   * A numeric entry field, much like the ones seen in the Attribute Editor. Numeric Fields can be both `number`s or `int`s. The type of the field is set with the `setType` function.
   * @example
   * var num = new ui.NumericField(50)
   * var slider = new ui.Slider()
   * slider.setRange(0, 100)
   * slider.setValue(50)
   *
   * slider.onValueChanged = function () {
   * 	var sliderValue = slider.getValue()
   * 	num.setValue(sliderValue)
   * }
   *
   * num.onValueChanged = function () {
   * 	var numValue = num.getValue()
   * 	slider.setValue(numValue)
   * }
   *
   * ui.add(num)
   * ui.add(slider)
   * ui.show()
   */
  class NumericField extends Widget {
    constructor(number: number);
    /**  */
    getValue(): number;
    /**  */
    setValue(value: number): void;
    /**  */
    setMin(minimum: number): void;
    /**  */
    setMax(maximum: number): void;
    /** 0 for integer, 1 for number */
    setType(type: number): void;
    /** Set the increment the value will increase/decrease by when scrubbing. For example, set a value like  for finer control. */
    setStep(step: number): void;
    /**  */
    setFontSize(pixelSize: number): void;
    /** assign a function to this variable to be called when the widget's value is changed. */
    onValueChanged: () => void;
  }
  /**
   * A progress bar that can be used to update users on long processes.
   * @example
   * var progress = new ui.ProgressBar()
   * progress.setMaximum(66)
   * progress.setValue(33)
   * ui.add(progress)
   * ui.show()
   */
  class ProgressBar extends Widget {
    /** get the current value */
    getValue(): void;
    /** set the current value */
    setValue(): void;
    /** set the maximum value, the bar will show a percentage result of the value when compared to the maximum. */
    setMaximum(maximum: number): void;
  }
  /**
   * A Slider which returns values in a range.
   * @example
   * var slider = new ui.Slider()
   * slider.setRange(0, 100)
   *
   * slider.onValueChanged = function () {
   * 	console.log(slider.getValue())
   * }
   *
   * ui.add(slider)
   * ui.show()
   */
  class Slider extends Widget {
    /**  */
    getValue(): number;
    /**  */
    setValue(value: number): void;
    /**  */
    setRange(min: number, max: number): void;
    /** assign a function to this variable to be called when the widget's value is changed. */
    onValueChanged: () => void;
  }
  /**
   * Add a layout where its content can reflow dependent on the layout's dimensions.
   * @example
   * ui.setTitle('Flow Layout')
   *
   * var flowLayout = new ui.FlowLayout(2, 2)
   * flowLayout.setSpaceBetween(3)
   * flowLayout.setMargins(2, 2, 2, 2)
   *
   * for (let step = 0; step < 25; step++) {
   * 	let container = new ui.Container()
   * 	container.setSize(60, 60)
   * 	container.setBackgroundColor('#4ffd7a')
   * 	container.setRadius(3, 3, 3, 3)
   * 	container.onMousePress = function () {
   * 		container.setBackgroundColor('#c8c8c8')
   * 	}
   * 	flowLayout.add(container)
   * }
   *
   * ui.add(flowLayout)
   * ui.show()
   */
  class FlowLayout {
    constructor(horizontalSpacing: number, verticalSpacing: number);
    /** Set the padding space between widgets in the layout. The default value is 3 pixels. */
    setSpaceBetween(pixel: number): void;
    /** Set the margins of the layout (how far from the edges the widgets can be). The default value is 3 pixels on all sides. */
    setMargins(left: number, top: number, right: number, bottom: number): void;
    /** Returns the number of items in the layout. */
    itemCount(): number;
    /** Clear the Layout. */
    clear(): void;
    /** Remove an item at the given index. */
    removeAt(number: number): void;
    /** returns how high this layout would be at a given width */
    getHeightForWidth(width: number): void;
  }
  /**
   * A horizontal layout.
   * @example
   * // Create the ui elements
   * var button1 = new ui.Button('Button')
   * var input1 = new ui.NumericField(100)
   * // Create the horizontal layout
   * var hLayout1 = new ui.HLayout()
   * hLayout1.add(input1)
   * hLayout1.add(button1)
   * ui.add(hLayout1)
   * // Show the window
   * ui.show()
   * @example
   * // Clear layout example
   * ui.setTitle('Clear Layout Demo')
   * // Create a layout and add a label to it.
   * var layout = new ui.VLayout()
   * var label = new ui.Label('A label!')
   * layout.add(label)
   * // Create a button that clears the layout.
   * var button = new ui.Button('Clear Layout')
   * button.onClick = function () {
   * 	layout.clear()
   * }
   * // Create a button that adds the label.
   * var button2 = new ui.Button('Add Label')
   * button2.onClick = function () {
   * 	var label = new ui.Label('A label!')
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
    /** Multiple comma separated items can be added at once. */
    add(...widgets: object[]): void;
    /**  */
    addStretch(): void;
    /**  */
    addSpacing(pixel: number): void;
    /** Set the padding space between widgets in the layout. The default value is 3 pixels. */
    setSpaceBetween(pixel: number): void;
    /** Set the margins of the layout (how far from the edges the widgets can be). The default value is 3 pixels on all sides. */
    setMargins(left: number, top: number, right: number, bottom: number): void;
    /** Returns the number of items in the layout. */
    itemCount(): number;
    /** Clear the Layout. This will delete all UI elements and child layouts within this layout. You cannot access anything you previously added to a layout once you clear it, doing so will result in  behaviour. */
    clear(): void;
  }
  /**
   * Similar to a [TabView](#tabview), a PageView allows a UI to have many 'pages' of layouts but only show one at a time. They are useful for linear journeys though pages of content - such as wizards and guides. Use forward and back buttons to enable paging through such a view. Note that the page index start at 0.
   * @example
   * var lab1 = new ui.Label('## Page 1')
   * lab1.setAlignment(1)
   * var lab2 = new ui.Label('## Page 2')
   * lab2.setAlignment(1)
   * var lab3 = new ui.Label('## Page 3')
   * lab3.setAlignment(1)
   *
   * var pageLayout1 = new ui.HLayout()
   * pageLayout1.add(lab1)
   * var pageLayout2 = new ui.HLayout()
   * pageLayout2.add(lab2)
   * var pageLayout3 = new ui.HLayout()
   * pageLayout3.add(lab3)
   *
   * var pageView = new ui.PageView()
   * pageView.add(pageLayout1)
   * pageView.add(pageLayout2)
   * pageView.add(pageLayout3)
   *
   * ui.add(pageView)
   *
   * var nextButton = new ui.Button('Next')
   * var prevButton = new ui.Button('Previous')
   * var hLay = new ui.HLayout()
   * hLay.add(prevButton)
   * hLay.add(nextButton)
   *
   * nextButton.onClick = function () {
   * 	pageView.setPage(pageView.currentPage() + 1)
   * }
   * prevButton.onClick = function () {
   * 	pageView.setPage(pageView.currentPage() - 1)
   * }
   *
   * ui.add(hLay)
   * ui.show()
   */
  class PageView {
    /** add a layout, this is the content of the page */
    add(layout: unknown): void;
    /** set the current page index */
    setPage(index: number): void;
    /** get the current page index */
    currentPage(): number;
    /** get the last page index */
    previousPage(): number;
    /** get the total number of pages */
    pageCount(): number;
  }
  /**
   * Control where scroll bars appear in a UI. Set a fixed size for a ScrollView and then when too many items are added, scroll bars will appear. It's generally a good idea to only restrict a ScrollView's size in one dimension (width or height).
   * @example
   * var label1 = new ui.Label('Cavalry')
   * label1.setMinimumWidth(80)
   * var label2 = new ui.Label('Animation')
   * label2.setMinimumWidth(80)
   * var label3 = new ui.Label('Software')
   * label3.setMinimumWidth(80)
   *
   * var layout = new ui.HLayout()
   * layout.add(label1, label2, label3)
   *
   * // Use a ScrollView to manually control where scroll bars should appear.
   * var scrollView = new ui.ScrollView()
   * scrollView.setLayout(layout)
   *
   * ui.add(scrollView)
   * ui.show()
   */
  class ScrollView {
    /** set the contents of the ScrollView. */
    setLayout(layout: unknown): void;
    /** set a fixed size for the ScrollView. */
    setSize(width: number, height: number): void;
    /** set a fixed width for the ScrollView. */
    setFixedWidth(width: number): void;
    /** set a fixed height for the ScrollView. */
    setFixedHeight(height: number): void;
    /** force a vertical scrollbar to appear. */
    alwaysShowVerticalScrollBar(): void;
    /** force a horizontal scrollbar to appear. */
    alwaysShowHorizontalScrollBar(): void;
  }
  /**
   * Similar to the PageView, the TabView can be used for progressively disclosing controls.
   * @example
   * var lab1 = new ui.Label('## Page 1')
   * lab1.setAlignment(1)
   * var lab2 = new ui.Label('## Page 2')
   * lab2.setAlignment(1)
   * var lab3 = new ui.Label('## Page 3')
   * lab3.setAlignment(1)
   *
   * var tabLayout1 = new ui.HLayout()
   * tabLayout1.add(lab1)
   * var tabLayout2 = new ui.HLayout()
   * tabLayout2.add(lab2)
   * var tabLayout3 = new ui.HLayout()
   * tabLayout3.add(lab3)
   *
   * var tabView = new ui.TabView()
   * tabView.add('One', tabLayout1)
   * tabView.add('Two', tabLayout2)
   * tabView.add('Three', tabLayout3)
   *
   * ui.add(tabView)
   * ui.show()
   */
  class TabView {
    /** name the tab, and set the contents of the tab - which should be a layout */
    add(name: string, layout: unknown): void;
    /** set the current tab index */
    setTab(index: number): void;
    /** get the current tab index */
    currentTab(): number;
    /** get the total number of tabs */
    tabCount(): number;
  }
  /**
   * A vertical layout.
   * @example
   * // Create the ui elements
   * var button1 = new ui.Button('Button')
   * var input1 = new ui.NumericField(100)
   * // Create the vertical layout.
   * var vLayout1 = new ui.VLayout()
   * vLayout1.add(input1)
   * vLayout1.add(button1)
   * ui.add(vLayout1)
   * // Show the window
   * ui.show()
   * @example
   * // Clear layout example
   * ui.setTitle('Clear Layout Demo')
   * // Create a layout and add a label to it.
   * var layout = new ui.VLayout()
   * var label = new ui.Label('A label!')
   * layout.add(label)
   * // Create a button that clears the layout.
   * var button = new ui.Button('Clear Layout')
   * button.onClick = function () {
   * 	layout.clear()
   * }
   * // Create a button that adds the label.
   * var button2 = new ui.Button('Add Label')
   * button2.onClick = function () {
   * 	var label = new ui.Label('A label!')
   * 	layout.add(label)
   * }
   * // Create the UI
   * ui.add(layout)
   * ui.addStretch()
   * ui.add(button)
   * ui.add(button2)
   * ui.show()
   */
  class VLayout {
    /** Multiple comma separated items can be added at once. */
    add(...widgets: object[]): void;
    /**  */
    addStretch(): void;
    /**  */
    addSpacing(space: number): void;
    /** Set the padding space between widgets in the layout. The default value is 3 pixels. */
    setSpaceBetween(padding: number): void;
    /** Set the margins of the layout (how far from the edges the widgets can be). The default value is 3 pixels on all sides. */
    setMargins(left: number, top: number, right: number, bottom: number): void;
    /** Add a horizontal line with a title. */
    addSeparator(tooltip: string): void;
    /** Returns the number of items in the layout. */
    itemCount(): number;
    /** Clear the Layout. */
    clear(): void;
  }
}
