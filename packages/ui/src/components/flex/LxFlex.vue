<template>
	<component
		:is="props.as"
		v-bind="attrs"
		class="lx-flex"
		:class="{
			'lx-flex--inline': props.inline,
			'lx-flex--full-width': props.fullWidth,
		}"
		:style="flexStyle"
	>
		<slot />
	</component>
</template>

<script setup lang="ts">
	import { computed, useAttrs } from 'vue';
	import type { CSSProperties } from 'vue';
	import type { ILxFlexProps, TLxFlexAlign, TLxFlexJustify } from './types';

	const props = withDefaults(defineProps<ILxFlexProps>(), {
		as: 'div',
		gap: 'var(--lx-size-space-md)',
		rowGap: undefined,
		columnGap: undefined,
		wrap: false,
		inline: false,
		column: false,
		reverse: false,
		direction: undefined,
		align: undefined,
		justify: undefined,
		fullWidth: false,
	});

	const attrs = useAttrs();

	const alignMap: Record<TLxFlexAlign, CSSProperties['alignItems']> = {
		start: 'flex-start',
		center: 'center',
		end: 'flex-end',
		stretch: 'stretch',
		baseline: 'baseline',
	};

	const justifyMap: Record<TLxFlexJustify, CSSProperties['justifyContent']> = {
		start: 'flex-start',
		center: 'center',
		end: 'flex-end',
		between: 'space-between',
		around: 'space-around',
		evenly: 'space-evenly',
	};

	const resolvedDirection = computed<CSSProperties['flexDirection']>(() => {
		if (props.direction) {
			return props.direction;
		}

		if (props.column) {
			return props.reverse ? 'column-reverse' : 'column';
		}

		return props.reverse ? 'row-reverse' : 'row';
	});

	const resolvedGap = computed(() => props.gap || '0');
	const resolvedRowGap = computed(() => props.rowGap || resolvedGap.value);
	const resolvedColumnGap = computed(() => props.columnGap || resolvedGap.value);

	const flexStyle = computed<CSSProperties>(() => ({
		flexDirection: resolvedDirection.value,
		flexWrap: props.wrap ? 'wrap' : 'nowrap',
		rowGap: resolvedRowGap.value,
		columnGap: resolvedColumnGap.value,
		alignItems: props.align ? alignMap[props.align] : 'center',
		justifyContent: props.justify ? justifyMap[props.justify] : undefined,
	}));
</script>

<style lang="scss" scoped>
	.lx-flex {
		display: flex;
	}

	.lx-flex--inline {
		display: inline-flex;
	}

	.lx-flex--full-width {
		width: 100%;
	}
</style>
