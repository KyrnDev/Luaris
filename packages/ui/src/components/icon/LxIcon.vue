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
		variant: 'solid',
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

	const iconStyleClasses = new Set(Object.values(stylePrefixMap).flat());
	const iconUtilityClasses = new Set(['fa-spin', 'fa-pulse', 'fa-fw']);

	const parsedNameClasses = computed(() => {
		const rawName = props.name.trim();
		if (!rawName) return [];

		const rawTokens = rawName.split(/\s+/).filter(Boolean);

		return rawTokens.map(token => {
			if (token.startsWith('fa-')) return token;
			if (rawTokens.length === 1) return `fa-${token}`;
			return token;
		});
	});

	const hasExplicitStyle = computed(() => {
		return parsedNameClasses.value.some(iconClass => iconStyleClasses.has(iconClass));
	});

	const resolvedBaseClasses = computed(() => {
		const classes = hasExplicitStyle.value
			? [...parsedNameClasses.value]
			: [...stylePrefixMap[props.variant], ...parsedNameClasses.value];

		return [...new Set(classes)];
	});

	const getSize = computed(() => {
		return `var(--lx-size-control-icon-${props.size})`;
	});

	const accessibleLabel = computed(() => {
		if (props.label) return props.label;

		const iconClass = [...parsedNameClasses.value].reverse().find(token => {
			return token.startsWith('fa-') && !iconStyleClasses.has(token) && !iconUtilityClasses.has(token);
		});

		if (!iconClass) return props.name.replaceAll('-', ' ');
		return iconClass.replace(/^fa-/, '').replaceAll('-', ' ');
	});

	const iconClasses = computed(() => {
		const classes = [...resolvedBaseClasses.value];

		if (props.spin) classes.push('fa-spin');
		if (props.pulse) classes.push('fa-pulse');
		if (props.fixedWidth) classes.push('fa-fw');

		return [...new Set(classes)];
	});

	const { decorative } = props;
</script>

<style scoped lang="scss">
	i {
		display: inline-block;
		line-height: 1;
	}
</style>
