<template>
	<div
		v-click-outside="onClickOutside"
		class="lx-popover"
		:class="[`lx-popover--${props.placement}`, `lx-popover--padding-${props.padding}`]"
		@mouseenter="onMouseEnter"
		@mouseleave="onMouseLeave"
	>
		<div class="lx-popover__trigger" @click="onTriggerClick">
			<slot name="trigger">
				<button type="button" class="lx-popover__default-trigger">
					Toggle Popover
				</button>
			</slot>
		</div>

		<div
			v-if="open"
			class="lx-popover__panel"
			role="dialog"
			@keydown.esc="close"
		>
			<slot />
		</div>
	</div>
</template>

<script setup lang='ts'>
	import { ref, watch } from 'vue';
	import { vClickOutside as vClickOutsideDirective } from '../../directives/clickOutside';
	import type { ILxPopoverProps } from './types';

	const props = withDefaults(defineProps<ILxPopoverProps>(), {
		placement: 'bottom',
		trigger: 'click',
		disabled: false,
		padding: 'md',
	});

	const model = defineModel<boolean>({
		default: false,
	});
	const vClickOutside = vClickOutsideDirective;

	const open = ref(model.value);

	const syncOpen = (nextValue: boolean): void => {
		open.value = nextValue;
		model.value = nextValue;
	};

	const close = (): void => {
		syncOpen(false);
	};

	const onTriggerClick = (): void => {
		if (props.disabled || props.trigger !== 'click') {
			return;
		}

		syncOpen(!open.value);
	};

	const onMouseEnter = (): void => {
		if (props.disabled || props.trigger !== 'hover') {
			return;
		}

		syncOpen(true);
	};

	const onMouseLeave = (): void => {
		if (props.disabled || props.trigger !== 'hover') {
			return;
		}

		syncOpen(false);
	};

	const onClickOutside = (): void => {
		if (props.trigger === 'click') {
			close();
		}
	};

	watch(model, nextValue => {
		open.value = nextValue;
	});
</script>

<style scoped lang='scss'>
	.lx-popover {
		position: relative;
		width: fit-content;
	}

	.lx-popover__default-trigger {
		background: var(--lx-colour-surface-raised);
		border: var(--lx-size-border-width-hairline) solid var(--lx-colour-surface-border);
		border-radius: var(--lx-size-radius-sm);
		color: var(--lx-colour-surface-text);
		cursor: pointer;
		font: inherit;
		min-height: var(--lx-size-control-height-sm);
		padding: 0 var(--lx-size-space-sm);
	}

	.lx-popover__panel {
		--lx-popover-padding: var(--lx-size-space-md);
		background: var(--lx-colour-surface-overlay);
		border: var(--lx-size-border-width-hairline) solid var(--lx-colour-surface-border);
		border-radius: var(--lx-size-radius-md);
		box-shadow: 0 18px 34px rgb(0 0 0 / 0.16);
		color: var(--lx-colour-surface-text);
		min-width: 12rem;
		padding: var(--lx-popover-padding);
		position: absolute;
		z-index: 50;
	}

	.lx-popover--padding-sm .lx-popover__panel {
		--lx-popover-padding: var(--lx-size-space-sm);
	}

	.lx-popover--padding-md .lx-popover__panel {
		--lx-popover-padding: var(--lx-size-space-md);
	}

	.lx-popover--padding-lg .lx-popover__panel {
		--lx-popover-padding: var(--lx-size-space-lg);
	}

	.lx-popover--padding-xl .lx-popover__panel {
		--lx-popover-padding: var(--lx-size-space-xl);
	}

	.lx-popover--bottom .lx-popover__panel {
		left: 0;
		top: calc(100% + var(--lx-size-space-xs));
	}

	.lx-popover--top .lx-popover__panel {
		bottom: calc(100% + var(--lx-size-space-xs));
		left: 0;
	}

	.lx-popover--left .lx-popover__panel {
		right: calc(100% + var(--lx-size-space-xs));
		top: 0;
	}

	.lx-popover--right .lx-popover__panel {
		left: calc(100% + var(--lx-size-space-xs));
		top: 0;
	}
</style>
