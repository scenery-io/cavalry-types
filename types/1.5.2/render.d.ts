/**
 * The following APIs are all in the `render` namespace. They are ONLY available
 * in a Render Queue Item. Scripts can be added to the corresponding editor on
 * the Render Queue Item's Scripts tab in the Render Manager.
 *
 * #### Types
 * 1. #### `Setup Render Script`
 * Add a script that runs before any render setup begins and so can be used to
 * affect the Render Queue Item itself.
 * 1. #### `Pre-Render Script`
 * Add a script that can be used to manipulate and prepare the scene for rendering.
 * 1. #### `Post-Render Script`
 * Add a script that runs once a Render Queue Item has completed.
 *
 * When using Dynamic Rendering, the Dynamic Index can be accessed using
 * `api.getDynamicIndex()`.
 *
 * Any JavaScript execution will block further rendering until the script finishes
 * running. This is by design so that any processes like downloading/replacing
 * Assets or altering the Scene in some way can complete before starting the
 * next render.
 *
 * Scripts are executed before and after the entire sequence is rendered and not
 * before and after each individual image.
 *
 * Scripts can include using the JavaScript API to perform tasks such as modify
 * attributes, to pull new information from the web, or the replacement and
 * reloading of Assets.
 */
declare namespace render {
	/**
	 * Return the file path of the render – any dynamic tokens/paths are fully
	 * resolved. Available as part of a Post-Render Script.
	 *
	 * @example
	 * console.log(render.path);
	 */
	const path: string
}
