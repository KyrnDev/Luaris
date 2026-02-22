<template>
	<div class="lx-split-pane" :class="`is-${props.orientation}`">
		<div class="lx-split-pane__panel lx-split-pane__panel--first" :style="firstStyle">
			<slot name="first" />
		</div>
		<button type="button" class="lx-split-pane__divider" @mousedown="startDrag" />
		<div class="lx-split-pane__panel lx-split-pane__panel--second">
			<slot name="second" />
		</div>
	</div>
</template>

<script setup lang='ts'>
	import { computed } from 'vue';
	import type { ILxSplitPaneProps } from './types';

	const props = withDefaults(defineProps<ILxSplitPaneProps>(), {
		modelValue: 50,
		orientation: 'horizontal',
		min: 10,
		max: 90,
	});

	const model = defineModel<number>({
		default: 50,
	});

	const firstStyle = computed(() => {
		const percent = `${model.value}%`;
		return props.orientation === 'horizontal'
			? { width: percent }
			: { height: percent };
	});

	const onMove = (event: MouseEvent): void => {
		const parent = (event.currentTarget as Document).querySelector('.lx-split-pane') as HTMLElement | null;
		if (!parent) {
			return;
		}
		const rect = parent.getBoundingClientRect();
		const ratio = props.orientation === 'horizontal'
			? ((event.clientX - rect.left) / rect.width) * 100
			: ((event.clientY - rect.top) / rect.height) * 100;
		model.value = Math.min(props.max, Math.max(props.min, Math.round(ratio)));
	};

	const stopDrag = (): void => {
		document.removeEventListener('mousemove', onMove);
		document.removeEventListener('mouseup', stopDrag);
	};

	const startDrag = (): void => {
		document.addEventListener('mousemove', onMove);
		document.addEventListener('mouseup', stopDrag);
	};
</script>

<style scoped lang='scss'>
	.lx-split-pane {
		background: var(--lx-colour-surface-raised);
		border: var(--lx-size-border-width-hairline) solid var(--lx-colour-surface-border);
		border-radius: var(--lx-size-radius-md);
		display: flex;
		overflow: hidden;
	}

	.lx-split-pane.is-vertical {
		flex-direction: column;
	}

	.lx-split-pane__panel {
		overflow: auto;
		padding: var(--lx-size-space-sm);
	}

	.lx-split-pane__panel--second {
		flex: 1;
	}

	.lx-split-pane__divider {
		background: var(--lx-colour-surface-border);
		border: none;
		cursor: col-resize;
		width: 0.5rem;
	}

	.lx-split-pane.is-vertical .lx-split-pane__divider {
		cursor: row-resize;
		height: 0.5rem;
		width: auto;
	}
</style>
