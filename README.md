# cavalry-types

Typescript definitions for [Cavalry](https://docs.cavalry.scenegroup.co/tech-info/scripting/getting-started/)

## Installation

In your terminal run:

```bash
npm install cavalry-types --save-dev
```

## Usage

### Triple-Slash Directives

Add the following [triple-slash directive](https://www.typescriptlang.org/docs/handbook/triple-slash-directives.html) at the top of your script file:

```ts
/// <reference types="cavalry-types" />
```

<!-- This will always point to the latest version.

If you want to target a specific version you can add it to the path:

```ts
/// <reference types="cavalry-types/1.4.1" />
``` -->

### Typescript Config

Add `cavalry-types` to your `tsconfig.json`:

```json
{
	"compilerOptions": {
		"types": ["/node_modules/cavalry-types"]
	}
}
```
