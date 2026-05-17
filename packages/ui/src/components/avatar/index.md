<script setup lang="ts">
	import LxAvatar from './LxAvatar.vue';
	import LxFlex from '../flex/LxFlex.vue';
	import { COLOURS, SIZES } from '../../helpers/constants';
</script>

# Avatar

The Avatar component displays a circular identity marker using an image when available, then initials, and finally a fallback user icon. It follows the shared colour and size tokens so it stays aligned with the rest of the platform.

[[toc]]

## Settings

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `src` | `string` | `''` | The image source for the avatar. This can be a file path, URL, or base64/data URL string. |
| `initials` | `string` | `''` | Fallback initials shown when no image source is available. The component normalizes these to uppercase and uses at most two characters. |
| `variant` | [TColours](/types/theme.html#type-tcolours) | `primary` | The background colour used for initials or icon fallbacks. Content uses the matching `on-*` token automatically. |
| `size` | [TSizes](/types/theme.html#type-tsizes) | `md` | The avatar size token, using the shared control height scale for both width and height. |
| `alt` | `string` | `''` | Accessible label text for the avatar. This is used as the image alt text when an image is shown, and as the fallback `aria-label` otherwise. |

## Usage

<LxFlex align="center" gap="md">
	<LxAvatar src="https://i.pravatar.cc/80?img=12" alt="Priya Shah" />
	<LxAvatar initials="ps" variant="secondary" />
	<LxAvatar variant="accent" />
</LxFlex>

<details>
<summary>Show code</summary>

```html
<LxFlex align="center" gap="md">
	<LxAvatar src="https://i.pravatar.cc/80?img=12" alt="Priya Shah" />
	<LxAvatar initials="ps" variant="secondary" />
	<LxAvatar variant="accent" />
</LxFlex>
```
</details>

## Fallback Order

The avatar fallback order is:

1. `src`
2. `initials`
3. `user` icon

## Variants

When the avatar is showing initials or the fallback icon, the `variant` controls the background colour and uses the matching `--lx-colour-on-*` token for content.

<LxFlex align="center" gap="md" wrap>
	<LxAvatar v-for="variant in COLOURS" :key="variant" :variant="variant" initials="AB" />
</LxFlex>

<details>
<summary>Show code</summary>

```html
<LxFlex align="center" gap="md" wrap>
	<LxAvatar v-for="variant in COLOURS" :key="variant" :variant="variant" initials="AB" />
</LxFlex>
```
</details>

## Sizes

<LxFlex align="center" gap="md" wrap>
	<LxAvatar v-for="size in SIZES" :key="size" :size="size" initials="AB" />
</LxFlex>

<details>
<summary>Show code</summary>

```html
<LxFlex align="center" gap="md" wrap>
	<LxAvatar v-for="size in SIZES" :key="size" :size="size" initials="AB" />
</LxFlex>
```
</details>

## Data URLs

The `src` prop can also accept base64 or data URL strings directly.

<LxFlex align="center" gap="md">
	<LxAvatar src="https://i.pravatar.cc/80?img=24" alt="Jordan Lee" />
	<LxAvatar src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' fill='%2300aeff'/%3E%3Ccircle cx='32' cy='24' r='12' fill='white'/%3E%3Cpath d='M14 56c4-10 14-16 18-16s14 6 18 16' fill='white'/%3E%3C/svg%3E" alt="Generated avatar" />
</LxFlex>

<details>
<summary>Show code</summary>

```html
<LxFlex align="center" gap="md">
	<LxAvatar src="https://i.pravatar.cc/80?img=24" alt="Jordan Lee" />
	<LxAvatar src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' fill='%2300aeff'/%3E%3Ccircle cx='32' cy='24' r='12' fill='white'/%3E%3Cpath d='M14 56c4-10 14-16 18-16s14 6 18 16' fill='white'/%3E%3C/svg%3E" alt="Generated avatar" />
</LxFlex>
```
</details>
