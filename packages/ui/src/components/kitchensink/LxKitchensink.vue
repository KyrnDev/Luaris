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

		<section class="lx-kitchen-sink__section">
			<h3>
				Design Foundations
			</h3>
			<div class="lx-kitchen-sink__token-layout">
				<article class="lx-kitchen-sink__token-block">
					<h4>
						Surfaces
					</h4>
					<div class="lx-kitchen-sink__surface-grid">
						<div v-for="surface in surfaceTokens" :key="surface.token" class="lx-kitchen-sink__surface-item">
							<div class="lx-kitchen-sink__surface-swatch" :style="{ background: `var(${surface.token})` }" />
							<code>{{ surface.token }}</code>
						</div>
					</div>
				</article>
				<article class="lx-kitchen-sink__token-block">
					<h4>
						Spacing
					</h4>
					<div class="lx-kitchen-sink__spacing-grid">
						<div v-for="space in spacingTokens" :key="space.token" class="lx-kitchen-sink__spacing-item">
							<span>{{ space.label }}</span>
							<div class="lx-kitchen-sink__spacing-bar">
								<div :style="{ width: `var(${space.token})` }" />
							</div>
							<code>{{ space.token }}</code>
						</div>
					</div>
				</article>
			</div>
		</section>

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
			<div class="lx-kitchen-sink__button-row">
				<LxButton variant="primary" icon="download">
					Icon Left
				</LxButton>
				<LxButton variant="secondary" icon="arrow-right" icon-order="right">
					Icon Right
				</LxButton>
				<LxButton variant="accent" :disabled="true">
					Disabled
				</LxButton>
				<LxButton variant="ghost" icon="floppy-disk" :disabled="true">
					Disabled With Icon
				</LxButton>
			</div>
		</section>

		<section class="lx-kitchen-sink__section">
			<h3>
				Flex
			</h3>
			<div class="lx-kitchen-sink__flex-grid">
				<article class="lx-kitchen-sink__demo-card">
					<p class="lx-kitchen-sink__demo-title">
						Row + Gap
					</p>
					<LxFlex gap="1rem" class="lx-kitchen-sink__flex-surface">
						<div class="lx-kitchen-sink__flex-box">
							A
						</div>
						<div class="lx-kitchen-sink__flex-box">
							B
						</div>
						<div class="lx-kitchen-sink__flex-box">
							C
						</div>
					</LxFlex>
				</article>
				<article class="lx-kitchen-sink__demo-card">
					<p class="lx-kitchen-sink__demo-title">
						Wrap
					</p>
					<LxFlex wrap gap="0.75rem" class="lx-kitchen-sink__flex-surface">
						<div v-for="item in 8" :key="`wrap-${item}`" class="lx-kitchen-sink__flex-box">
							{{ item }}
						</div>
					</LxFlex>
				</article>
				<article class="lx-kitchen-sink__demo-card">
					<p class="lx-kitchen-sink__demo-title">
						Column Reverse
					</p>
					<LxFlex column reverse gap="0.75rem" class="lx-kitchen-sink__flex-surface">
						<div class="lx-kitchen-sink__flex-box">
							Top
						</div>
						<div class="lx-kitchen-sink__flex-box">
							Middle
						</div>
						<div class="lx-kitchen-sink__flex-box">
							Bottom
						</div>
					</LxFlex>
				</article>
				<article class="lx-kitchen-sink__demo-card">
					<p class="lx-kitchen-sink__demo-title">
						Justify + Align
					</p>
					<LxFlex justify="between" align="center" full-width class="lx-kitchen-sink__flex-surface">
						<div class="lx-kitchen-sink__flex-box">
							Left
						</div>
						<div class="lx-kitchen-sink__flex-box">
							Right
						</div>
					</LxFlex>
				</article>
				<article class="lx-kitchen-sink__demo-card">
					<p class="lx-kitchen-sink__demo-title">
						Inline Flex
					</p>
					<div>
						Before
						<LxFlex inline gap="0.35rem" class="lx-kitchen-sink__inline-example">
							<span class="lx-kitchen-sink__inline-pill">
								One
							</span>
							<span class="lx-kitchen-sink__inline-pill">
								Two
							</span>
						</LxFlex>
						After
					</div>
				</article>
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
			<h3>
				Cards
			</h3>
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

			<LxCard title="Selected Card" :selected="true" padding="var(--lx-size-space-md)">
				<p>
					Selected style and configurable inner spacing for stateful panels.
				</p>
			</LxCard>

			<LxCard title="No Padding Card" padding="0">
				<div class="lx-kitchen-sink__swatch-sample" />
			</LxCard>
		</section>

		<section class="lx-kitchen-sink__section">
			<h3>
				Inputs
			</h3>
			<article class="lx-kitchen-sink__input-group">
				<h4 class="lx-kitchen-sink__subheading">
					Text & Select
				</h4>
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
					<LxLabel text="Search (Disabled)">
						<template #default="{ controlId, controlName }">
							<LxInput
								:id="controlId"
								v-model="searchValue"
								:name="controlName"
								variant="primary"
								placeholder="Search term"
								type="search"
								:disabled="true"
							/>
						</template>
					</LxLabel>
					<LxLabel text="Error State">
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
					<LxLabel text="Select (Disabled)">
						<template #default="{ controlId, controlName }">
							<LxSelect
								:id="controlId"
								v-model="selectedStatus"
								:name="controlName"
								:options="statusOptions"
								:disabled="true"
							/>
						</template>
					</LxLabel>
				</div>
			</article>

			<article class="lx-kitchen-sink__input-group">
				<h4 class="lx-kitchen-sink__subheading">
					Choice & Toggles
				</h4>
				<div class="lx-kitchen-sink__form-grid">
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
					<LxLabel text="Combobox (Checkbox List)">
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
					<LxLabel text="Combobox (Disabled)">
						<template #default="{ controlId, controlName }">
							<LxCombobox
								:id="controlId"
								v-model="selectedCountriesInline"
								:name="controlName"
								:options="countryOptions"
								placeholder="Disabled state"
								:disabled="true"
							/>
						</template>
					</LxLabel>
				</div>
				<div class="lx-kitchen-sink__switch-row">
					<LxLabel text="Email alerts" display="inline">
						<template #default="{ controlId, controlName }">
							<LxSwitch :id="controlId" v-model="emailEnabled" :name="controlName" />
						</template>
					</LxLabel>
					<LxLabel text="Push alerts (Disabled)" display="inline">
						<template #default="{ controlId, controlName }">
							<LxSwitch :id="controlId" v-model="pushEnabled" :name="controlName" :disabled="true" />
						</template>
					</LxLabel>
				</div>
			</article>

			<article class="lx-kitchen-sink__input-group">
				<h4 class="lx-kitchen-sink__subheading">
					Radio Groups
				</h4>
				<div class="lx-kitchen-sink__form-grid">
					<LxLabel text="Radio Group (Stacked)">
						<template #default>
							<LxRadios v-model="radioValue" :options="radioOptions" />
						</template>
					</LxLabel>
					<LxLabel text="Radio Group (Inline)">
						<template #default>
							<LxRadios v-model="radioValueInline" :options="radioOptions" layout="inline" />
						</template>
					</LxLabel>
					<LxLabel text="Radio Cards (Vertical Slot)">
						<template #default>
							<LxRadios v-model="radioValueCardVertical" :options="radioOptions" card>
								<template #option="{ option, checked }">
									<LxFlex column align="start" gap="var(--lx-size-space-xs)" class="lx-radios__card-content">
										<strong>{{ option.label }}</strong>
										<small class="lx-kitchen-sink__muted">{{ checked ? 'Selected option' : 'Choose this option' }}</small>
									</LxFlex>
								</template>
							</LxRadios>
						</template>
					</LxLabel>
					<LxLabel text="Radio Cards (Inline Slot)">
						<template #default>
							<LxRadios
								v-model="radioValueCardInline"
								:options="radioOptions"
								layout="inline"
								card
							>
								<template #option="{ option, checked }">
									<LxFlex column align="start" gap="var(--lx-size-space-xs)" class="lx-radios__card-content">
										<strong>{{ option.label }}</strong>
										<small class="lx-kitchen-sink__muted">{{ checked ? 'Selected option' : 'Choose this option' }}</small>
									</LxFlex>
								</template>
							</LxRadios>
						</template>
					</LxLabel>
				</div>
			</article>

			<article class="lx-kitchen-sink__input-group">
				<h4 class="lx-kitchen-sink__subheading">
					Sliders
				</h4>
				<div class="lx-kitchen-sink__form-grid">
					<LxLabel text="Slider">
						<template #default="{ controlId, controlName }">
							<LxSlider :id="controlId" v-model="sliderValue" :name="controlName" />
						</template>
					</LxLabel>
					<LxLabel text="Slider (Disabled)">
						<template #default="{ controlId, controlName }">
							<LxSlider :id="controlId" :model-value="25" :name="controlName" :disabled="true" />
						</template>
					</LxLabel>
				</div>
			</article>

			<article class="lx-kitchen-sink__input-group">
				<h4 class="lx-kitchen-sink__subheading">
					Number Inputs
				</h4>
				<div class="lx-kitchen-sink__form-grid">
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
					<LxLabel text="Number Input (Disabled)">
						<template #default="{ controlId, controlName }">
							<LxNumberInput :id="controlId" :model-value="12" :name="controlName" :disabled="true" />
						</template>
					</LxLabel>
				</div>
			</article>

			<article class="lx-kitchen-sink__input-group">
				<h4 class="lx-kitchen-sink__subheading">
					Date Inputs
				</h4>
				<div class="lx-kitchen-sink__form-grid">
					<LxLabel text="Date">
						<template #default="{ controlId, controlName }">
							<LxDatePicker :id="controlId" v-model="dateValue" :name="controlName" />
						</template>
					</LxLabel>
					<LxLabel text="Date (Disabled)">
						<template #default="{ controlId, controlName }">
							<LxDatePicker :id="controlId" :model-value="new Date(2026, 1, 13)" :name="controlName" :disabled="true" />
						</template>
					</LxLabel>
					<LxLabel text="Date Range">
						<template #default>
							<LxDateRangePicker v-model="dateRangeValue" />
						</template>
					</LxLabel>
				</div>
			</article>

			<article class="lx-kitchen-sink__input-group">
				<h4 class="lx-kitchen-sink__subheading">
					Date + Time Inputs
				</h4>
				<div class="lx-kitchen-sink__form-grid">
					<LxLabel text="Date + Time">
						<template #default>
							<LxDateTimePicker
								v-model="dateTimeValue"
								date-min="2026-01-01"
								date-max="2026-12-31"
								time-min="08:00"
								time-max="20:00"
								:time-step="300"
							/>
						</template>
					</LxLabel>
					<LxLabel text="Date + Time Range">
						<template #default>
							<LxDateTimeRangePicker
								v-model="dateTimeRangeValue"
								date-min="2026-01-01"
								date-max="2026-12-31"
								time-min="08:00"
								time-max="20:00"
								:time-step="300"
							/>
						</template>
					</LxLabel>
				</div>
			</article>

			<article class="lx-kitchen-sink__input-group">
				<h4 class="lx-kitchen-sink__subheading">
					Time Inputs
				</h4>
				<div class="lx-kitchen-sink__form-grid">
					<LxLabel text="Time">
						<template #default="{ controlId, controlName }">
							<LxTimePicker
								:id="controlId"
								v-model="timeValue"
								:name="controlName"
								min="08:00"
								max="20:00"
								:step="300"
							/>
						</template>
					</LxLabel>
					<LxLabel text="Time (Disabled)">
						<template #default="{ controlId, controlName }">
							<LxTimePicker
								:id="controlId"
								model-value="09:30"
								:name="controlName"
								:disabled="true"
							/>
						</template>
					</LxLabel>
					<LxLabel text="Time Range">
						<template #default>
							<LxTimeRangePicker
								v-model="timeRangeValue"
								min="08:00"
								max="20:00"
								:step="300"
							/>
						</template>
					</LxLabel>
				</div>
			</article>

			<article class="lx-kitchen-sink__input-group">
				<h4 class="lx-kitchen-sink__subheading">
					Colour Pickers
				</h4>
				<div class="lx-kitchen-sink__form-grid">
					<LxLabel text="Colour (Alpha)">
						<template #default="{ controlId, controlName }">
							<LxColourPicker
								:id="controlId"
								v-model="colourValue"
								:name="controlName"
								:formats="['hex', 'rgb', 'rgba', 'hsl', 'hsla']"
								default-format="rgba"
							/>
						</template>
					</LxLabel>
					<LxLabel text="Colour (Disabled)">
						<template #default="{ controlId, controlName }">
							<LxColourPicker
								:id="controlId"
								:model-value="colourValue"
								:name="controlName"
								:formats="['hex', 'hsl']"
								default-format="hex"
								:disabled="true"
							/>
						</template>
					</LxLabel>
					<LxLabel text="Colour (Popup)">
						<template #default="{ controlId, controlName }">
							<LxColourPicker
								:id="controlId"
								v-model="colourValue"
								:name="controlName"
								:popup="true"
								popup-title="Pick Accent Colour"
							/>
						</template>
					</LxLabel>
				</div>
			</article>

			<article class="lx-kitchen-sink__input-group">
				<h4 class="lx-kitchen-sink__subheading">
					Textareas
				</h4>
				<div class="lx-kitchen-sink__form-grid">
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
					<LxLabel text="Textarea (Disabled)">
						<template #default="{ controlId, controlName }">
							<LxTextarea :id="controlId" model-value="Disabled example" :name="controlName" :disabled="true" />
						</template>
					</LxLabel>
				</div>
			</article>
		</section>

		<section class="lx-kitchen-sink__section">
			<h3>
				Data Table
			</h3>
			<p class="lx-kitchen-sink__muted">
				Built-in filtering, sorting, pagination, and per-column slot overrides.
			</p>
			<div class="lx-kitchen-sink__table-stack">
				<LxDataTable
					:rows="tableRows"
					:columns="tableColumnsBuiltIn"
					variant="striped"
					density="md"
				/>

				<LxDataTable
					:rows="tableRows"
					:columns="tableColumnsCustom"
					variant="minimal"
					density="sm"
					:items-per-page="5"
				>
					<template #filter-revenue="{ filterModel }">
						<select v-model="filterModel.value" class="lx-kitchen-sink__table-filter-select">
							<option value="">
								All
							</option>
							<option value="high">
								£15k+
							</option>
							<option value="medium">
								£10k - £14,999
							</option>
							<option value="low">
								Under £10k
							</option>
						</select>
					</template>
					<template #col-name="{ value, row }">
						<div class="lx-kitchen-sink__table-name">
							<LxAvatar :name="String(value)" size="xs" variant="secondary" />
							<div>
								<strong>{{ value }}</strong>
								<p class="lx-kitchen-sink__muted">
									{{ row.region }}
								</p>
							</div>
						</div>
					</template>
					<template #col-status="{ value }">
						<LxBadge :text="String(value)" :variant="value === 'active' ? 'success' : (value === 'paused' ? 'warning' : 'secondary')" />
					</template>
					<template #col-revenue="{ value }">
						<strong>£{{ Number(value).toLocaleString('en-GB') }}</strong>
					</template>
				</LxDataTable>
			</div>
		</section>

		<section class="lx-kitchen-sink__section">
			<h3>
				Dropdown
			</h3>
			<LxFlex gap="var(--lx-size-space-md)">
				<LxDropdown label="Actions" :options="dropdownOptions" @select="onDropdownSelect" />
				<span class="lx-kitchen-sink__muted">Selected: {{ selectedAction }}</span>
			</LxFlex>
		</section>

		<section class="lx-kitchen-sink__section">
			<h3>
				Drawer
			</h3>
			<div class="lx-kitchen-sink__drawer-controls">
				<LxLabel text="Side">
					<template #default="{ controlId, controlName }">
						<LxSelect
							:id="controlId"
							v-model="drawerSide"
							:name="controlName"
							:options="drawerSideOptions"
						/>
					</template>
				</LxLabel>
				<LxLabel text="Animation">
					<template #default="{ controlId, controlName }">
						<LxSelect
							:id="controlId"
							v-model="drawerAnimation"
							:name="controlName"
							:options="drawerAnimationOptions"
						/>
					</template>
				</LxLabel>
			</div>
			<div class="lx-kitchen-sink__button-row">
				<LxButton variant="accent" size="sm" @click="drawerOpen = true">
					Open Drawer
				</LxButton>
				<LxButton variant="plain" size="sm" @click="openDrawerPreset('left', 'slide')">
					Left Slide
				</LxButton>
				<LxButton variant="plain" size="sm" @click="openDrawerPreset('top', 'fade')">
					Top Fade
				</LxButton>
				<LxButton variant="plain" size="sm" @click="openDrawerPreset('bottom', 'none')">
					Bottom Instant
				</LxButton>
			</div>
			<LxDrawer
				v-model="drawerOpen"
				title="Drawer Example"
				:side="drawerSide"
				:animation="drawerAnimation"
			>
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
				Modal
			</h3>
			<div class="lx-kitchen-sink__drawer-controls">
				<LxLabel text="Position">
					<template #default="{ controlId, controlName }">
						<LxSelect
							:id="controlId"
							v-model="modalPosition"
							:name="controlName"
							:options="modalPositionOptions"
						/>
					</template>
				</LxLabel>
				<LxLabel text="Animation">
					<template #default="{ controlId, controlName }">
						<LxSelect
							:id="controlId"
							v-model="modalAnimation"
							:name="controlName"
							:options="modalAnimationOptions"
						/>
					</template>
				</LxLabel>
			</div>
			<div class="lx-kitchen-sink__button-row">
				<LxButton variant="accent" size="sm" @click="modalOpen = true">
					Open Modal
				</LxButton>
			</div>
			<LxModal
				v-model="modalOpen"
				title="Reusable Modal"
				:position="modalPosition"
				:animation="modalAnimation"
				:show-close="true"
				width="min(92vw, 36rem)"
				max-width="36rem"
				max-height="min(80dvh, 34rem)"
			>
				<p>
					This shared modal powers popup behaviour across the framework, including drawer, icon picker, and colour picker.
				</p>
				<template #footer>
					<div class="lx-kitchen-sink__button-row">
						<LxButton variant="ghost" size="sm" @click="modalOpen = false">
							Cancel
						</LxButton>
						<LxButton variant="primary" size="sm" @click="modalOpen = false">
							Confirm
						</LxButton>
					</div>
				</template>
			</LxModal>
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
			<p class="lx-kitchen-sink__muted">
				Inline picker: {{ selectedIconChoice?.name || 'none' }} ({{ selectedIconChoice?.style || 'n/a' }})
			</p>
			<LxIconPicker v-model="selectedIconChoice" />
			<p class="lx-kitchen-sink__muted">
				Popup picker: {{ selectedPopupIconChoice?.name || 'none' }} ({{ selectedPopupIconChoice?.style || 'n/a' }})
			</p>
			<LxIconPicker
				v-model="selectedPopupIconChoice"
				:popup="true"
				popup-title="Select an icon"
			/>
		</section>

		<section class="lx-kitchen-sink__section">
			<h3>
				Popup Pickers
			</h3>
			<div class="lx-kitchen-sink__button-row">
				<LxIconPicker
					v-model="selectedPopupIconChoice"
					:popup="true"
					popup-title="Select an icon"
				/>
				<LxColourPicker
					v-model="colourValue"
					:popup="true"
					popup-title="Pick Accent Colour"
				/>
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
				<article class="lx-kitchen-sink__carousel-item">
					<h4 class="lx-kitchen-sink__subheading">
						Fade Animation
					</h4>
					<p class="lx-kitchen-sink__carousel-copy">
						Slides cross-fade for a softer transition.
					</p>
					<LxCarousel v-model="carouselIndex" :slides="carouselSlides" animation="fade" />
				</article>
				<article class="lx-kitchen-sink__carousel-item">
					<h4 class="lx-kitchen-sink__subheading">
						Slide Animation
					</h4>
					<p class="lx-kitchen-sink__carousel-copy">
						Slides move horizontally like a classic carousel.
					</p>
					<LxCarousel :slides="carouselSlides" animation="slide" />
				</article>
				<article class="lx-kitchen-sink__carousel-item">
					<h4 class="lx-kitchen-sink__subheading">
						No Animation
					</h4>
					<p class="lx-kitchen-sink__carousel-copy">
						Content swaps instantly with no transition effect.
					</p>
					<LxCarousel :slides="carouselSlides" animation="none" />
				</article>
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
				Tabs
			</h3>
			<LxTabs v-model="activeTab" variant="line">
				<LxTab value="overview" label="Overview">
					<p>
						Overview content can be rendered directly from each tab.
					</p>
				</LxTab>
				<LxTab value="details" label="Details">
					<template #tab>
						<span>Details + Slot</span>
					</template>
					<p>
						Custom tab trigger slot for richer labels.
					</p>
				</LxTab>
				<LxTab value="disabled" label="Disabled" :disabled="true">
					<p>
						Disabled tab content.
					</p>
				</LxTab>
			</LxTabs>
		</section>

		<section class="lx-kitchen-sink__section">
			<h3>
				Accordion
			</h3>
			<LxAccordion v-model="openAccordionItems" :items="accordionItems" :multiple="true" :default-open="['architecture']">
				<template #item-architecture>
					<p>
						Open multiple sections at once and control defaults through props.
					</p>
				</template>
				<template #item>
					<p class="lx-kitchen-sink__muted">
						Default accordion item slot content.
					</p>
				</template>
			</LxAccordion>
			<LxAccordion :items="accordionItems" linked default-open="architecture">
				<template #item>
					<p class="lx-kitchen-sink__muted">
						Linked mode keeps one section open and visually connects items.
					</p>
				</template>
			</LxAccordion>
		</section>

		<section class="lx-kitchen-sink__section">
			<h3>
				Popover
			</h3>
			<div class="lx-kitchen-sink__button-row">
				<LxPopover placement="bottom" trigger="click" padding="md">
					<template #trigger>
						<LxButton variant="secondary" size="sm">
							Click Popover
						</LxButton>
					</template>
					<p class="lx-kitchen-sink__muted">
						Popover content can contain any custom UI.
					</p>
				</LxPopover>

				<LxPopover placement="right" trigger="hover" padding="sm">
					<template #trigger>
						<LxButton variant="ghost" size="sm">
							Hover Popover
						</LxButton>
					</template>
					<p>
						Hover-triggered contextual information.
					</p>
				</LxPopover>
			</div>
		</section>

		<section class="lx-kitchen-sink__section">
			<h3>
				Toasts
			</h3>
			<div class="lx-kitchen-sink__button-row">
				<LxButton variant="info" size="sm" @click="pushToast('info')">
					Info Toast
				</LxButton>
				<LxButton variant="success" size="sm" @click="pushToast('success')">
					Success Toast
				</LxButton>
				<LxButton variant="warning" size="sm" @click="pushToast('warning')">
					Warning Toast
				</LxButton>
				<LxButton variant="danger" size="sm" @click="pushToast('danger')">
					Danger Toast
				</LxButton>
			</div>
			<LxToasts v-model="toastItems" position="top-right" />
		</section>

		<section class="lx-kitchen-sink__section">
			<h3>
				Stepper
			</h3>
			<LxStepper v-model="activeStep" :items="stepperItems" :linear="true">
				<template #step-build="{ item }">
					<div>
						<strong>{{ item?.label }}</strong>
					</div>
				</template>
				<template #content="{ step }">
					<p>
						Active step: {{ step }}
					</p>
					<p class="lx-kitchen-sink__muted">
						Demo state: steps 1-2 complete, step 3 active, steps 4-5 upcoming.
					</p>
				</template>
			</LxStepper>
		</section>

		<section class="lx-kitchen-sink__section">
			<h3>
				Timeline
			</h3>
			<LxTimeline type="date">
				<LxTimelineItem marker="2026-02-11" marker-note="Week 1" title="Planning" subtitle="Initial scope">
					<p class="lx-kitchen-sink__muted">
						Defined delivery scope and milestones.
					</p>
				</LxTimelineItem>
				<LxTimelineItem marker="2026-02-13" marker-note="Week 1" title="Build" subtitle="Component implementation">
					<p class="lx-kitchen-sink__muted">
						Implemented components with token-based styling.
					</p>
				</LxTimelineItem>
				<LxTimelineItem marker="2026-02-18" marker-note="Week 2" title="Review" subtitle="Validation and tests">
					<p class="lx-kitchen-sink__muted">
						Verified behaviour and prepared final docs.
					</p>
				</LxTimelineItem>
			</LxTimeline>
		</section>

		<section class="lx-kitchen-sink__section">
			<h3>
				Progress
			</h3>
			<div class="lx-kitchen-sink__button-row">
				<LxProgress :value="68" size="sm" show-label />
				<LxProgress :value="68" size="md" show-label />
				<LxProgress :value="68" size="lg" show-label />
				<LxProgress :value="68" size="xl" show-label />
			</div>
			<div class="lx-kitchen-sink__button-row">
				<LxProgress :value="42" orientation="vertical" size="sm" />
				<LxProgress :value="42" orientation="vertical" size="md" />
				<LxProgress :value="42" orientation="vertical" size="lg" />
				<LxProgress :value="42" orientation="vertical" size="xl" />
				<LxProgress :value="82" orientation="ring" size="sm" show-label />
				<LxProgress :value="82" orientation="ring" size="md" show-label />
				<LxProgress :value="82" orientation="ring" size="lg" show-label />
				<LxProgress :value="82" orientation="ring" size="xl" show-label />
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

	</section>
</template>

<script setup lang="ts">
	import { ref } from 'vue';
	import { LxAvatar } from '../avatar';
	import { LxAccordion } from '../accordion';
	import { LxBadge } from '../badge';
	import { LxBreadcrumbs } from '../breadcrumbs';
	import { LxButton } from '../button';
	import type { TLxButtonSize, TLxButtonVariant } from '../button';
	import { LxCard } from '../card';
	import { LxCombobox } from '../combobox';
	import { LxComparison } from '../comparison';
	import { LxDataTable } from '../data-table';
	import type { ILxDataTableColumn } from '../data-table';
	import { LxColourPicker } from '../colour-picker';
	import { LxDatePicker } from '../date-picker';
	import { LxDateTimePicker } from '../date-time-picker';
	import { LxDateTimeRangePicker } from '../date-time-range-picker';
	import { LxDateRangePicker } from '../date-range-picker';
	import { LxDivider } from '../divider';
	import { LxDrawer } from '../drawer';
	import type { TLxDrawerAnimation, TLxDrawerSide } from '../drawer';
	import { LxDropdown } from '../dropdown';
	import { LxFlex } from '../flex';
	import { LxIcon } from '../icon';
	import { LxIconPicker } from '../icon-picker';
	import type { ILxIconPickerValue } from '../icon-picker';
	import { LxInput } from '../input';
	import { LxLabel } from '../label';
	import { LxModal } from '../modal';
	import type { TLxModalAnimation, TLxModalPosition } from '../modal';
	import { LxNumberInput } from '../number-input';
	import { LxPopover } from '../popover';
	import { LxSelect } from '../select';
	import { LxSkeleton } from '../skeleton';
	import { LxSlider } from '../slider';
	import { LxSpinner } from '../spinner';
	import { LxSwitch } from '../switch';
	import { LxStepper } from '../stepper';
	import { LxTab } from '../tab';
	import { LxTag } from '../tag';
	import { LxTabs } from '../tabs';
	import { LxTextarea } from '../textarea';
	import { LxTimeline } from '../timeline';
	import { LxTimelineItem } from '../timeline-item';
	import { LxTimePicker } from '../time-picker';
	import { LxTimeRangePicker } from '../time-range-picker';
	import type { TLxToastVariant } from '../toast';
	import type { ILxToastsItem } from '../toasts';
	import { LxToasts } from '../toasts';
	import type { ILxKitchenSinkToken } from './types';
	import { LxCarousel } from '../carousel';
	import { LxProgress } from '../progress';
	import { LxRating } from '../rating';
	import { LxRadios } from '../radios';

	const variants: TLxButtonVariant[] = ['primary', 'secondary', 'ghost', 'accent', 'info', 'success', 'warning', 'danger'];
	const semanticVariants = variants.filter((variant): variant is Exclude<TLxButtonVariant, 'ghost' | 'plain'> => variant !== 'ghost' && variant !== 'plain');
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
	const drawerSideOptions = [
		{ label: 'Right', value: 'right' },
		{ label: 'Left', value: 'left' },
		{ label: 'Top', value: 'top' },
		{ label: 'Bottom', value: 'bottom' },
	];
	const drawerAnimationOptions = [
		{ label: 'None', value: 'none' },
		{ label: 'Fade', value: 'fade' },
		{ label: 'Slide', value: 'slide' },
	];
	const modalPositionOptions = [
		{ label: 'Center', value: 'center' },
		{ label: 'Left', value: 'left' },
		{ label: 'Right', value: 'right' },
		{ label: 'Top', value: 'top' },
		{ label: 'Bottom', value: 'bottom' },
	];
	const modalAnimationOptions = [...drawerAnimationOptions];

	const radioOptions = [
		{ label: 'Option A', value: 'a' },
		{ label: 'Option B', value: 'b' },
		{ label: 'Option C', value: 'c' },
	];
	const accordionItems = [
		{ id: 'architecture', title: 'Architecture', description: 'Core framework structure' },
		{ id: 'routing', title: 'Routing', description: 'Opinionated routing defaults' },
		{ id: 'delivery', title: 'Delivery', description: 'Runtime rendering and deployment' },
	];
	const stepperItems = [
		{ id: 'discover', label: 'Discover', description: 'Gather requirements' },
		{ id: 'design', label: 'Design', description: 'Create the solution plan' },
		{ id: 'build', label: 'Build', description: 'Implement components' },
		{ id: 'test', label: 'Test', description: 'Validate behaviour and quality' },
		{ id: 'ship', label: 'Ship', description: 'Release to production' },
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
	const surfaceTokens: ILxKitchenSinkToken[] = [
		{ key: 'base', label: 'Base', token: '--lx-colour-surface-base' },
		{ key: 'raised', label: 'Raised', token: '--lx-colour-surface-raised' },
		{ key: 'sunken', label: 'Sunken', token: '--lx-colour-surface-sunken' },
		{ key: 'overlay', label: 'Overlay', token: '--lx-colour-surface-overlay' },
		{ key: 'border', label: 'Border', token: '--lx-colour-surface-border' },
		{ key: 'text', label: 'Text', token: '--lx-colour-surface-text' },
		{ key: 'text-muted', label: 'Text Muted', token: '--lx-colour-surface-text-muted' },
		{ key: 'inverse', label: 'Inverse', token: '--lx-colour-surface-inverse' },
	];
	const spacingTokens: ILxKitchenSinkToken[] = [
		{ key: 'space-2xs', label: '2XS', token: '--lx-size-space-2xs' },
		{ key: 'space-xs', label: 'XS', token: '--lx-size-space-xs' },
		{ key: 'space-sm', label: 'SM', token: '--lx-size-space-sm' },
		{ key: 'space-md', label: 'MD', token: '--lx-size-space-md' },
		{ key: 'space-lg', label: 'LG', token: '--lx-size-space-lg' },
		{ key: 'space-xl', label: 'XL', token: '--lx-size-space-xl' },
		{ key: 'space-2xl', label: '2XL', token: '--lx-size-space-2xl' },
		{ key: 'space-3xl', label: '3XL', token: '--lx-size-space-3xl' },
	];

	interface IKitchenSinkTableRow {
		id: number,
		name: string,
		role: string,
		status: 'active' | 'paused' | 'invited',
		billable: boolean,
		region: string,
		revenue: number,
		lastLogin: string,
	}

	const tableColumnsBuiltIn: ILxDataTableColumn<IKitchenSinkTableRow>[] = [
		{ key: 'name', heading: 'Name', sortable: true, filterable: true, width: '15rem' },
		{
			key: 'role',
			heading: 'Role (Combobox)',
			sortable: true,
			filterable: true,
			filterType: 'combobox',
			filterPlaceholder: 'Select role...',
			filterOptions: [
				{ label: 'Engineer', value: 'Engineer' },
				{ label: 'Product Manager', value: 'Product Manager' },
				{ label: 'Designer', value: 'Designer' },
			],
		},
		{
			key: 'status',
			heading: 'Status (Select)',
			sortable: true,
			filterable: true,
			width: '11rem',
			filterType: 'select',
			filterPlaceholder: 'Select status...',
			filterOptions: [
				{ label: 'Active', value: 'active' },
				{ label: 'Paused', value: 'paused' },
				{ label: 'Invited', value: 'invited' },
			],
		},
		{
			key: 'billable',
			heading: 'Billable (Switch)',
			sortable: true,
			filterable: true,
			width: '11rem',
			filterType: 'switch',
			format: value => value ? 'Yes' : 'No',
		},
		{
			key: 'region',
			heading: 'Region (Select)',
			sortable: true,
			filterable: true,
			width: '12rem',
			filterType: 'select',
		},
		{
			key: 'revenue',
			heading: 'Revenue',
			sortable: true,
			filterable: true,
			align: 'right',
			width: '8rem',
			filterType: 'number',
			format: value => `£${Number(value).toLocaleString('en-GB')}`,
		},
		{
			key: 'lastLogin',
			heading: 'Last Login (Date)',
			sortable: true,
			filterable: true,
			width: '10rem',
			filterType: 'date',
			sortValue: row => new Date(row.lastLogin),
		},
	];

	const tableColumnsCustom: ILxDataTableColumn<IKitchenSinkTableRow>[] = [
		{ key: 'name', heading: 'Name', sortable: true, filterable: true, width: '15rem' },
		{ key: 'status', heading: 'Status', sortable: true, filterable: true, width: '9rem', filterType: 'select' },
		{
			key: 'revenue',
			heading: 'Revenue (Custom Filter Slot)',
			sortable: true,
			filterable: true,
			width: '14rem',
			align: 'right',
			filterPredicate: (row, filterValue) => {
				const selectedBand = String(filterValue ?? '');
				if (selectedBand.length === 0) {
					return true;
				}

				if (selectedBand === 'high') {
					return row.revenue >= 15000;
				}

				if (selectedBand === 'medium') {
					return row.revenue >= 10000 && row.revenue < 15000;
				}

				if (selectedBand === 'low') {
					return row.revenue < 10000;
				}

				return true;
			},
			format: value => `£${Number(value).toLocaleString('en-GB')}`,
		},
		{
			key: 'lastLogin',
			heading: 'Last Login (Date Range)',
			sortable: true,
			filterable: true,
			width: '14rem',
			filterType: 'date-range',
			sortValue: row => new Date(row.lastLogin),
		},
	];

	const tableRows: IKitchenSinkTableRow[] = [
		{ id: 1, name: 'Maya Evans', role: 'Product Manager', status: 'active', billable: true, region: 'United Kingdom', revenue: 18240, lastLogin: '2026-02-11' },
		{ id: 2, name: 'Luca Bianchi', role: 'Engineer', status: 'active', billable: true, region: 'Italy', revenue: 14920, lastLogin: '2026-02-12' },
		{ id: 3, name: 'Sofia Lind', role: 'Designer', status: 'paused', billable: false, region: 'Sweden', revenue: 9410, lastLogin: '2026-02-02' },
		{ id: 4, name: 'Emil Novak', role: 'Engineer', status: 'active', billable: true, region: 'Czechia', revenue: 12775, lastLogin: '2026-02-08' },
		{ id: 5, name: 'Clara Moreau', role: 'Support Lead', status: 'invited', billable: false, region: 'France', revenue: 7130, lastLogin: '2026-01-28' },
		{ id: 6, name: 'Jonas Keller', role: 'Engineer', status: 'active', billable: true, region: 'Germany', revenue: 16090, lastLogin: '2026-02-13' },
		{ id: 7, name: 'Nora Jansen', role: 'Data Analyst', status: 'paused', billable: true, region: 'Netherlands', revenue: 11004, lastLogin: '2026-02-01' },
		{ id: 8, name: 'Iris Costa', role: 'Customer Success', status: 'active', billable: false, region: 'Portugal', revenue: 10820, lastLogin: '2026-02-06' },
		{ id: 9, name: 'Marek Zielinski', role: 'Ops Engineer', status: 'invited', billable: false, region: 'Poland', revenue: 8955, lastLogin: '2026-01-20' },
		{ id: 10, name: 'Elena Popov', role: 'Finance Partner', status: 'active', billable: true, region: 'Romania', revenue: 20110, lastLogin: '2026-02-10' },
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
	const drawerSide = ref<TLxDrawerSide>('right');
	const drawerAnimation = ref<TLxDrawerAnimation>('none');
	const modalOpen = ref(false);
	const modalPosition = ref<TLxModalPosition>('center');
	const modalAnimation = ref<TLxModalAnimation>('fade');
	const selectedAction = ref('none');
	const selectedIconChoice = ref<ILxIconPickerValue | null>({
		name: 'house',
		style: 'solid',
	});
	const selectedPopupIconChoice = ref<ILxIconPickerValue | null>({
		name: 'bell',
		style: 'regular',
	});
	const carouselIndex = ref(0);
	const comparisonSplit = ref(50);
	const ratingValue = ref(3);
	const sliderValue = ref(50);
	const numberValue = ref(6);
	const radioValue = ref('b');
	const radioValueInline = ref('a');
	const radioValueCardVertical = ref('c');
	const radioValueCardInline = ref('b');
	const dateValue = ref(new Date(2026, 1, 13));
	const dateRangeValue = ref<Date[]>([
		new Date(2026, 1, 10),
		new Date(2026, 1, 14),
	]);
	const dateTimeValue = ref<Date | null>(new Date(2026, 1, 13, 9, 30));
	const dateTimeRangeValue = ref<Date[]>([
		new Date(2026, 1, 10, 9, 0),
		new Date(2026, 1, 14, 17, 0),
	]);
	const timeValue = ref('09:30');
	const timeRangeValue = ref<string[]>(['09:00', '17:00']);
	const activeTab = ref('overview');
	const openAccordionItems = ref<string[]>(['architecture']);
	const activeStep = ref('build');
	const toastItems = ref<ILxToastsItem[]>([]);
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

	const openDrawerPreset = (side: TLxDrawerSide, animation: TLxDrawerAnimation): void => {
		drawerSide.value = side;
		drawerAnimation.value = animation;
		drawerOpen.value = true;
	};

	const pushToast = (variant: TLxToastVariant): void => {
		const id = `${variant}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
		toastItems.value = [
			{
				id,
				title: `${variant[0]?.toUpperCase()}${variant.slice(1)}`,
				text: 'Example toast notification from the kitchen sink.',
				variant,
				timeout: 5000,
			},
			...toastItems.value,
		];
	};
</script>

<style scoped lang="scss">
	.lx-kitchen-sink {
		display: grid;
		gap: var(--lx-size-space-xl);
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

	.lx-kitchen-sink__subheading {
		border-top: var(--lx-size-border-width-hairline) solid var(--lx-colour-surface-border);
		font-size: var(--lx-font-size-sm);
		font-weight: var(--lx-font-weight-semibold);
		margin: var(--lx-size-space-xs) 0 0;
		padding-top: var(--lx-size-space-sm);
	}

	.lx-kitchen-sink__input-group {
		background: var(--lx-colour-surface-raised);
		border: var(--lx-size-border-width-hairline) solid var(--lx-colour-surface-border);
		border-radius: var(--lx-size-radius-md);
		display: grid;
		gap: var(--lx-size-space-md);
		padding: var(--lx-size-space-md);
	}

	.lx-kitchen-sink__input-group > .lx-kitchen-sink__subheading {
		border-top: none;
		margin: 0;
		padding-top: 0;
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

	.lx-kitchen-sink__flex-grid {
		display: grid;
		gap: var(--lx-size-space-md);
		grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
	}

	.lx-kitchen-sink__demo-card {
		background: var(--lx-colour-surface-raised);
		border: var(--lx-size-border-width-hairline) solid var(--lx-colour-surface-border);
		border-radius: var(--lx-size-radius-sm);
		display: grid;
		gap: var(--lx-size-space-sm);
		padding: var(--lx-size-space-sm);
	}

	.lx-kitchen-sink__demo-title {
		color: var(--lx-colour-surface-text-muted);
		font-size: var(--lx-font-size-xs);
		font-weight: var(--lx-font-weight-semibold);
		letter-spacing: 0.02em;
		margin: 0;
		text-transform: uppercase;
	}

	.lx-kitchen-sink__flex-surface {
		background: var(--lx-colour-surface-base);
		border: var(--lx-size-border-width-hairline) dashed var(--lx-colour-surface-border);
		border-radius: var(--lx-size-radius-sm);
		min-height: 3.25rem;
		padding: var(--lx-size-space-sm);
	}

	.lx-kitchen-sink__flex-box {
		align-items: center;
		background: color-mix(in srgb, var(--lx-colour-primary) 16%, var(--lx-colour-surface-base));
		border: var(--lx-size-border-width-hairline) solid var(--lx-colour-surface-border);
		border-radius: var(--lx-size-radius-xs);
		display: inline-flex;
		font-size: var(--lx-font-size-xs);
		font-weight: var(--lx-font-weight-semibold);
		justify-content: center;
		min-height: 2rem;
		min-width: 2rem;
		padding: 0 var(--lx-size-space-sm);
	}

	.lx-kitchen-sink__inline-example {
		margin: 0 var(--lx-size-space-xs);
	}

	.lx-kitchen-sink__inline-pill {
		background: var(--lx-colour-secondary);
		border-radius: var(--lx-size-radius-pill);
		color: var(--lx-colour-on-secondary);
		font-size: var(--lx-font-size-xs);
		padding: 0.12rem 0.45rem;
	}

	.lx-kitchen-sink__carousel-grid {
		display: grid;
		gap: var(--lx-size-space-md);
		grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
	}

	.lx-kitchen-sink__carousel-item {
		display: grid;
		gap: var(--lx-size-space-xs);
	}

	.lx-kitchen-sink__carousel-copy {
		color: var(--lx-colour-surface-text-muted);
		font-size: var(--lx-font-size-sm);
		margin: 0;
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

	.lx-kitchen-sink__token-layout {
		display: grid;
		gap: var(--lx-size-space-md);
		grid-template-columns: repeat(auto-fit, minmax(17rem, 1fr));
	}

	.lx-kitchen-sink__token-block {
		background: var(--lx-colour-surface-raised);
		border: var(--lx-size-border-width-hairline) solid var(--lx-colour-surface-border);
		border-radius: var(--lx-size-radius-md);
		display: grid;
		gap: var(--lx-size-space-sm);
		padding: var(--lx-size-space-md);
	}

	.lx-kitchen-sink__token-block h4 {
		font-size: var(--lx-font-size-sm);
		margin: 0;
	}

	.lx-kitchen-sink__surface-grid,
	.lx-kitchen-sink__spacing-grid {
		display: grid;
		gap: var(--lx-size-space-sm);
	}

	.lx-kitchen-sink__drawer-controls {
		display: grid;
		gap: var(--lx-size-space-md);
		grid-template-columns: repeat(auto-fit, minmax(11rem, 1fr));
	}

	.lx-kitchen-sink__table-stack {
		display: grid;
		gap: var(--lx-size-space-lg);
	}

	.lx-kitchen-sink__table-name {
		align-items: center;
		display: inline-flex;
		gap: var(--lx-size-space-sm);
	}

	.lx-kitchen-sink__table-name p {
		margin: 0;
	}

	.lx-kitchen-sink__table-filter-select {
		background: var(--lx-colour-surface-base);
		border: var(--lx-size-border-width-hairline) solid var(--lx-colour-surface-border);
		border-radius: var(--lx-size-radius-xs);
		color: var(--lx-colour-surface-text);
		font: inherit;
		font-size: var(--lx-font-size-xs);
		height: var(--lx-size-control-height-sm);
		padding: 0 var(--lx-size-space-xs);
		width: 100%;
	}

	.lx-kitchen-sink__surface-item,
	.lx-kitchen-sink__spacing-item {
		display: grid;
		gap: var(--lx-size-space-xs);
	}

	.lx-kitchen-sink__surface-item code,
	.lx-kitchen-sink__spacing-item code {
		color: var(--lx-colour-surface-text-muted);
		font-size: var(--lx-font-size-xs);
	}

	.lx-kitchen-sink__surface-swatch {
		border: var(--lx-size-border-width-hairline) solid var(--lx-colour-surface-border);
		border-radius: var(--lx-size-radius-sm);
		height: 2.4rem;
	}

	.lx-kitchen-sink__spacing-bar {
		background: var(--lx-colour-surface-sunken);
		border-radius: var(--lx-size-radius-pill);
		height: 0.6rem;
		overflow: hidden;
	}

	.lx-kitchen-sink__spacing-bar > div {
		background: var(--lx-colour-primary);
		border-radius: inherit;
		height: 100%;
		min-width: 0.3rem;
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
