<template>
	<nav class="lx-pagination" aria-label="Pagination">
		<div class="lx-pagination__summary">
			Page {{ page }} of {{ totalPages }} ({{ props.total }} items)
		</div>

		<div class="lx-pagination__controls">
			<LxButton
				size="xs"
				variant="ghost"
				:disabled="props.disabled || page <= 1"
				@click="setPage(page - 1)"
			>
				Previous
			</LxButton>

			<button
				v-for="item in pageItems"
				:key="item.key"
				class="lx-pagination__page"
				:class="{ 'is-active': item.page === page }"
				:disabled="props.disabled || item.page === null"
				type="button"
				@click="item.page && setPage(item.page)"
			>
				{{ item.label }}
			</button>

			<LxButton
				size="xs"
				variant="ghost"
				:disabled="props.disabled || page >= totalPages"
				@click="setPage(page + 1)"
			>
				Next
			</LxButton>
		</div>

		<label v-if="props.showPageSize" class="lx-pagination__size">
			<span>Rows per page</span>
			<select v-model.number="currentPageSize" :disabled="props.disabled">
				<option v-for="size in props.pageSizeOptions" :key="size" :value="size">
					{{ size }}
				</option>
			</select>
		</label>
		<template v-else />
	</nav>
</template>

<script setup lang='ts'>
	import { computed } from 'vue';
	import { LxButton } from '../button';
	import type { ILxPaginationProps } from './types';

	interface IPageItem {
		key: string,
		label: string,
		page: number | null,
	}

	const props = withDefaults(defineProps<ILxPaginationProps>(), {
		total: 0,
		pageSize: 25,
		maxButtons: 7,
		showPageSize: false,
		pageSizeOptions: () => [10, 25, 50, 100],
		disabled: false,
	});

	const emit = defineEmits<{
		(event: 'change', page: number): void,
		(event: 'update:pageSize', pageSize: number): void,
	}>();

	const pageModel = defineModel<number>({
		default: 1,
	});

	const totalPages = computed(() => Math.max(Math.ceil(props.total / props.pageSize), 1));
	const page = computed(() => Math.min(Math.max(pageModel.value, 1), totalPages.value));

	const setPage = (nextPage: number): void => {
		const safePage = Math.min(Math.max(nextPage, 1), totalPages.value);
		pageModel.value = safePage;
		emit('change', safePage);
	};

	const currentPageSize = computed({
		get: () => props.pageSize,
		set: (value: number) => {
			emit('update:pageSize', value);
			setPage(1);
		},
	});

	const pageItems = computed<IPageItem[]>(() => {
		const max = Math.max(props.maxButtons, 3);
		if (totalPages.value <= max) {
			return Array.from({ length: totalPages.value }, (item, index) => {
				void item;
				return {
					key: `page-${index + 1}`,
					label: String(index + 1),
					page: index + 1,
				};
			});
		}

		const firstPage = 1;
		const lastPage = totalPages.value;
		const middleSlots = max - 2;
		let start = Math.max(page.value - Math.floor(middleSlots / 2), 2);
		let end = start + middleSlots - 1;

		if (end >= lastPage) {
			end = lastPage - 1;
			start = end - middleSlots + 1;
		}

		const items: IPageItem[] = [
			{ key: 'first', label: '1', page: firstPage },
		];

		if (start > 2) {
			items.push({ key: 'ellipsis-start', label: '…', page: null });
		}

		for (let pageNumber = start; pageNumber <= end; pageNumber += 1) {
			items.push({
				key: `page-${pageNumber}`,
				label: String(pageNumber),
				page: pageNumber,
			});
		}

		if (end < lastPage - 1) {
			items.push({ key: 'ellipsis-end', label: '…', page: null });
		}

		items.push({ key: 'last', label: String(lastPage), page: lastPage });
		return items;
	});
</script>

<style scoped lang='scss'>
	.lx-pagination {
		align-items: center;
		display: grid;
		gap: var(--lx-size-space-sm);
		grid-template-columns: repeat(auto-fit, minmax(12rem, auto));
	}

	.lx-pagination__summary {
		color: var(--lx-colour-surface-text-muted);
		font-size: var(--lx-font-size-sm);
	}

	.lx-pagination__controls {
		align-items: center;
		display: inline-flex;
		flex-wrap: wrap;
		gap: var(--lx-size-space-xs);
	}

	.lx-pagination__page {
		background: var(--lx-colour-surface-raised);
		border: var(--lx-size-border-width-hairline) solid var(--lx-colour-surface-border);
		border-radius: var(--lx-size-radius-sm);
		color: var(--lx-colour-surface-text);
		cursor: pointer;
		font: inherit;
		font-size: var(--lx-font-size-xs);
		min-width: 2rem;
		padding: var(--lx-size-space-xs) var(--lx-size-space-sm);
	}

	.lx-pagination__page.is-active {
		background: color-mix(in srgb, var(--lx-colour-primary) 20%, transparent);
		border-color: var(--lx-colour-primary);
		color: var(--lx-colour-primary);
	}

	.lx-pagination__page:disabled {
		cursor: default;
		opacity: 0.7;
	}

	.lx-pagination__size {
		align-items: center;
		display: inline-flex;
		gap: var(--lx-size-space-sm);
	}

	.lx-pagination__size span {
		color: var(--lx-colour-surface-text-muted);
		font-size: var(--lx-font-size-xs);
	}

	.lx-pagination__size select {
		background: var(--lx-colour-surface-raised);
		border: var(--lx-size-border-width-hairline) solid var(--lx-colour-surface-border);
		border-radius: var(--lx-size-radius-sm);
		color: var(--lx-colour-surface-text);
		font: inherit;
		padding: var(--lx-size-space-xs) var(--lx-size-space-sm);
	}
</style>
