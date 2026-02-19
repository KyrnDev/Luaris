<template>
	<section class="lx-stepper" :class="[`lx-stepper--${props.orientation}`]">
		<ol class="lx-stepper__list">
			<li
				v-for="(item, index) in props.items"
				:key="item.id"
				class="lx-stepper__item"
				:class="{
					'is-active': item.id === activeStep,
					'is-complete': index < activeIndex,
					'is-disabled': item.disabled,
				}"
			>
				<button
					type="button"
					class="lx-stepper__trigger"
					:disabled="item.disabled || !canSelect(index)"
					@click="selectStep(item.id)"
				>
					<slot name="step" :item="item" :index="index" :active="item.id === activeStep" :complete="index < activeIndex">
						<span class="lx-stepper__indicator" aria-hidden="true">
							<span class="lx-stepper__indicator-value">
								{{ index < activeIndex ? '✓' : index + 1 }}
							</span>
						</span>
						<div class="lx-stepper__meta">
							<strong>{{ item.label }}</strong>
							<small v-if="item.description">{{ item.description }}</small>
						</div>
					</slot>
				</button>
			</li>
		</ol>

		<div class="lx-stepper__panel">
			<slot :name="`step-${activeStep}`" :step="activeStep" :item="activeItem">
				<slot name="content" :step="activeStep" :item="activeItem" />
			</slot>
		</div>
	</section>
</template>

<script setup lang='ts'>
	import { computed, watch } from 'vue';
	import type { ILxStepperProps } from './types';

	const props = withDefaults(defineProps<ILxStepperProps>(), {
		orientation: 'horizontal',
		linear: false,
	});

	const model = defineModel<string>({
		default: '',
	});

	const firstAvailableStep = computed(() => props.items.find(item => !item.disabled)?.id || '');
	const activeStep = computed(() => {
		const exists = props.items.some(item => item.id === model.value && !item.disabled);
		return exists ? model.value : firstAvailableStep.value;
	});
	const activeIndex = computed(() => props.items.findIndex(item => item.id === activeStep.value));
	const activeItem = computed(() => props.items.find(item => item.id === activeStep.value));

	const canSelect = (index: number): boolean => {
		if (!props.linear) {
			return true;
		}

		return index <= activeIndex.value + 1;
	};

	const selectStep = (id: string): void => {
		const targetIndex = props.items.findIndex(item => item.id === id);
		if (targetIndex === -1 || !canSelect(targetIndex)) {
			return;
		}

		model.value = id;
	};

	watch(() => props.items, () => {
		if (!model.value) {
			model.value = firstAvailableStep.value;
		}
	}, { immediate: true });
</script>

<style scoped lang='scss'>
	.lx-stepper {
		display: grid;
		gap: var(--lx-size-space-md);
	}

	.lx-stepper__list {
		display: flex;
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.lx-stepper--vertical {
		grid-template-columns: minmax(12rem, 16rem) 1fr;
	}

	.lx-stepper--vertical .lx-stepper__list {
		gap: var(--lx-size-space-sm);
		flex-direction: column;
	}

	.lx-stepper__item {
		display: flex;
		flex: 1;
		justify-content: center;
		min-width: 0;
		position: relative;
	}

	.lx-stepper__item::after {
		background: var(--lx-colour-surface-border);
		content: '';
		height: var(--lx-size-border-width-hairline);
		left: 50%;
		position: absolute;
		right: -50%;
		top: 1rem;
		z-index: 0;
	}

	.lx-stepper__item:last-child::after {
		display: none;
	}

	.lx-stepper__trigger {
		appearance: none;
		background: transparent;
		border: none;
		color: var(--lx-colour-surface-text);
		cursor: pointer;
		display: grid;
		font: inherit;
		gap: var(--lx-size-space-xs);
		justify-items: center;
		padding: 0;
		position: relative;
		text-align: center;
		width: 100%;
		z-index: 1;
	}

	.lx-stepper__trigger:focus-visible {
		outline: var(--lx-size-border-width-standard) solid var(--lx-colour-focus-ring);
		outline-offset: 2px;
	}

	.lx-stepper__indicator {
		background: var(--lx-colour-surface-sunken);
		border: var(--lx-size-border-width-hairline) solid var(--lx-colour-surface-border);
		border-radius: var(--lx-size-radius-pill);
		display: inline-grid;
		font-size: var(--lx-font-size-sm);
		font-weight: var(--lx-font-weight-semibold);
		height: 2rem;
		place-items: center;
		min-width: 2rem;
	}

	.lx-stepper__indicator-value {
		display: block;
		line-height: 1;
		transform: translateY(1px);
	}

	.lx-stepper__meta {
		display: grid;
		gap: var(--lx-size-space-2xs);
		justify-items: center;
	}

	.lx-stepper__meta small {
		color: var(--lx-colour-surface-text-muted);
		font-size: var(--lx-font-size-xs);
	}

	.lx-stepper__item.is-active .lx-stepper__indicator {
		background: var(--lx-colour-primary);
		border-color: var(--lx-colour-primary);
		box-shadow: 0 0 0 3px color-mix(in srgb, var(--lx-colour-primary) 20%, transparent);
		color: var(--lx-colour-on-primary);
	}

	.lx-stepper__item.is-active .lx-stepper__meta strong {
		color: var(--lx-colour-primary);
	}

	.lx-stepper__item.is-active .lx-stepper__meta small::before {
		content: 'Current step • ';
		font-weight: var(--lx-font-weight-semibold);
	}

	.lx-stepper__item.is-complete .lx-stepper__indicator {
		background: var(--lx-colour-success);
		border-color: var(--lx-colour-success);
		color: var(--lx-colour-on-success);
	}

	.lx-stepper__item.is-complete::after {
		background: color-mix(in srgb, var(--lx-colour-success) 60%, var(--lx-colour-surface-border));
	}

	.lx-stepper__item.is-disabled {
		opacity: 0.55;
	}

	.lx-stepper__item.is-disabled .lx-stepper__trigger {
		cursor: not-allowed;
	}

	.lx-stepper--vertical .lx-stepper__item {
		justify-content: flex-start;
	}

	.lx-stepper--vertical .lx-stepper__item::after {
		bottom: calc(var(--lx-size-space-sm) * -1);
		height: auto;
		left: 1rem;
		right: auto;
		top: calc(2rem + var(--lx-size-space-2xs));
		width: var(--lx-size-border-width-hairline);
	}

	.lx-stepper--vertical .lx-stepper__trigger {
		grid-template-columns: auto 1fr;
		justify-items: start;
		text-align: left;
	}

	.lx-stepper--vertical .lx-stepper__meta {
		justify-items: start;
	}

	.lx-stepper__panel {
		background: var(--lx-colour-surface-raised);
		border: var(--lx-size-border-width-hairline) solid var(--lx-colour-surface-border);
		border-radius: var(--lx-size-radius-md);
		padding: var(--lx-size-space-md);
	}
</style>
