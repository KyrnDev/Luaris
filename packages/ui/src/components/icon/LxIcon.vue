<template>
	<i
		:class="iconClasses"
		:style="{
			fontSize: getSize,
		}"
		:role="decorative ? undefined : 'img'"
		:aria-hidden="decorative ? 'true' : undefined"
		:aria-label="decorative ? undefined : accessibleLabel"
	/>
</template>

<script setup lang="ts">
	import type { TLxIconProps, TLxIconStyle } from './types';
	import { computed } from 'vue';

	const props = withDefaults(defineProps<TLxIconProps>(), {
		iconStyle: 'solid',
		size: 'md',
		spin: false,
		pulse: false,
		fixedWidth: false,
		label: '',
		decorative: true,
	});

	const stylePrefixMap: Record<TLxIconStyle, string[]> = {
		'solid': ['fa-solid'],
		'regular': ['fa-regular'],
		'brands': ['fa-brands'],
		'light': ['fa-light'],
		'duotone': ['fa-duotone'],
		'thin': ['fa-thin'],
		'sharp-solid': ['fa-sharp', 'fa-solid'],
		'sharp-regular': ['fa-sharp', 'fa-regular'],
		'sharp-light': ['fa-sharp', 'fa-light'],
		'sharp-thin': ['fa-sharp', 'fa-thin'],
		'sharp-duotone': ['fa-sharp-duotone'],
	};

	const getSize = computed(() => {
		return `var(--lx-font-size-${props.size})`;
	});

	const accessibleLabel = computed(() => {
		if (props.label) return props.label;
		return props.name.replaceAll('-', ' ');
	});

	const iconClasses = computed(() => {
		const classes = [
			...stylePrefixMap[props.iconStyle],
			`fa-${props.name}`,
		];

		if (props.spin) classes.push('fa-spin');
		if (props.pulse) classes.push('fa-pulse');
		if (props.fixedWidth) classes.push('fa-fw');

		return classes;
	});

	const { decorative } = props;
</script>

<style scoped lang="scss">
	i {
		display: inline-block;
		line-height: 1;
	}
</style>
