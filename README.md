# cavalry-types

Typescript definitions for [Cavalry](https://cavalry.studio/docs/tech-info/scripting/scripting-getting-started/)

> [!NOTE]
> Current supported API version is [Cavalry 2.7.0](https://cavalry.studio/docs/tech-info/release-notes/2.7/2-7-0-release-notes/)

These definitions expose the whole Cavalry scripting API. Essentially it gives you all the documentation inside your editor. After [installation](#installation) and following the [usage guidelines](#usage) you can simply start writing your script to get suggestions about available methods and parameters.

If you're not sure how to start, follow the [usage guidelines](#usage) and press `ctrl-space`, then type `cav` and you'll see the `cavalry` namespace suggested along with its description. Press `enter` and type `.` to see a list of all the available methods.

A few pointers:

-   Hovering over a namespace, method or parameter will show its documentation along with examples (in most cases).
-   Red squiggly lines will appear when methods or parameters don't exist or when they're of the wrong type. Hover over them to find out about the problem.
-   Even though there might be errors and warnings in the code, it will still run (with or without errors). This is because the error checking happens only in your editor.
-   If you're writing in Typescript, the code will not run in Cavalry. You will have to compile the code first or use [Stallion](https://github.com/scenery-io/stallion) which will strip out the types before sending them to Cavalry.

## Stallion

It's recommended that you use the [Stallion VSCode extension](https://github.com/scenery-io/stallion) if you're new to the [Node](https://nodejs.org/) ecosystem. It can insert the Typescript definitions without the need to install them.

## Installation

Make sure you first initialise a new [npm](https://www.npmjs.com/) project. In your terminal run:

```bash
npm init --yes
```

then install the Typescript definitions:

```bash
npm install @scenery/cavalry-types --save-dev
```

## Usage

You can either use [Triple-Slash Directives](#triple-slash-directives) for one-off scripts. Or for more involved projects, you can use a [Typescript Config](#typescript-config).

### Triple-Slash Directives

Add the following [triple-slash directive](https://www.typescriptlang.org/docs/handbook/triple-slash-directives.html) at the top of your script file.

```js
/// <reference types="@scenery/cavalry-types"/>
```

Optionally include a `@ts-check` comment to enable type checking.

```js
/// <reference types="@scenery/cavalry-types"/>
// @ts-check
```

### Typescript Config

Create a [`tsconfig.json`](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html#handbook-content) in your project folder and add `@scenery/cavalry-types`.

```json
{
	"compilerOptions": {
		"types": ["@scenery/cavalry-types"]
	}
}
```

## Versioning

The latest types are always up-to-date with the latest Cavalry release. To install the types for a previous Cavalry version check [the changelog](/blob/main/CHANGELOG.md) for the version corresponding to the Cavalry version.

## Contextual Types

Cavalry has various scripting namespaces that can be used in specific contexts eg. JavaScript Layers, Render Scripts, etc.

Every context exposes only those types that are available in that context. The available contexts are:

-   `script` is the default context. It's used for Scripts (with or without UI)
-   `plugin` for Scripts that are part of a Plugin
-   `render` for Setup, Pre- and Post-Render Scripts
-   `shape` for JavaScript Shapes
-   `utility` for JavaScript Utilities
-   `deformer` for JavaScript Deformers
-   `emitter` for JavaScript Particle Emitters
-   `modifier` for JavaScript Particle Modifiers

### Usage

Append the context name to the path in the Triple-Slash Directive.

```js
/// <reference types="@scenery/cavalry-types/render"/>
```

### TypeScript

If you're using `tsconfig.json`, append the context name to the path in the `type` array.

```json
{
	"compilerOptions": {
		"types": ["@scenery/cavalry-types/render"]
	}
}
```

## Sponsors

Huge thanks to Cavalry for sponsoring this project! Interested in sponsoring? Send us [a message](https://scenery.io/support).

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="./images/cavalry-white.png">
  <img alt="Cavalry" src="./images/cavalry-black.png" width="300">
</picture>
