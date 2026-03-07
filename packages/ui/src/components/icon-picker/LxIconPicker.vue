<template>
	<section class="lx-icon-picker" :class="{ 'lx-icon-picker--popup': props.popup }">
		<LxButton
			v-if="props.popup"
			class="lx-icon-picker__trigger"
			variant="secondary"
			size="sm"
			:aria-label="selectedName ? `Selected icon: ${toTitle(selectedName)}` : 'Choose icon'"
			@click="togglePopup"
		>
			<LxIcon :name="selectedName || 'circle-question'" :icon-style="modelStyle" />
		</LxButton>
		<template v-else />

		<div v-if="!props.popup" class="lx-icon-picker__panel">
			<div class="lx-icon-picker__search-row">
				<input
					v-model.trim="query"
					type="search"
					class="lx-icon-picker__search"
					:placeholder="props.placeholder"
					aria-label="Search icons"
				>
				<span class="lx-icon-picker__meta">
					{{ filteredIcons.length }} results
				</span>
			</div>

			<div
				ref="gridRef"
				class="lx-icon-picker__grid"
				:style="gridStyle"
				role="listbox"
				aria-label="Icon results"
			>
				<button
					v-for="icon in pagedIcons"
					:key="icon.name"
					type="button"
					class="lx-icon-picker__tile"
					:class="{ 'is-selected': icon.name === selectedName }"
					:aria-selected="icon.name === selectedName"
					:title="toTitle(icon.name)"
					@click="selectIcon(icon)"
				>
					<LxIcon :name="icon.name" :icon-style="activeStyleFor(icon)" size="sm" />
				</button>
			</div>

			<div class="lx-icon-picker__pagination">
				<LxButton variant="plain" size="xs" :disabled="currentPage <= 1" @click="goToPreviousPage">
					Previous
				</LxButton>
				<span>Page {{ currentPage }} / {{ totalPages }}</span>
				<LxButton variant="plain" size="xs" :disabled="currentPage >= totalPages" @click="goToNextPage">
					Next
				</LxButton>
			</div>

			<section v-if="selectedIcon" class="lx-icon-picker__style-section">
				<h4>Styles for {{ toTitle(selectedIcon.name) }}</h4>
				<div class="lx-icon-picker__styles">
					<button
						v-for="style in selectedIconStyles"
						:key="style"
						type="button"
						class="lx-icon-picker__style-chip"
						:class="{ 'is-selected': style === modelStyle }"
						:title="toTitle(style)"
						@click="selectStyle(style)"
					>
						<LxIcon :name="selectedIcon.name" :icon-style="style" />
					</button>
				</div>
			</section>
			<template v-else />
		</div>
		<template v-else />

		<LxModal
			v-if="props.popup"
			v-model="popupOpen"
			:title="props.popupTitle"
			:position="props.popupPosition"
			:animation="props.popupAnimation"
			:width="props.popupWidth"
			:max-width="props.popupMaxWidth"
			:max-height="props.popupMaxHeight"
			:show-close="true"
		>
			<div class="lx-icon-picker__panel lx-icon-picker__panel--modal">
				<div class="lx-icon-picker__search-row">
					<input
						v-model.trim="query"
						type="search"
						class="lx-icon-picker__search"
						:placeholder="props.placeholder"
						aria-label="Search icons"
					>
					<span class="lx-icon-picker__meta">
						{{ filteredIcons.length }} results
					</span>
				</div>

				<div
					ref="gridRef"
					class="lx-icon-picker__grid"
					:style="gridStyle"
					role="listbox"
					aria-label="Icon results"
				>
					<button
						v-for="icon in pagedIcons"
						:key="icon.name"
						type="button"
						class="lx-icon-picker__tile"
						:class="{ 'is-selected': icon.name === selectedName }"
						:aria-selected="icon.name === selectedName"
						:title="toTitle(icon.name)"
						@click="selectIcon(icon)"
					>
						<LxIcon :name="icon.name" :icon-style="activeStyleFor(icon)" size="sm" />
					</button>
				</div>

				<div class="lx-icon-picker__pagination">
					<LxButton variant="plain" size="xs" :disabled="currentPage <= 1" @click="goToPreviousPage">
						Previous
					</LxButton>
					<span>Page {{ currentPage }} / {{ totalPages }}</span>
					<LxButton variant="plain" size="xs" :disabled="currentPage >= totalPages" @click="goToNextPage">
						Next
					</LxButton>
				</div>

				<section v-if="selectedIcon" class="lx-icon-picker__style-section">
					<h4>Styles for {{ toTitle(selectedIcon.name) }}</h4>
					<div class="lx-icon-picker__styles">
						<button
							v-for="style in selectedIconStyles"
							:key="style"
							type="button"
							class="lx-icon-picker__style-chip"
							:class="{ 'is-selected': style === modelStyle }"
							:title="toTitle(style)"
							@click="selectStyle(style)"
						>
							<LxIcon :name="selectedIcon.name" :icon-style="style" />
						</button>
					</div>
				</section>
				<template v-else />

				<div class="lx-icon-picker__confirm">
					<LxButton
						variant="primary"
						size="sm"
						:disabled="!draftSelection"
						@click="confirmPopupSelection"
					>
						Select Button
					</LxButton>
				</div>
			</div>
		</LxModal>
		<template v-else />
	</section>
</template>

<script setup lang='ts'>
	import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue';
	import faRegistry from '../../data/fa-registry.json';
	import { LxButton } from '../button';
	import { LxIcon } from '../icon';
	import { LxModal } from '../modal';
	import type { TLxIconStyle } from '../icon/types';
	import type {
		ILxIconPickerProps,
		ILxIconPickerValue,
		ILxIconRegistryEntry,
		ILxIconRegistryItemNormalised,
		TLxIconPickerFamily,
		TLxIconPickerLicence,
	} from './types';

	const props = withDefaults(defineProps<ILxIconPickerProps>(), {
		registry: () => faRegistry as ILxIconRegistryEntry[],
		availableLicences: () => ['free', 'pro'],
		availableFamilies: () => ['classic', 'sharp', 'brands'],
		availableStyles: () => [
			'solid',
			'regular',
			'brands',
			'light',
			'duotone',
			'thin',
			'sharp-solid',
			'sharp-regular',
			'sharp-light',
			'sharp-thin',
			'sharp-duotone',
		] as TLxIconStyle[],
		placeholder: 'Search icons',
		showSettings: false,
		columns: 5,
		rows: 5,
		popup: false,
		popupTitle: 'Choose icon',
		popupPosition: 'center',
		popupAnimation: 'fade',
		popupWidth: 'min(80vw, 28rem)',
		popupMaxWidth: '28rem',
		popupMaxHeight: '80vh',
		closeOnSelect: true,
	});

	const model = defineModel<ILxIconPickerValue | null>({
		default: null,
	});

	const popupOpen = ref(false);
	const draftSelection = ref<ILxIconPickerValue | null>(null);
	const gridRef = ref<HTMLElement | null>(null);
	const gridColumns = ref(Math.max(1, props.columns));
	let resizeObserver: ResizeObserver | null = null;
	const query = ref('');
	const currentPage = ref(1);
	const selectedLicences = ref<TLxIconPickerLicence[]>([...props.availableLicences]);
	const selectedFamilies = ref<TLxIconPickerFamily[]>([...props.availableFamilies]);
	const selectedStyles = ref<TLxIconStyle[]>([...props.availableStyles]);

	const styleOptions = computed<TLxIconStyle[]>(() => [...props.availableStyles]);

	const normaliseSelection = <TOption extends string>(selected: TOption[], available: TOption[]): TOption[] => {
		const availableSet = new Set(available);
		const next = selected.filter(value => availableSet.has(value));
		return next.length > 0 ? next : [...available];
	};

	const normaliseEntry = (entry: ILxIconRegistryEntry): ILxIconRegistryItemNormalised | null => {
		const name = String(entry.name || entry.icon || '').trim();
		if (!name) {
			return null;
		}

		const styles = (entry.styles || []).filter(style => styleOptions.value.includes(style));
		if (styles.length === 0) {
			return null;
		}

		const families = (entry.families?.length
			? entry.families
			: (styles.includes('brands') ? ['brands'] : ['classic'])) as TLxIconPickerFamily[];
		const licences = (entry.licences?.length ? entry.licences : [...props.availableLicences]) as TLxIconPickerLicence[];
		const styleSources = entry.styleSources || Object.fromEntries(
			styles.map(style => [style, [...licences]]),
		) as Partial<Record<TLxIconStyle, TLxIconPickerLicence[]>>;

		return {
			name,
			label: String(entry.label || name),
			keywords: entry.keywords || entry.terms || [],
			styles,
			families,
			licences,
			styleSources,
		};
	};

	const registry = computed<ILxIconRegistryItemNormalised[]>(() => {
		return (props.registry || [])
			.map(normaliseEntry)
			.filter((entry): entry is ILxIconRegistryItemNormalised => entry !== null);
	});
	const selectedValue = computed(() => props.popup ? draftSelection.value : model.value);
	const selectedName = computed(() => selectedValue.value?.name || '');
	const modelStyle = computed(() => selectedValue.value?.style || 'solid');
	const minimumRows = computed(() => props.popup ? 5 : 3);
	const resolvedPageSize = computed(() => {
		const dynamicTarget = gridColumns.value * minimumRows.value;
		return Math.max(props.pageSize ?? 0, dynamicTarget);
	});
	const gridStyle = computed(() => {
		return {
			'--lx-icon-picker-columns': `${gridColumns.value}`,
		};
	});

	const updateGridColumns = (): void => {
		const gridElement = gridRef.value;
		if (!gridElement) {
			return;
		}

		if (props.popup) {
			gridColumns.value = 8;
			return;
		}

		const minTileSize = 48;
		const styles = window.getComputedStyle(gridElement);
		const parsedGap = Number.parseFloat(styles.columnGap);
		const gap = /* c8 ignore next */ Number.isNaN(parsedGap) ? 8 : parsedGap;
		const availableWidth = gridElement.clientWidth;
		const calculatedColumns = Math.max(1, Math.floor((availableWidth + gap) / (minTileSize + gap)));
		const maxColumns = 16;
		gridColumns.value = Math.min(calculatedColumns, maxColumns);
	};

	watch(
		() => props.availableLicences,
		nextAvailable => {
			selectedLicences.value = normaliseSelection(selectedLicences.value, nextAvailable);
		},
		{ immediate: true },
	);

	watch(
		() => props.availableFamilies,
		nextAvailable => {
			selectedFamilies.value = normaliseSelection(selectedFamilies.value, nextAvailable);
		},
		{ immediate: true },
	);

	watch(
		() => props.availableStyles,
		nextAvailable => {
			selectedStyles.value = normaliseSelection(selectedStyles.value, nextAvailable);
		},
		{ immediate: true },
	);

	const stopGridObserver = (): void => {
		resizeObserver?.disconnect();
		resizeObserver = null;
		window.removeEventListener('resize', updateGridColumns);
	};

	const startGridObserver = async (): Promise<void> => {
		stopGridObserver();
		await nextTick();
		updateGridColumns();

		if (!gridRef.value) {
			return;
		}

		if (typeof ResizeObserver !== 'undefined') {
			resizeObserver = new ResizeObserver(() => {
				updateGridColumns();
			});
			resizeObserver.observe(gridRef.value);
		}
		window.addEventListener('resize', updateGridColumns);
	};

	const iconStylesFor = (icon: ILxIconRegistryItemNormalised): TLxIconStyle[] => {
		return icon.styles.filter(style => {
			if (!selectedStyles.value.includes(style)) {
				return false;
			}

			const sources = icon.styleSources[style] || [];
			return sources.some(source => selectedLicences.value.includes(source));
		});
	};

	const filteredIcons = computed(() => {
		const search = query.value.toLowerCase();
		return registry.value.filter(icon => {
			if (!icon.families.some(family => selectedFamilies.value.includes(family))) {
				return false;
			}

			if (!icon.licences.some(licence => selectedLicences.value.includes(licence))) {
				return false;
			}

			if (iconStylesFor(icon).length === 0) {
				return false;
			}

			if (!search) {
				return true;
			}

			if (icon.name.includes(search)) {
				return true;
			}

			return icon.keywords.some(keyword => keyword.includes(search));
		});
	});

	const totalPages = computed(() => {
		return Math.max(1, Math.ceil(filteredIcons.value.length / resolvedPageSize.value));
	});

	const pagedIcons = computed(() => {
		const start = (currentPage.value - 1) * resolvedPageSize.value;
		return filteredIcons.value.slice(start, start + resolvedPageSize.value);
	});

	const goToPreviousPage = (): void => {
		currentPage.value = Math.max(1, currentPage.value - 1);
	};

	const goToNextPage = (): void => {
		currentPage.value = Math.min(totalPages.value, currentPage.value + 1);
	};

	const selectedIcon = computed<ILxIconRegistryItemNormalised | null>(() => {
		if (!selectedName.value) {
			return null;
		}

		return filteredIcons.value.find(icon => icon.name === selectedName.value) || null;
	});

	const selectedIconStyles = computed(() => {
		if (!selectedIcon.value) {
			return [];
		}

		return iconStylesFor(selectedIcon.value);
	});

	const activeStyleFor = (icon: ILxIconRegistryItemNormalised): TLxIconStyle => {
		const availableStyles = iconStylesFor(icon);
		if (icon.name === selectedName.value && availableStyles.includes(modelStyle.value)) {
			return modelStyle.value;
		}

		return availableStyles[0] as TLxIconStyle;
	};

	const toTitle = (value: string): string => {
		return value.split('-').map(part => `${part.charAt(0).toUpperCase()}${part.slice(1)}`).join(' ');
	};

	const closePopup = (): void => {
		popupOpen.value = false;
	};

	const togglePopup = (): void => {
		if (!props.popup) {
			return;
		}

		popupOpen.value = !popupOpen.value;
	};

	const updateSelection = (nextSelection: ILxIconPickerValue | null): void => {
		if (props.popup) {
			draftSelection.value = nextSelection;
			return;
		}

		model.value = nextSelection;
	};

	const confirmPopupSelection = (): void => {
		if (!props.popup || !draftSelection.value) {
			return;
		}

		model.value = { ...draftSelection.value };
		closePopup();
	};

	const selectIcon = (icon: ILxIconRegistryItemNormalised): void => {
		const availableStyles = iconStylesFor(icon);
		const firstStyle = availableStyles[0];
		if (!firstStyle) {
			return;
		}

		updateSelection({
			name: icon.name,
			style: firstStyle,
		});
	};

	const selectStyle = (style: TLxIconStyle): void => {
		if (!selectedIcon.value) {
			return;
		}

		updateSelection({
			name: selectedIcon.value.name,
			style,
		});
	};

	watch(
		[
			query,
			selectedLicences,
			selectedFamilies,
			selectedStyles,
		],
		() => {
			currentPage.value = 1;
		},
		{ deep: true },
	);

	watch(
		() => popupOpen.value,
		isOpen => {
			if (props.popup && isOpen) {
				draftSelection.value = model.value ? { ...model.value } : null;
			}
			void startGridObserver();
		},
	);

	watch(totalPages, nextPageCount => {
		if (currentPage.value > nextPageCount) {
			currentPage.value = nextPageCount;
		}
	});

	watch(
		selectedIconStyles,
		nextStyles => {
			const currentValue = selectedValue.value;
			if (!currentValue) {
				return;
			}

			if (nextStyles.length === 0) {
				updateSelection(null);
				return;
			}

			const firstStyle = nextStyles[0];
			if (firstStyle && !nextStyles.includes(currentValue.style)) {
				updateSelection({
					...currentValue,
					style: firstStyle,
				});
			}
		},
		{ immediate: true },
	);

	onMounted(() => {
		void startGridObserver();
	});

	onUnmounted(() => {
		stopGridObserver();
	});
</script>

<style scoped lang='scss'>
	.lx-icon-picker {
		--lx-icon-picker-tile-size: 3.75rem;
		display: grid;
		gap: var(--lx-size-space-sm);
	}

	.lx-icon-picker:not(.lx-icon-picker--popup) {
		--lx-icon-picker-tile-size: 3.25rem;
	}

	.lx-icon-picker--popup {
		--lx-icon-picker-tile-size: 2.75rem;
	}

	.lx-icon-picker__trigger {
		justify-self: start;
		width: auto;
	}

	.lx-icon-picker__panel {
		align-content: start;
		display: grid;
		gap: var(--lx-size-space-sm);
	}

	.lx-icon-picker__panel--modal {
		min-height: 20rem;
	}

	.lx-icon-picker__search-row {
		align-items: center;
		display: flex;
		gap: var(--lx-size-space-sm);
	}

	.lx-icon-picker__search {
		background: var(--lx-colour-surface-raised);
		border: var(--lx-size-border-width-hairline) solid var(--lx-colour-surface-border);
		border-radius: var(--lx-size-radius-sm);
		color: var(--lx-colour-surface-text);
		flex: 1;
		font: inherit;
		height: var(--lx-size-control-height-md);
		padding: 0 var(--lx-size-space-md);
	}

	.lx-icon-picker__meta {
		color: var(--lx-colour-surface-text-muted);
		font-size: var(--lx-font-size-xs);
	}

	.lx-icon-picker__settings {
		background: var(--lx-colour-surface-raised);
		border: var(--lx-size-border-width-hairline) solid var(--lx-colour-surface-border);
		border-radius: var(--lx-size-radius-sm);
		padding: var(--lx-size-space-sm);
	}

	.lx-icon-picker__settings > summary {
		cursor: pointer;
		font-weight: var(--lx-font-weight-semibold);
	}

	.lx-icon-picker__settings-grid {
		display: grid;
		gap: var(--lx-size-space-sm);
		grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
		padding-top: var(--lx-size-space-sm);
	}

	.lx-icon-picker__filter-group {
		border: none;
		display: grid;
		gap: var(--lx-size-space-2xs);
		margin: 0;
		padding: 0;
	}

	.lx-icon-picker__filter-group legend {
		font-size: var(--lx-font-size-xs);
		font-weight: var(--lx-font-weight-semibold);
		margin-bottom: var(--lx-size-space-2xs);
	}

	.lx-icon-picker__filter-group label {
		align-items: center;
		display: inline-flex;
		gap: var(--lx-size-space-xs);
	}

	.lx-icon-picker__grid {
		display: grid;
		gap: var(--lx-size-space-xs);
		grid-template-columns: repeat(var(--lx-icon-picker-columns, 1), minmax(0, 1fr));
		width: 100%;
	}

	.lx-icon-picker:not(.lx-icon-picker--popup) .lx-icon-picker__grid {
		min-height: calc((var(--lx-icon-picker-tile-size) * 3) + (var(--lx-size-space-xs) * 2));
	}

	.lx-icon-picker__tile,
	.lx-icon-picker__style-chip {
		align-items: center;
		appearance: none;
		background: var(--lx-colour-surface-raised);
		border: var(--lx-size-border-width-hairline) solid var(--lx-colour-surface-border);
		border-radius: var(--lx-size-radius-sm);
		color: var(--lx-colour-surface-text);
		cursor: pointer;
		display: inline-flex;
		font: inherit;
		justify-content: center;
	}

	.lx-icon-picker__tile {
		aspect-ratio: 1 / 1;
		font-size: var(--lx-font-size-lg);
		height: auto;
		justify-self: stretch;
		padding: var(--lx-size-space-xs);
		width: 100%;
	}

	.lx-icon-picker--popup .lx-icon-picker__tile {
		justify-self: center;
		max-height: var(--lx-icon-picker-tile-size);
		max-width: var(--lx-icon-picker-tile-size);
	}

	.lx-icon-picker__tile.is-selected,
	.lx-icon-picker__style-chip.is-selected {
		border-color: var(--lx-colour-primary);
		box-shadow: inset 0 0 0 var(--lx-size-border-width-standard) color-mix(in srgb, var(--lx-colour-primary) 30%, transparent);
	}

	.lx-icon-picker__tile:focus-visible,
	.lx-icon-picker__style-chip:focus-visible {
		outline: var(--lx-size-border-width-standard) solid var(--lx-colour-focus-ring);
		outline-offset: 2px;
	}

	.lx-icon-picker__pagination {
		align-items: center;
		display: flex;
		gap: var(--lx-size-space-sm);
		justify-content: space-between;
	}

	.lx-icon-picker__style-section {
		border-top: var(--lx-size-border-width-hairline) solid var(--lx-colour-surface-border);
		display: grid;
		gap: var(--lx-size-space-xs);
		padding-top: var(--lx-size-space-sm);
	}

	.lx-icon-picker__style-section h4 {
		font-size: var(--lx-font-size-sm);
		margin: 0;
	}

	.lx-icon-picker__styles {
		display: flex;
		flex-wrap: wrap;
		gap: var(--lx-size-space-xs);
	}

	.lx-icon-picker__confirm {
		display: flex;
		justify-content: flex-end;
	}

	.lx-icon-picker__style-chip {
		height: 2.25rem;
		padding: 0 var(--lx-size-space-md);
	}
</style>
