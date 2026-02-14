<template>
	<section class="lx-kitchen-sink">
		<header class="lx-kitchen-sink__header">
			<h2>
				Kitchen Sink
			</h2>
			<p>
				Complete reference for the current Luaris UI component set, variants, and states.
			</p>
		</header>

		<section class="lx-kitchen-sink__section">
			<h3>
				Buttons
			</h3>
			<div class="lx-kitchen-sink__button-row">
				<LxButton v-for="variant in variants" :key="variant" :variant="variant">
					{{ variant }}
				</LxButton>
			</div>
			<div class="lx-kitchen-sink__button-row">
				<LxButton v-for="size in buttonSizes" :key="size" variant="secondary" :size="size">
					{{ size }}
				</LxButton>
				<LxButton variant="primary" size="md" loading>
					Loading
				</LxButton>
				<LxButton variant="ghost" size="md">
					Ghost Action
				</LxButton>
			</div>
		</section>

		<section class="lx-kitchen-sink__section">
			<h3>
				Avatars
			</h3>
			<div class="lx-kitchen-sink__avatar-row">
				<LxAvatar name="Luaris User" variant="primary" size="xs" />
				<LxAvatar name="Luaris User" variant="secondary" size="sm" />
				<LxAvatar name="Luaris User" variant="accent" size="md" />
				<LxAvatar name="Luaris User" variant="info" size="lg" />
				<LxAvatar name="Luaris User" variant="success" size="xl" />
			</div>
		</section>

		<section class="lx-kitchen-sink__section">
			<h3>
				Spinners
			</h3>
			<div class="lx-kitchen-sink__spinner-row">
				<LxSpinner variant="primary" size="2xs" />
				<LxSpinner variant="secondary" size="xs" />
				<LxSpinner variant="accent" size="sm" />
				<LxSpinner variant="info" size="md" />
				<LxSpinner variant="success" size="lg" />
				<LxSpinner variant="warning" size="xl" />
				<LxSpinner variant="danger" size="2xl" />
			</div>
		</section>

		<section class="lx-kitchen-sink__section">
			<h3>
				Badges
			</h3>
			<div class="lx-kitchen-sink__chip-row">
				<LxBadge
					v-for="variant in semanticVariants"
					:key="`badge-${variant}`"
					:variant="variant"
					:text="variant"
				/>
			</div>
		</section>

		<section class="lx-kitchen-sink__section">
			<h3>
				Tags
			</h3>
			<div class="lx-kitchen-sink__chip-row">
				<LxTag variant="primary" size="sm" label="Primary" />
				<LxTag variant="secondary" size="md" label="Secondary" />
				<LxTag variant="accent" size="lg" label="Accent" />
				<LxTag variant="info" size="md" label="Removable" removable @remove="onTagRemove" />
			</div>
		</section>

		<section class="lx-kitchen-sink__section">
			<h3>
				Breadcrumbs
			</h3>
			<LxBreadcrumbs :items="breadcrumbItems" />
		</section>

		<section class="lx-kitchen-sink__section">
			<LxCard title="Card Example">
				<p>
					Cards support header/body/footer slots and work well for grouped content.
				</p>
				<template #footer>
					<div class="lx-kitchen-sink__button-row">
						<LxButton variant="secondary" size="sm">
							Cancel
						</LxButton>
						<LxButton variant="primary" size="sm">
							Confirm
						</LxButton>
					</div>
				</template>
			</LxCard>

			<LxCard :interactive="true">
				<p>
					Hover state and border motion can be used for selectable panels.
				</p>
			</LxCard>
		</section>

		<section class="lx-kitchen-sink__section">
			<h3>
				Form Controls
			</h3>
			<div class="lx-kitchen-sink__form-grid">
				<LxLabel text="Input">
					<template #default="{ controlId, controlName }">
						<LxInput
							:id="controlId"
							v-model="inputValue"
							:name="controlName"
							hint="Primary text input"
							placeholder="Type here"
						/>
					</template>
				</LxLabel>
				<LxLabel text="Search" display="inline">
					<template #default="{ controlId, controlName }">
						<LxInput
							:id="controlId"
							v-model="searchValue"
							:name="controlName"
							variant="primary"
							placeholder="Search term"
							type="search"
						/>
					</template>
				</LxLabel>
				<LxLabel text="Error State" :reverse="true">
					<template #default="{ controlId, controlName }">
						<LxInput
							:id="controlId"
							v-model="errorValue"
							:name="controlName"
							error="This field is required"
							placeholder="Invalid value"
						/>
					</template>
				</LxLabel>
				<LxLabel text="Select">
					<template #default="{ controlId, controlName }">
						<LxSelect
							:id="controlId"
							v-model="selectedStatus"
							:name="controlName"
							:options="statusOptions"
						/>
					</template>
				</LxLabel>
				<LxLabel text="Combobox (Tags, Stacked Search)">
					<template #default="{ controlId, controlName }">
						<LxCombobox
							:id="controlId"
							v-model="selectedCountries"
							:name="controlName"
							:options="countryOptions"
							placeholder="Search and select countries"
							:open-by-default="true"
							:always-visible="true"
						/>
					</template>
				</LxLabel>
				<LxLabel text="Combobox (Single)">
					<template #default="{ controlId, controlName }">
						<LxCombobox
							:id="controlId"
							v-model="selectedCountrySingle"
							:name="controlName"
							:options="countryOptions"
							placeholder="Select one country"
							:multiple="false"
						/>
					</template>
				</LxLabel>
				<LxLabel text="Combobox (Checkbox List Mode)">
					<template #default="{ controlId, controlName }">
						<LxCombobox
							:id="controlId"
							v-model="selectedCountriesCompact"
							:name="controlName"
							:options="countryOptions"
							placeholder="Search and toggle options"
							:tags="false"
						/>
					</template>
				</LxLabel>
				<LxLabel text="Combobox (Tags, Inline Search)">
					<template #default="{ controlId, controlName }">
						<LxCombobox
							:id="controlId"
							v-model="selectedCountriesInline"
							:name="controlName"
							:options="countryOptions"
							placeholder="Compact inline search"
							:search-on-new-line="false"
						/>
					</template>
				</LxLabel>
				<div class="lx-kitchen-sink__switch-row">
					<LxLabel text="Email alerts" display="inline">
						<template #default="{ controlId, controlName }">
							<LxSwitch :id="controlId" v-model="emailEnabled" :name="controlName" />
						</template>
					</LxLabel>
					<LxLabel text="Push alerts" display="inline">
						<template #default="{ controlId, controlName }">
							<LxSwitch :id="controlId" v-model="pushEnabled" :name="controlName" />
						</template>
					</LxLabel>
				</div>
			</div>
		</section>

		<section class="lx-kitchen-sink__section">
			<h3>
				Dropdown
			</h3>
			<div class="lx-kitchen-sink__button-row">
				<LxDropdown label="Actions" :options="dropdownOptions" @select="onDropdownSelect" />
				<span class="lx-kitchen-sink__muted">Selected: {{ selectedAction }}</span>
			</div>
		</section>

		<section class="lx-kitchen-sink__section">
			<h3>
				Drawer
			</h3>
			<div class="lx-kitchen-sink__button-row">
				<LxButton variant="accent" size="sm" @click="drawerOpen = true">
					Open Drawer
				</LxButton>
			</div>
			<LxDrawer v-model="drawerOpen" title="Drawer Example">
				<p>
					Use drawers for secondary flows without changing page context.
				</p>
				<div class="lx-kitchen-sink__button-row">
					<LxButton variant="ghost" size="sm" @click="drawerOpen = false">
						Close
					</LxButton>
					<LxButton variant="primary" size="sm" @click="drawerOpen = false">
						Save
					</LxButton>
				</div>
			</LxDrawer>
		</section>

		<section class="lx-kitchen-sink__section">
			<h3>
				Icons (Font Awesome)
			</h3>
			<div class="lx-kitchen-sink__icon-row">
				<LxIcon name="house" icon-style="solid" />
				<LxIcon name="bell" icon-style="regular" />
				<LxIcon name="github" icon-style="brands" size="lg" />
				<LxIcon name="sparkles" icon-style="sharp-solid" />
				<LxIcon name="spinner" spin size="xl" />
			</div>
		</section>

		<section class="lx-kitchen-sink__section">
			<h3>
				Dividers
			</h3>
			<div class="lx-kitchen-sink__divider-demo">
				<span>
					Start
				</span>
				<LxDivider orientation="vertical" />
				<span>
					Middle
				</span>
				<LxDivider orientation="vertical" />
				<span>
					End
				</span>
			</div>
			<LxDivider orientation="horizontal" />
		</section>

		<section class="lx-kitchen-sink__section">
			<h3>
				Carousel
			</h3>
			<div class="lx-kitchen-sink__carousel-grid">
				<LxCarousel v-model="carouselIndex" :slides="carouselSlides" animation="fade" />
				<LxCarousel :slides="carouselSlides" animation="slide" />
				<LxCarousel :slides="carouselSlides" animation="none" />
			</div>
		</section>

		<section class="lx-kitchen-sink__section">
			<h3>
				Comparison
			</h3>
			<LxComparison v-model="comparisonSplit">
				<template #left>
					<div class="lx-kitchen-sink__comparison-panel lx-kitchen-sink__comparison-panel--left">
						Left Content
					</div>
				</template>
				<template #right>
					<div class="lx-kitchen-sink__comparison-panel lx-kitchen-sink__comparison-panel--right">
						Right Content
					</div>
				</template>
			</LxComparison>
		</section>

		<section class="lx-kitchen-sink__section">
			<h3>
				Progress
			</h3>
			<div class="lx-kitchen-sink__button-row">
				<LxProgress :value="68" show-label />
				<LxProgress :value="42" orientation="vertical" />
				<LxProgress :value="82" orientation="ring" show-label />
			</div>
		</section>

		<section class="lx-kitchen-sink__section">
			<h3>
				Rating
			</h3>
			<div class="lx-kitchen-sink__button-row">
				<LxRating v-model="ratingValue" size="xs" />
				<LxRating v-model="ratingValue" size="sm" />
				<LxRating v-model="ratingValue" size="md" />
				<LxRating v-model="ratingValue" size="lg" />
				<LxRating v-model="ratingValue" size="xl" />
			</div>
		</section>

		<section class="lx-kitchen-sink__section">
			<h3>
				Skeleton
			</h3>
			<LxSkeleton variant="text" :count="3" />
			<LxSkeleton variant="rect" width="100%" height="5rem" />
			<LxSkeleton variant="circle" />
		</section>

		<section class="lx-kitchen-sink__section">
			<h3>
				Extended Inputs
			</h3>
			<div class="lx-kitchen-sink__form-grid">
				<LxLabel text="Slider">
					<template #default="{ controlId, controlName }">
						<LxSlider :id="controlId" v-model="sliderValue" :name="controlName" />
					</template>
				</LxLabel>
				<LxLabel text="Number Input">
					<template #default="{ controlId, controlName }">
						<LxNumberInput
							:id="controlId"
							v-model="numberValue"
							:name="controlName"
							:min="0"
							:max="20"
							:step="2"
						/>
					</template>
				</LxLabel>
				<LxLabel text="Radio Group">
					<template #default>
						<LxRadios v-model="radioValue" :options="radioOptions" />
					</template>
				</LxLabel>
				<LxLabel text="Date">
					<template #default="{ controlId, controlName }">
						<LxDatePicker :id="controlId" v-model="dateValue" :name="controlName" />
					</template>
				</LxLabel>
				<LxLabel text="Date Range">
					<template #default>
						<LxDateRangePicker v-model="dateRangeValue" />
					</template>
				</LxLabel>
				<LxLabel text="Colour (Alpha)">
					<template #default="{ controlId, controlName }">
						<LxColourPicker :id="controlId" v-model="colourValue" :name="controlName" />
					</template>
				</LxLabel>
				<LxLabel text="Textarea">
					<template #default="{ controlId, controlName }">
						<LxTextarea
							:id="controlId"
							v-model="textareaValue"
							:name="controlName"
							:max-length="140"
							:show-counter="true"
						/>
					</template>
				</LxLabel>
			</div>
		</section>

		<section class="lx-kitchen-sink__section">
			<h3>
				Semantic Colours
			</h3>
			<div class="lx-kitchen-sink__swatches">
				<article
					v-for="swatch in semanticSwatches"
					:key="swatch.key"
					class="lx-kitchen-sink__swatch"
				>
					<div class="lx-kitchen-sink__swatch-sample" :style="{ background: `var(${swatch.token})` }" />
					<p>
						{{ swatch.label }}
					</p>
					<code>
						{{ swatch.token }}
					</code>
				</article>
			</div>
		</section>
	</section>
</template>

<script setup lang="ts">
	import { ref } from 'vue';
	import { LxAvatar } from '../avatar';
	import { LxBadge } from '../badge';
	import { LxBreadcrumbs } from '../breadcrumbs';
	import { LxButton } from '../button';
	import type { TLxButtonSize, TLxButtonVariant } from '../button';
	import { LxCard } from '../card';
	import { LxCombobox } from '../combobox';
	import { LxComparison } from '../comparison';
	import { LxColourPicker } from '../colour-picker';
	import { LxDatePicker } from '../date-picker';
	import { LxDateRangePicker } from '../date-range-picker';
	import { LxDivider } from '../divider';
	import { LxDrawer } from '../drawer';
	import { LxDropdown } from '../dropdown';
	import { LxIcon } from '../icon';
	import { LxInput } from '../input';
	import { LxLabel } from '../label';
	import { LxNumberInput } from '../number-input';
	import { LxSelect } from '../select';
	import { LxSkeleton } from '../skeleton';
	import { LxSlider } from '../slider';
	import { LxSpinner } from '../spinner';
	import { LxSwitch } from '../switch';
	import { LxTag } from '../tag';
	import { LxTextarea } from '../textarea';
	import type { ILxKitchenSinkToken } from './types';
	import { LxCarousel } from '../carousel';
	import { LxProgress } from '../progress';
	import { LxRating } from '../rating';
	import { LxRadios } from '../radios';

	const variants: TLxButtonVariant[] = ['primary', 'secondary', 'ghost', 'accent', 'info', 'success', 'warning', 'danger'];
	const semanticVariants = variants.filter(variant => variant !== 'ghost');
	const buttonSizes: TLxButtonSize[] = ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'];

	const breadcrumbItems = [
		{ label: 'Home', href: '#' },
		{ label: 'Components', href: '#' },
		{ label: 'Kitchen Sink' },
	];

	const statusOptions = [
		{ label: 'Draft', value: 'draft' },
		{ label: 'In Review', value: 'review' },
		{ label: 'Published', value: 'published' },
	];

	const countryOptions = ['United Kingdom', 'Germany', 'Sweden', 'France', 'Netherlands'];

	const dropdownOptions = [
		{ label: 'Edit', value: 'edit' },
		{ label: 'Duplicate', value: 'duplicate' },
		{ label: 'Archive', value: 'archive' },
		{ label: 'Delete', value: 'delete' },
	];

	const radioOptions = [
		{ label: 'Option A', value: 'a' },
		{ label: 'Option B', value: 'b' },
		{ label: 'Option C', value: 'c' },
	];

	const carouselSlides = [
		{ title: 'Discover', description: 'Token-first design system components.' },
		{ title: 'Build', description: 'Composable Vue components with strong typing.' },
		{ title: 'Ship', description: 'Tree-shakeable library exports for production.' },
	];

	const semanticSwatches: ILxKitchenSinkToken[] = [
		{ key: 'primary', label: 'Primary', token: '--lx-colour-primary' },
		{ key: 'secondary', label: 'Secondary', token: '--lx-colour-secondary' },
		{ key: 'accent', label: 'Accent', token: '--lx-colour-accent' },
		{ key: 'info', label: 'Info', token: '--lx-colour-info' },
		{ key: 'success', label: 'Success', token: '--lx-colour-success' },
		{ key: 'warning', label: 'Warning', token: '--lx-colour-warning' },
		{ key: 'danger', label: 'Danger', token: '--lx-colour-danger' },
	];

	const inputValue = ref('');
	const searchValue = ref('');
	const errorValue = ref('');
	const selectedStatus = ref('draft');
	const selectedCountries = ref(['United Kingdom']);
	const selectedCountrySingle = ref('Germany');
	const selectedCountriesCompact = ref(['Sweden']);
	const selectedCountriesInline = ref(['France']);
	const emailEnabled = ref(true);
	const pushEnabled = ref(false);
	const drawerOpen = ref(false);
	const selectedAction = ref('none');
	const carouselIndex = ref(0);
	const comparisonSplit = ref(50);
	const ratingValue = ref(3);
	const sliderValue = ref(50);
	const numberValue = ref(6);
	const radioValue = ref('b');
	const dateValue = ref('2026-02-13');
	const dateRangeValue = ref({
		start: '2026-02-10',
		end: '2026-02-14',
	});
	const colourValue = ref({
		hex: '#2563eb',
		alpha: 0.85,
	});
	const textareaValue = ref('This is a sample textarea value.');

	const onDropdownSelect = (value: string | number): void => {
		selectedAction.value = String(value);
	};

	const onTagRemove = (): void => {
		selectedAction.value = 'tag removed';
	};
</script>

<style scoped lang="scss">
	.lx-kitchen-sink {
		background: var(--lx-colour-surface-raised);
		border: var(--lx-size-border-width-hairline) solid var(--lx-colour-surface-border);
		border-radius: var(--lx-size-radius-lg);
		display: grid;
		gap: var(--lx-size-space-xl);
		padding: var(--lx-size-space-2xl);
	}

	.lx-kitchen-sink__header h2 {
		font-size: var(--lx-font-size-xl);
		margin-bottom: var(--lx-size-space-sm);
	}

	.lx-kitchen-sink__header p,
	.lx-kitchen-sink__muted {
		color: var(--lx-colour-surface-text-muted);
	}

	.lx-kitchen-sink__section {
		background: var(--lx-colour-surface-base);
		border: var(--lx-size-border-width-hairline) solid var(--lx-colour-surface-border);
		border-radius: var(--lx-size-radius-md);
		display: grid;
		gap: var(--lx-size-space-md);
		padding: var(--lx-size-space-lg);
	}

	.lx-kitchen-sink__section h3 {
		font-size: var(--lx-font-size-lg);
		margin: 0;
	}

	.lx-kitchen-sink__section--grid-2 {
		grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
	}

	.lx-kitchen-sink__button-row,
	.lx-kitchen-sink__avatar-row,
	.lx-kitchen-sink__spinner-row,
	.lx-kitchen-sink__chip-row,
	.lx-kitchen-sink__icon-row,
	.lx-kitchen-sink__switch-row {
		display: flex;
		flex-wrap: wrap;
		gap: var(--lx-size-space-md);
	}

	.lx-kitchen-sink__form-grid {
		align-items: start;
		display: grid;
		gap: var(--lx-size-space-lg);
		grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
	}

	.lx-kitchen-sink__carousel-grid {
		display: grid;
		gap: var(--lx-size-space-md);
		grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
	}

	.lx-kitchen-sink__divider-demo {
		align-items: center;
		display: flex;
		gap: var(--lx-size-space-md);
		height: 2rem;
		margin-bottom: var(--lx-size-space-md);
	}

	.lx-kitchen-sink__swatches {
		display: grid;
		gap: var(--lx-size-space-md);
		grid-template-columns: repeat(auto-fit, minmax(11rem, 1fr));
	}

	.lx-kitchen-sink__swatch {
		background: var(--lx-colour-surface-base);
		border: var(--lx-size-border-width-hairline) solid var(--lx-colour-surface-border);
		border-radius: var(--lx-size-radius-md);
		display: grid;
		gap: var(--lx-size-space-sm);
		padding: var(--lx-size-space-md);
	}

	.lx-kitchen-sink__swatch code {
		color: var(--lx-colour-surface-text-muted);
		font-size: var(--lx-font-size-xs);
	}

	.lx-kitchen-sink__swatch-sample {
		border: var(--lx-size-border-width-hairline) solid var(--lx-colour-surface-border);
		border-radius: var(--lx-size-radius-sm);
		height: 4rem;
	}

	.lx-kitchen-sink__comparison-panel {
		align-items: center;
		display: flex;
		font-weight: var(--lx-font-weight-semibold);
		height: 14rem;
		justify-content: center;
	}

	.lx-kitchen-sink__comparison-panel--left {
		background: color-mix(in srgb, var(--lx-colour-primary) 18%, var(--lx-colour-surface-base));
	}

	.lx-kitchen-sink__comparison-panel--right {
		background: color-mix(in srgb, var(--lx-colour-accent) 18%, var(--lx-colour-surface-base));
	}
</style>
