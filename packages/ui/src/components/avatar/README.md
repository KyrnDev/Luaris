# LxAvatar

`LxAvatar` displays a user/avatar image with a fallback to initials when no image is available (or when image loading fails).

It also supports semantic variants, size options, and an optional interactive mode.

## Import

```ts
import { LxAvatar } from '@luaris/ui';
```

```ts
import { LxAvatar } from '@luaris/ui/components/avatar';
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `src` | `string` | `''` | Image URL for the avatar. |
| `alt` | `string` | `''` | Accessible alt text for the avatar image. |
| `name` | `string` | `''` | Used to build fallback initials (first two name parts). |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Avatar size. |
| `variant` | `TVariant` | `'secondary'` | Colour variant (`primary`, `secondary`, `accent`, `info`, `success`, `warning`, `danger`, etc). |
| `clickable` | `boolean` | `false` | Makes the avatar interactive (button semantics + keyboard activation). |

## Emits

| Event | Payload | Description |
| --- | --- | --- |
| `activate` | none | Emitted when interactive avatar is clicked or activated with `Enter`/`Space`. |

## Slots

This component has no slots.

## Theme Tokens Used

`LxAvatar` uses the following theme tokens:

- `--lx-colour-primary`
- `--lx-colour-secondary`
- `--lx-colour-accent`
- `--lx-colour-info`
- `--lx-colour-success`
- `--lx-colour-warning`
- `--lx-colour-danger`
- `--lx-colour-on-primary`
- `--lx-colour-on-secondary`
- `--lx-colour-on-accent`
- `--lx-colour-on-info`
- `--lx-colour-on-success`
- `--lx-colour-on-warning`
- `--lx-colour-on-danger`
- `--lx-colour-focus-ring`
- `--lx-size-border-width-hairline`
- `--lx-size-border-width-standard`
- `--lx-size-radius-pill`
- `--lx-font-size-xs`
- `--lx-font-size-sm`
- `--lx-font-size-md`
- `--lx-font-size-lg`
- `--lx-font-weight-bold`

## Examples

### Basic

```vue
<script setup lang="ts">
	import { LxAvatar } from '@luaris/ui';
</script>

<template>
	<LxAvatar name="Ada Lovelace" />
</template>
```

### Image Avatar

```vue
<script setup lang="ts">
	import { LxAvatar } from '@luaris/ui';
</script>

<template>
	<LxAvatar
		src="https://example.com/avatar.jpg"
		alt="Profile photo of Marie Curie"
		name="Marie Curie"
		size="lg"
		variant="primary"
	/>
</template>
```

### Interactive Avatar

```vue
<script setup lang="ts">
	import { LxAvatar } from '@luaris/ui';

	const onAvatarActivate = () => {
		console.log('Avatar activated');
	};
</script>

<template>
	<LxAvatar
		name="Grace Hopper"
		variant="accent"
		clickable
		@activate="onAvatarActivate"
	/>
</template>
```

## Style Overrides

You can override component-level CSS custom properties for quick customisation:

```vue
<template>
	<LxAvatar class="team-avatar" name="Linus Torvalds" />
</template>

<style scoped>
	.team-avatar {
		--lx-avatar-background: var(--lx-colour-info);
		--lx-avatar-foreground: var(--lx-colour-on-info);
	}
</style>
```

You can also target size/variant classes directly if you need full control:

```scss
.lx-avatar--lg {
	height: 4rem;
	width: 4rem;
}
```
