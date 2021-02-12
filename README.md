# Svelte-component-ts template 🎉

this template enables svelte to be used with a `shadow DOM` entry component and then sub component using the goodness of svelte.

This template has stealen inspiration (hacks) from https://github.com/redradix/svelte-custom-element-template thanks to https://github.com/MonkeyAndres

This template includes:

-   **typescript** support out of the box
-   **sass** support
-   **babel** with a minimal configuration (cf. rollup.config.js)

## Recommended tools

-   [Volta (The Hassle-Free JavaScript Tool Manager)](https://volta.sh/)

## Usage

Clone it with [degit](https://github.com/Rich-Harris/degit):

```bash
npx degit stefanonepa/svelte-component-ts my-new-component
cd my-new-component

yarn
yarn dev
```

## Constraints

-   setup a style in the entry element `ShadowRoot.svelte`.
-   ⚠️ Styles in the root component are not scoped by svelte, then choose carefully your selectors if you use some there ⚠️.

## Why?

(from `redradix/svelte-custom-element-template` ☝️)

Building custom elements with Svelte is really easy but have a lot of limitations, is this template I'm trying to show the way I solve most of these limitations.

Svelte current limitations:

-   [Support nested custom elements](https://github.com/sveltejs/svelte/issues/3520)
-   [Nested child components lose their css when the parent is used as a custom element](https://github.com/sveltejs/svelte/issues/4274)
-   [Transitions in custom Elements](https://github.com/sveltejs/svelte/issues/1825)
-   [Context API doesn't work for custom elements](https://github.com/sveltejs/svelte/issues/3422)
