# cavalry-types

Typescript definitions for [Cavalry](https://docs.cavalry.scenegroup.co/tech-info/scripting/getting-started/)

> **Note**  
> Current supported API version is [Cavalry 1.5.2](https://docs.cavalry.scenegroup.co/tech-info/release-notes/1-5-2-release-notes)

These definitions describe the whole Cavalry scripting API. Essentially it gives you all the documentation inside your editor. After [installation](#installation) and following the [usage guidelines](#usage) you can simply start writing your script and get suggestions about available methods and parameters.

If you're not sure how to start, follow the [usage guidelines](#usage) and press `ctrl-space`, then type `cav` and you'll see the `cavalry` namespace suggested along with its description. Press `enter` and type `.` to see a list of all the available methods.

A few pointers:

-   Hovering over a namespace, method or parameter will show its documentation along with examples (in most cases).
-   Red squiggly lines will appear when methods or parameters don't exist or when they're of the wrong type. Hover over them to find out about the problem.
-   Even though there might be errors and warnings in the code, it will still run (with or without errors). This is because the error checking happens only in your editor.
-   If you're writing in Typescript, the code will not run in Cavalry. You will have to compile the code first.

> **Note**  
> This project is still in progress. There are some descriptions and Typescript features missing, but the API is mostly documented. The definition files were written by hand, so there might be some mistakes. Please report any issues you find.

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

The types will always point to the latest API version. Add a version number to the path to target a specific version.

#### Javascript

```ts
/// <reference types="@scenery/cavalry-types/versions/1.5.1" />
```

#### Typescript

```json
{
	"compilerOptions": {
		"types": ["@scenery/cavalry-types/versions/1.5.1"]
	}
}
```

## Specific Namespaces

Cavalry has namespaces for specific parts of the app, such as [`render`](https://docs.cavalry.scenegroup.co/tech-info/scripting/render-scripts) for render scripts and [`ctx`](https://docs.cavalry.scenegroup.co/tech-info/scripting/context-module) in the [Javascript Utility](https://docs.cavalry.scenegroup.co/nodes/utilities/javascript). Add an additional [Triple-Slash Directive](#triple-slash-directives) to expose the types for it.

```js
/// <reference types="@scenery/cavalry-types"/>
/// <reference types="@scenery/cavalry-types/render"/>
```

#### For a specific version

```js
/// <reference types="@scenery/cavalry-types/versions/1.5.1"/>
/// <reference types="@scenery/cavalry-types/versions/1.5.1/render"/>
```

#### In a [Typescript config](#typescript-config)

```json
{
	"compilerOptions": {
		"types": ["@scenery/cavalry-types", "@scenery/cavalry-types/render"]
	}
}
```
