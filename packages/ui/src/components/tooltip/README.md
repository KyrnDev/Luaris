# LxTooltip

`LxTooltip` shows short helper text on hover/focus.

By default it renders a help icon trigger using `LxIcon`, but you can replace that trigger using the default slot.

## Import

```ts
import { LxTooltip } from '@luaris/ui';
```

```ts
import { LxTooltip } from '@luaris/ui/components/tooltip';
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `text` | `string` | required | Tooltip content text. |
| `placement` | `'top' \| 'right' \| 'bottom' \| 'left'` | `'top'` | Tooltip position relative to trigger. |
| `icon` | `string` | `'circle-question'` | Icon name for default trigger. |
| `iconStyle` | `TLxIconStyle` | `'regular'` | Icon style for default trigger. |
| `iconLabel` | `string` | `'Help'` | Accessible label for default icon trigger. |
| `disabled` | `boolean` | `false` | Disables tooltip display. |

## Emits

This component has no emits.

## Slots

| Slot | Description |
| --- | --- |
| `default` | Custom trigger element/content. Replaces default `LxIcon` trigger. |

## Theme Tokens Used

- `--lx-colour-surface-overlay`
- `--lx-colour-surface-border`
- `--lx-colour-surface-text`
- `--lx-size-border-width-hairline`
- `--lx-size-radius-sm`
- `--lx-size-space-2xs`
- `--lx-size-space-xs`
- `--lx-font-size-xs`

## Examples

### Default Help Icon Trigger

```vue
<script setup lang="ts">
	import { LxTooltip } from '@luaris/ui';
</script>

<template>
	<LxTooltip text="This setting controls automatic sync." />
</template>
```

### Custom Trigger Slot

```vue
<script setup lang="ts">
	import { LxButton, LxTooltip } from '@luaris/ui';
</script>

<template>
	<LxTooltip text="Clicking this clears all filters" placement="bottom">
		<LxButton variant="plain" size="xs">What does this do?</LxButton>
	</LxTooltip>
</template>
```

### Disabled Tooltip

```vue
<template>
	<LxTooltip text="This will not show" :disabled="true" />
</template>
```

## Style Overrides

```vue
<template>
	<LxTooltip class="dark-tooltip" text="Advanced info" />
</template>

<style scoped>
	.dark-tooltip :deep(.lx-tooltip__content) {
		background: #111827;
		color: #f9fafb;
	}
</style>
```
