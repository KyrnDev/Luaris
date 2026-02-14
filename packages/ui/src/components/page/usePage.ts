import { computed, useSlots } from 'vue';

export default function usePage() {
	const slots = useSlots();
	const hasHeader = computed(() => !!slots.header);
	const hasSubheader = computed(() => !!slots.subheader);
	const hasNavigation = computed(() => !!slots.navigation);
	const hasContentHeader = computed(() => !!slots['content-header']);
	const hasContent = computed(() => !!slots.content || !!slots.default);
	const hasContentFooter = computed(() => !!slots['content-footer']);
	const hasAside = computed(() => !!slots.aside);
	const hasFooter = computed(() => !!slots.footer);

	const getRootTemplateAreas = computed(() => {
		const areas = [];
		const mainAreas = [];

		if (hasNavigation.value) mainAreas.push('navigation');
		if (hasContent.value) mainAreas.push('content');
		if (hasAside.value) mainAreas.push('aside');

		const columnCount = mainAreas.length || 1;
		const repeat = (name: string) => Array.from({ length: columnCount }, () => name).join(' ');

		if (hasHeader.value) areas.push(`"${repeat('header')}"`);
		if (hasSubheader.value) areas.push(`"${repeat('subheader')}"`);
		if (mainAreas.length) areas.push(`"${mainAreas.join(' ')}"`);
		if (hasFooter.value) areas.push(`"${repeat('footer')}"`);
		return areas.join(' ');
	});

	const getContentTemplateAreas = computed(() => {
		const areas = [];
		if (hasContentHeader.value) areas.push('"content-header"');
		if (hasContent.value) areas.push('"content"');
		if (hasContentFooter.value) areas.push('"content-footer"');
		return areas.join(' ');
	});

	const getRootColumns = computed(() => {
		const columns = [];
		if (hasNavigation.value) columns.push('var(--lx-size-layout-sidebar-width)');
		if (hasContent.value) columns.push('1fr');
		if (hasAside.value) columns.push('var(--lx-size-layout-sidebar-width)');
		return columns.join(' ');
	});

	const getRootRows = computed(() => {
		const rows = [];
		if (hasHeader.value) rows.push('auto');
		if (hasSubheader.value) rows.push('auto');
		if (hasNavigation.value || hasContent.value || hasAside.value) rows.push('minmax(0, 1fr)');
		if (hasFooter.value) rows.push('auto');
		return rows.join(' ');
	});

	const getContentRows = computed(() => {
		const rows = [];
		if (hasContentHeader.value) rows.push('auto');
		if (hasContent.value) rows.push('minmax(0, 1fr)');
		if (hasContentFooter.value) rows.push('auto');
		return rows.join(' ');
	});

	return {
		hasHeader,
		hasAside,
		hasFooter,
		hasContent,
		getRootRows,
		hasSubheader,
		hasNavigation,
		getContentRows,
		getRootColumns,
		hasContentHeader,
		hasContentFooter,
		getRootTemplateAreas,
		getContentTemplateAreas,
	};
}
