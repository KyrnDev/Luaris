<template>
	<i :class="iconClasses" :aria-hidden="decorative ? 'true' : undefined" :aria-label="decorative ? undefined : label" />
</template>

<script setup lang="ts">
	import type { ILxIconProps, TLxIconSize, TLxIconStyle } from './types';
	import { computed } from 'vue';

	const props = withDefaults(defineProps<ILxIconProps>(), {
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

	const getSizeClass = (size: TLxIconSize): string => {
		switch (size) {
		case 'xs': return 'fa-xs';
		case 'sm': return 'fa-sm';
		case 'lg': return 'fa-lg';
		case 'xl': return 'fa-xl';
		case '2xl': return 'fa-2xl';
		default: return '';
		}
	};

	const iconClasses = computed(() => {
		const classes = [
			...stylePrefixMap[props.iconStyle],
			`fa-${props.name}`,
		];

		const sizeClass = getSizeClass(props.size);
		if (sizeClass) classes.push(sizeClass);
		if (props.spin) classes.push('fa-spin');
		if (props.pulse) classes.push('fa-pulse');
		if (props.fixedWidth) classes.push('fa-fw');

		return classes;
	});

	const { decorative, label } = props;
</script>

<style scoped lang="scss">
	i {
		display: inline-block;
		line-height: 1;
	}
</style>
