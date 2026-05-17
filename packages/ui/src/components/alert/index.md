<script setup lang="ts">
	import LxAlert from './LxAlert.vue';
	import LxFlex from '../flex/LxFlex.vue';
	import { COLOURS, SIZES, SURFACE_COLOURS } from '../../helpers/constants';
</script>

# Alert

The Alert component is used to present important inline messaging with semantic roles, shared sizing tokens, and platform-consistent colour treatment. It supports title, content, and icon content while automatically choosing an appropriate live region role for common state variants.

For simplicity, the `info`, `success`, `warning`, and `danger` variants automatically include a sensible default icon when `icon` is not provided.

[[toc]]

## Settings

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | [TColours](/types/theme.html#type-tcolours) \| [TSurfaceColours](/types/theme.html#type-tsurfacecolours) | `info` | The alert surface and accent styling. For `info`, `success`, `warning`, and `danger`, a matching default icon is also supplied when `icon` is omitted. |
| `size` | [TSizes](/types/theme.html#type-tsizes) | `md` | The shared size token used for typography, spacing, and icon sizing. |
| `title` | `string` | `''` | Optional alert heading text. |
| `icon` | `string` | `''` | Optional icon override. When omitted, state variants can provide a default icon automatically. |
| `content` | `string` | `''` | Optional plain text content used when no `content` or default slot is provided. |
| `contentPadding` | [TSizes](/types/theme.html#type-tsizes) | `size` | Optional inner padding token. When omitted, it follows the current `size`. |
| `contentLineHeight` | [TFontLineHeights](/types/theme.html#type-tfontlineheights) | `normal` | The line-height token used for the alert body content. |
| `borderRadius` | [TRadiusSize](/types/theme.html#type-tradiussize) | `md` | The outer border radius of the alert container. |
| `borderWidth` | [TBorderWidths](/types/theme.html#type-tborderwidths) | `thin` | The border width used around the alert. |
| `role` | `alert \| status` | inferred from `variant` | Optional role override. By default, `warning` and `danger` use `alert`, while everything else uses `status`. |

## Roles

The component assigns semantic live region roles automatically:

| Variant | Default role |
| --- | --- |
| `warning` | `alert` |
| `danger` | `alert` |
| `info` | `status` |
| `success` | `status` |
| other colours and surfaces | `status` |

## Default Icons

For the common state variants, the component supplies a default icon automatically unless you explicitly override it with the `icon` prop:

| Variant | Default icon |
| --- | --- |
| `info` | `circle-info` |
| `success` | `circle-check` |
| `warning` | `triangle-exclamation` |
| `danger` | `circle-xmark` |

## Usage

<LxAlert variant="info" title="Heads up" content="The nightly sync completed successfully." />

<details>
<summary>Show code</summary>

```html
<LxAlert variant="info" title="Heads up" content="The nightly sync completed successfully." />
```
</details>

## Variants

State variants show automatic fallback icons when `icon` is not provided.

<LxFlex direction="column" gap="md">
	<LxAlert variant="info" title="Informational update" content="A background refresh is in progress." />
	<LxAlert variant="success" title="Saved successfully" content="Your changes have been published." />
	<LxAlert variant="warning" title="Attention required" content="One of the connected systems needs review." />
	<LxAlert variant="danger" title="Action failed" content="We could not complete the request." />
</LxFlex>

<details>
<summary>Show code</summary>

```html
<LxFlex direction="column" gap="md">
	<LxAlert variant="info" title="Informational update" content="A background refresh is in progress." />
	<LxAlert variant="success" title="Saved successfully" content="Your changes have been published." />
	<LxAlert variant="warning" title="Attention required" content="One of the connected systems needs review." />
	<LxAlert variant="danger" title="Action failed" content="We could not complete the request." />
</LxFlex>
```
</details>

## Icon Overrides

You can override the automatic state icon with any icon name or full Font Awesome class string that `LxIcon` accepts.

<LxFlex direction="column" gap="md">
	<LxAlert variant="warning" icon="fa-regular fa-bell" title="Custom warning" content="This warning uses an explicit icon override." />
	<LxAlert variant="success" icon="sparkles" title="Custom success" content="The default success icon has been replaced." />
</LxFlex>

<details>
<summary>Show code</summary>

```html
<LxFlex direction="column" gap="md">
	<LxAlert variant="warning" icon="fa-regular fa-bell" title="Custom warning" content="This warning uses an explicit icon override." />
	<LxAlert variant="success" icon="sparkles" title="Custom success" content="The default success icon has been replaced." />
</LxFlex>
```
</details>

## Surface Variants

The alert also supports semantic surfaces when you want a less state-heavy presentation.

<LxFlex direction="column" gap="md">
	<LxAlert v-for="variant in SURFACE_COLOURS" :key="variant" :variant="variant" :title="`${variant} alert`" content="Uses the shared surface palette." />
</LxFlex>

<details>
<summary>Show code</summary>

```html
<LxFlex direction="column" gap="md">
	<LxAlert v-for="variant in SURFACE_COLOURS" :key="variant" :variant="variant" :title="`${variant} alert`" content="Uses the shared surface palette." />
</LxFlex>
```
</details>

## Additional Colours

<LxFlex direction="column" gap="md">
	<LxAlert v-for="variant in COLOURS" :key="variant" :variant="variant" :title="`${variant} alert`" content="Additional palette coverage." />
</LxFlex>

<details>
<summary>Show code</summary>

```html
<LxFlex direction="column" gap="md">
	<LxAlert v-for="variant in COLOURS" :key="variant" :variant="variant" :title="`${variant} alert`" content="Additional palette coverage." />
</LxFlex>
```
</details>

## Sizes

<LxFlex direction="column" gap="md">
	<LxAlert v-for="size in SIZES" :key="size" :size="size" variant="info" :title="`${size} alert`" content="This alert follows the shared sizing scale." />
</LxFlex>

<details>
<summary>Show code</summary>

```html
<LxFlex direction="column" gap="md">
	<LxAlert v-for="size in SIZES" :key="size" :size="size" variant="info" :title="`${size} alert`" content="This alert follows the shared sizing scale." />
</LxFlex>
```
</details>

## Slots

### Slot: `title`

Provides custom title content for the alert heading.

### Slot: `content`

Provides named content for the body of the alert. This takes priority over the default slot and the `content` prop.

### Slot: `default`

Provides fallback body content when the named `content` slot is not used.
