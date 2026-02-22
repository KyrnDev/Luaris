<template>
	<div class="lx-resizable" :style="panelStyle">
		<div class="lx-resizable__content">
			<slot />
		</div>
		<button type="button" class="lx-resizable__handle" @pointerdown="startResize" />
	</div>
</template>

<script setup lang='ts'>
	import { computed, ref, watch } from 'vue';
	import type { ILxResizableProps, ILxResizableSize } from './types';

	const props = withDefaults(defineProps<ILxResizableProps>(), {
		mode: 'both',
		minWidth: 200,
		minHeight: 120,
		maxWidth: 1200,
		maxHeight: 900,
	});

	const model = defineModel<ILxResizableSize>({
		default: () => ({ width: 420, height: 260 }),
	});

	const liveSize = ref<ILxResizableSize>({
		width: model.value.width,
		height: model.value.height,
	});

	watch(model, next => {
		liveSize.value = {
			width: next.width,
			height: next.height,
		};
	});

	const panelStyle = computed(() => ({
		width: `${liveSize.value.width}px`,
		height: `${liveSize.value.height}px`,
	}));

	let startX = 0;
	let startY = 0;
	let startWidth = 0;
	let startHeight = 0;
	let frameId = 0;
	let pendingSize: ILxResizableSize | null = null;

	const commitFrame = (): void => {
		frameId = 0;
		if (!pendingSize) {
			return;
		}
		liveSize.value = pendingSize;
		pendingSize = null;
	};

	const onMove = (event: PointerEvent): void => {
		const nextWidth = props.mode !== 'vertical'
			? Math.min(props.maxWidth, Math.max(props.minWidth, startWidth + (event.clientX - startX)))
			: liveSize.value.width;
		const nextHeight = props.mode !== 'horizontal'
			? Math.min(props.maxHeight, Math.max(props.minHeight, startHeight + (event.clientY - startY)))
			: liveSize.value.height;
		pendingSize = { width: nextWidth, height: nextHeight };
		if (frameId === 0) {
			frameId = window.requestAnimationFrame(commitFrame);
		}
	};

	const stopResize = (): void => {
		document.removeEventListener('pointermove', onMove);
		document.removeEventListener('pointerup', stopResize);
		document.removeEventListener('pointercancel', stopResize);
		if (frameId !== 0) {
			window.cancelAnimationFrame(frameId);
			frameId = 0;
		}
		if (pendingSize) {
			liveSize.value = pendingSize;
			pendingSize = null;
		}
		model.value = {
			width: liveSize.value.width,
			height: liveSize.value.height,
		};
	};

	const startResize = (event: PointerEvent): void => {
		startX = event.clientX;
		startY = event.clientY;
		startWidth = liveSize.value.width;
		startHeight = liveSize.value.height;
		document.addEventListener('pointermove', onMove);
		document.addEventListener('pointerup', stopResize);
		document.addEventListener('pointercancel', stopResize);
	};
</script>

<style scoped lang='scss'>
	.lx-resizable {
		background: var(--lx-colour-surface-raised);
		border: var(--lx-size-border-width-hairline) solid var(--lx-colour-surface-border);
		border-radius: var(--lx-size-radius-md);
		display: grid;
		grid-template-rows: 1fr auto;
		overflow: hidden;
	}

	.lx-resizable__content {
		overflow: auto;
		padding: var(--lx-size-space-sm);
	}

	.lx-resizable__handle {
		background: var(--lx-colour-surface-border);
		border: none;
		cursor: nwse-resize;
		height: 0.65rem;
		justify-self: end;
		width: 0.65rem;
	}
</style>
