<template>
	<span
		class="lx-tooltip"
		:class="`lx-tooltip--${props.placement}`"
		:data-disabled="props.disabled ? 'true' : 'false'"
	>
		<span class="lx-tooltip__trigger" :aria-describedby="tooltipId">
			<slot>
				<LxIcon
					:name="props.icon"
					:icon-style="props.iconStyle"
					:label="props.iconLabel"
					:decorative="false"
					size="sm"
				/>
			</slot>
		</span>
		<span :id="tooltipId" role="tooltip" class="lx-tooltip__content">
			{{ props.text }}
		</span>
	</span>
</template>

<script setup lang='ts'>
	import { useId } from 'vue';
	import { LxIcon } from '../icon';
	import type { ILxTooltipProps } from './types';

	const props = withDefaults(defineProps<ILxTooltipProps>(), {
		placement: 'top',
		icon: 'circle-question',
		iconStyle: 'regular',
		iconLabel: 'Help',
		disabled: false,
	});

	const tooltipId = `lx-tooltip-${useId().replace(/:/g, '')}`;
</script>

<style scoped lang='scss'>
	.lx-tooltip {
		display: inline-flex;
		position: relative;
		vertical-align: middle;
	}

	.lx-tooltip__trigger {
		align-items: center;
		color: inherit;
		display: inline-flex;
		line-height: 1;
	}

	.lx-tooltip__content {
		background: var(--lx-colour-surface-overlay);
		border: var(--lx-size-border-width-hairline) solid var(--lx-colour-surface-border);
		border-radius: var(--lx-size-radius-sm);
		box-shadow: 0 8px 24px rgb(0 0 0 / 0.24);
		color: var(--lx-colour-surface-text);
		font-size: var(--lx-font-size-xs);
		left: 50%;
		opacity: 0;
		padding: var(--lx-size-space-2xs) var(--lx-size-space-xs);
		pointer-events: none;
		position: absolute;
		transform: translate(-50%, -0.35rem);
		transition: opacity 0.15s ease;
		visibility: hidden;
		white-space: nowrap;
		z-index: 80;
	}

	.lx-tooltip--top .lx-tooltip__content {
		bottom: calc(100% + var(--lx-size-space-2xs));
	}

	.lx-tooltip--bottom .lx-tooltip__content {
		top: calc(100% + var(--lx-size-space-2xs));
		transform: translate(-50%, 0.35rem);
	}

	.lx-tooltip--left .lx-tooltip__content {
		left: auto;
		right: calc(100% + var(--lx-size-space-2xs));
		top: 50%;
		transform: translate(-0.35rem, -50%);
	}

	.lx-tooltip--right .lx-tooltip__content {
		left: calc(100% + var(--lx-size-space-2xs));
		top: 50%;
		transform: translate(0.35rem, -50%);
	}

	.lx-tooltip[data-disabled='false']:hover .lx-tooltip__content,
	.lx-tooltip[data-disabled='false']:focus-within .lx-tooltip__content {
		opacity: 1;
		visibility: visible;
	}

	.lx-tooltip[data-disabled='true'] .lx-tooltip__content {
		display: none;
	}
</style>
