<template>
	<section ref="pickerRoot" v-click-outside="onClickOutside" class="lx-icon-picker" :class="{ 'lx-icon-picker--popup': props.popup }">
		<button
			v-if="props.popup"
			type="button"
			class="lx-icon-picker__trigger"
			@click="togglePopup"
		>
			<LxIcon :name="selectedName || 'circle-question'" :icon-style="modelStyle" />
			<span>{{ selectedName || 'Choose icon' }}</span>
		</button>

		<div
			v-if="!props.popup || popupOpen"
			ref="panelRef"
			class="lx-icon-picker__panel"
			:class="{ 'lx-icon-picker__panel--popup': props.popup }"
			:style="panelStyle"
			@keydown.esc="closePopup"
		>
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

			<details v-if="props.showSettings" class="lx-icon-picker__settings">
				<summary>Display Settings</summary>
				<div class="lx-icon-picker__settings-grid">
					<fieldset class="lx-icon-picker__filter-group">
						<legend>Licences</legend>
						<label v-for="licence in licenceOptions" :key="licence">
							<input
								v-model="selectedLicences"
								type="checkbox"
								:value="licence"
							>
							{{ licence }}
						</label>
					</fieldset>

					<fieldset class="lx-icon-picker__filter-group">
						<legend>Families</legend>
						<label v-for="family in familyOptions" :key="family">
							<input
								v-model="selectedFamilies"
								type="checkbox"
								:value="family"
							>
							{{ family }}
						</label>
					</fieldset>

					<fieldset class="lx-icon-picker__filter-group">
						<legend>Styles</legend>
						<label v-for="style in styleOptions" :key="style">
							<input
								v-model="selectedStyles"
								type="checkbox"
								:value="style"
							>
							{{ style }}
						</label>
					</fieldset>
				</div>
			</details>

			<div
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
					<LxIcon :name="icon.name" :icon-style="activeStyleFor(icon)" size="lg" />
				</button>
			</div>

			<div class="lx-icon-picker__pagination">
				<button type="button" :disabled="currentPage <= 1" @click="currentPage -= 1">
					Previous
				</button>
				<span>Page {{ currentPage }} / {{ totalPages }}</span>
				<button type="button" :disabled="currentPage >= totalPages" @click="currentPage += 1">
					Next
				</button>
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
		</div>
	</section>
</template>

<script setup lang="ts">
	import { computed, nextTick, ref, watch } from 'vue';
	import faRegistry from '../../data/fa-registry.json';
	import { vClickOutside as vClickOutsideDirective } from '../../directives/clickOutside';
	import { LxIcon } from '../icon';
	import type { TLxIconStyle } from '../icon/types';
	import type {
		ILxIconPickerProps,
		ILxIconPickerValue,
		ILxIconRegistryEntry,
		TLxIconPickerFamily,
		TLxIconPickerLicence,
	} from './types';

	const props = withDefaults(defineProps<ILxIconPickerProps>(), {
		registry: () => faRegistry as ILxIconRegistryEntry[],
		placeholder: 'Search icons',
		showSettings: true,
		pageSize: 25,
		columns: 5,
		rows: 5,
		popup: false,
		popupTitle: 'Choose icon',
		closeOnSelect: true,
	});

	const vClickOutside = vClickOutsideDirective;

	const model = defineModel<ILxIconPickerValue | null>({
		default: null,
	});

	const SUPPORTED_STYLES: TLxIconStyle[] = [
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
	];

	const pickerRoot = ref<HTMLElement | null>(null);
	const panelRef = ref<HTMLElement | null>(null);
	const popupOpen = ref(false);
	const popupTop = ref(72);
	const popupLeft = ref(12);
	const popupWidth = ref(760);

	const query = ref('');
	const currentPage = ref(1);
	const selectedLicences = ref<TLxIconPickerLicence[]>(['free', 'pro']);
	const selectedFamilies = ref<TLxIconPickerFamily[]>(['classic', 'sharp', 'brands']);
	const selectedStyles = ref<TLxIconStyle[]>([...SUPPORTED_STYLES]);

	const licenceOptions: TLxIconPickerLicence[] = ['free', 'pro'];
	const familyOptions: TLxIconPickerFamily[] = ['classic', 'sharp', 'brands'];
	const styleOptions = SUPPORTED_STYLES;

	const registry = computed(() => props.registry || []);
	const selectedName = computed(() => model.value?.name || '');
	const modelStyle = computed(() => model.value?.style || 'solid');

	const iconStylesFor = (icon: ILxIconRegistryEntry): TLxIconStyle[] => {
		return icon.styles.filter(style => {
			if (!selectedStyles.value.includes(style)) {
				return false;
			}

			const sources = icon.styleSources?.[style] || [];
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
		return Math.max(1, Math.ceil(filteredIcons.value.length / props.pageSize));
	});

	const pagedIcons = computed(() => {
		const start = (currentPage.value - 1) * props.pageSize;
		return filteredIcons.value.slice(start, start + props.pageSize);
	});

	const selectedIcon = computed(() => {
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

	const gridStyle = computed(() => {
		if (props.popup) {
			return {
				'--lx-icon-picker-columns': '5',
			};
		}

		return {
			'--lx-icon-picker-columns': `${props.columns}`,
		};
	});

	const panelStyle = computed(() => {
		if (!props.popup) {
			return {};
		}

		return {
			top: `${popupTop.value}px`,
			left: `${popupLeft.value}px`,
			width: `${popupWidth.value}px`,
		};
	});

	const activeStyleFor = (icon: ILxIconRegistryEntry): TLxIconStyle => {
		const availableStyles = iconStylesFor(icon);
		if (icon.name === selectedName.value && availableStyles.includes(modelStyle.value)) {
			return modelStyle.value;
		}

		return availableStyles[0] ?? 'solid';
	};

	const toTitle = (value: string): string => {
		return value.split('-').map(part => `${part.charAt(0).toUpperCase()}${part.slice(1)}`).join(' ');
	};

	const updatePopupPosition = (): void => {
		if (!props.popup || !pickerRoot.value) {
			return;
		}

		const rect = pickerRoot.value.getBoundingClientRect();
		const viewportPadding = 12;
		const desiredWidth = Math.min(860, Math.max(560, window.innerWidth - (viewportPadding * 2)));
		const unclampedLeft = rect.left;
		const clampedLeft = Math.min(
			Math.max(unclampedLeft, viewportPadding),
			window.innerWidth - desiredWidth - viewportPadding,
		);
		const belowTop = rect.bottom + 8;
		const top = Math.min(
			Math.max(belowTop, viewportPadding),
			window.innerHeight - 12,
		);

		popupWidth.value = desiredWidth;
		popupLeft.value = clampedLeft;
		popupTop.value = top;
	};

	const openPopup = async (): Promise<void> => {
		if (!props.popup) {
			return;
		}

		popupOpen.value = true;
		await nextTick();
		updatePopupPosition();
		panelRef.value?.focus();
	};

	const closePopup = (): void => {
		popupOpen.value = false;
	};

	const togglePopup = async (): Promise<void> => {
		if (!props.popup) {
			return;
		}

		if (popupOpen.value) {
			closePopup();
			return;
		}

		await openPopup();
	};

	const onClickOutside = (): void => {
		if (props.popup) {
			closePopup();
		}
	};

	const selectIcon = (icon: ILxIconRegistryEntry): void => {
		const availableStyles = iconStylesFor(icon);
		const firstStyle = availableStyles[0];
		if (!firstStyle) {
			return;
		}

		model.value = {
			name: icon.name,
			style: firstStyle,
		};

		if (props.popup && props.closeOnSelect) {
			closePopup();
		}
	};

	const selectStyle = (style: TLxIconStyle): void => {
		if (!selectedIcon.value) {
			return;
		}

		model.value = {
			name: selectedIcon.value.name,
			style,
		};
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

	watch(totalPages, nextPageCount => {
		if (currentPage.value > nextPageCount) {
			currentPage.value = nextPageCount;
		}
	});

	watch(
		selectedIconStyles,
		nextStyles => {
			if (!model.value) {
				return;
			}

			if (nextStyles.length === 0) {
				model.value = null;
				return;
			}

			const firstStyle = nextStyles[0];
			if (firstStyle && !nextStyles.includes(model.value.style)) {
				model.value = {
					...model.value,
					style: firstStyle,
				};
			}
		},
		{ immediate: true },
	);
</script>

<style scoped lang="scss">
	.lx-icon-picker {
		position: relative;
	}

	.lx-icon-picker__trigger {
		align-items: center;
		appearance: none;
		background: var(--lx-colour-surface-raised);
		border: var(--lx-size-border-width-hairline) solid var(--lx-colour-surface-border);
		border-radius: var(--lx-size-radius-sm);
		color: var(--lx-colour-surface-text);
		cursor: pointer;
		display: inline-flex;
		font: inherit;
		gap: var(--lx-size-space-sm);
		height: var(--lx-size-control-height-md);
		padding: 0 var(--lx-size-space-md);
	}

	.lx-icon-picker__panel {
		background: var(--lx-colour-surface-base);
		border: var(--lx-size-border-width-hairline) solid var(--lx-colour-surface-border);
		border-radius: var(--lx-size-radius-md);
		display: grid;
		gap: var(--lx-size-space-sm);
		padding: var(--lx-size-space-md);
	}

	.lx-icon-picker__panel--popup {
		box-shadow: 0 1.25rem 3.2rem rgb(0 0 0 / 0.3);
		inset: auto auto auto 0;
		max-height: min(82vh, 46rem);
		overflow: auto;
		overscroll-behavior: contain;
		position: fixed;
		scrollbar-gutter: stable both-edges;
		z-index: 120;
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
		grid-template-columns: repeat(var(--lx-icon-picker-columns), minmax(0, 1fr));
	}

	.lx-icon-picker:not(.lx-icon-picker--popup) .lx-icon-picker__grid {
		grid-template-columns: repeat(auto-fill, minmax(3.75rem, 1fr));
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
		padding: var(--lx-size-space-sm);
	}

	.lx-icon-picker__tile.is-selected,
	.lx-icon-picker__style-chip.is-selected {
		border-color: var(--lx-colour-primary);
		box-shadow: inset 0 0 0 var(--lx-size-border-width-standard) color-mix(in srgb, var(--lx-colour-primary) 30%, transparent);
	}

	.lx-icon-picker__tile:focus-visible,
	.lx-icon-picker__style-chip:focus-visible,
	.lx-icon-picker__pagination button:focus-visible,
	.lx-icon-picker__trigger:focus-visible {
		outline: var(--lx-size-border-width-standard) solid var(--lx-colour-focus-ring);
		outline-offset: 2px;
	}

	.lx-icon-picker__pagination {
		align-items: center;
		display: flex;
		gap: var(--lx-size-space-sm);
		justify-content: space-between;
	}

	.lx-icon-picker__pagination button {
		appearance: none;
		background: var(--lx-colour-surface-raised);
		border: var(--lx-size-border-width-hairline) solid var(--lx-colour-surface-border);
		border-radius: var(--lx-size-radius-sm);
		color: var(--lx-colour-surface-text);
		cursor: pointer;
		font: inherit;
		padding: 0.25rem 0.55rem;
	}

	.lx-icon-picker__pagination button:disabled {
		cursor: not-allowed;
		opacity: 0.6;
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

	.lx-icon-picker__style-chip {
		height: 2.25rem;
		padding: 0 var(--lx-size-space-md);
	}

	@media (max-width: 50rem) {
		.lx-icon-picker__panel--popup {
			left: 0.75rem !important;
			width: calc(100vw - 1.5rem) !important;
		}
	}
</style>
