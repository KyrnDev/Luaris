# LxBreadcrumbs

The breadcrumbs component set provides hierarchical navigation for page location and path context.

This folder contains:

- `LxBreadcrumbs`: full breadcrumb navigation component driven by `items`.
- `LxBreadcrumb`: lightweight list item wrapper for custom breadcrumb markup.

## Import

```ts
import { LxBreadcrumb, LxBreadcrumbs } from '@luaris/ui';
```

```ts
import { LxBreadcrumb, LxBreadcrumbs } from '@luaris/ui/components/breadcrumbs';
```

## LxBreadcrumbs

### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `items` | `ILxBreadcrumbItem[]` | `[]` | Breadcrumb items in order. Last item is treated as current page. |

`ILxBreadcrumbItem`:

| Field | Type | Description |
| --- | --- | --- |
| `label` | `string` | Item text. |
| `href` | `string \| undefined` | Optional link for navigable items. |

### Emits

This component has no emits.

### Slots

| Slot | Description |
| --- | --- |
| `default` | Additional custom `<li>` entries appended inside the root `<ol>`. |

### Theme Tokens Used

- `--lx-size-space-sm`
- `--lx-colour-surface-text-muted`
- `--lx-colour-surface-text`
- `--lx-colour-primary`
- `--lx-font-size-sm`
- `--lx-font-size-xs`
- `--lx-font-weight-semibold`
- `--lx-motion-duration-fast`
- `--lx-motion-easing-standard`

### Example

```vue
<script setup lang="ts">
	import { LxBreadcrumbs } from '@luaris/ui';

	const items = [
		{ label: 'Home', href: '/' },
		{ label: 'Components', href: '/components' },
		{ label: 'Buttons' },
	];
</script>

<template>
	<LxBreadcrumbs :items="items" />
</template>
```

### Example with Slot

```vue
<script setup lang="ts">
	import { LxBreadcrumbs } from '@luaris/ui';

	const items = [
		{ label: 'Home', href: '/' },
		{ label: 'Settings' },
	];
</script>

<template>
	<LxBreadcrumbs :items="items">
		<li class="lx-breadcrumbs__separator" aria-hidden="true">/</li>
		<li class="lx-breadcrumbs__item is-current">Advanced</li>
	</LxBreadcrumbs>
</template>
```

## LxBreadcrumb

### Props

This component has no props.

### Emits

This component has no emits.

### Slots

| Slot | Description |
| --- | --- |
| `default` | Breadcrumb item content. |

### Theme Tokens Used

- `--lx-size-space-sm`

### Example

```vue
<script setup lang="ts">
	import { LxBreadcrumb } from '@luaris/ui';
</script>

<template>
	<ul>
		<LxBreadcrumb>
			<a href="/">Home</a>
		</LxBreadcrumb>
	</ul>
</template>
```

## Style Overrides

You can tune breadcrumb styles with class overrides:

```vue
<template>
	<LxBreadcrumbs class="project-breadcrumbs" :items="items" />
</template>

<style scoped>
	.project-breadcrumbs :deep(.lx-breadcrumbs__item a) {
		text-decoration-color: currentColor;
		font-weight: 600;
	}

	.project-breadcrumbs :deep(.lx-breadcrumbs__separator) {
		opacity: 0.6;
	}
</style>
```
