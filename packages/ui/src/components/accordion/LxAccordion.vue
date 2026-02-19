<template>
	<section class="lx-accordion" :class="{ 'lx-accordion--connected': isConnected }">
		<article
			v-for="item in props.items"
			:key="item.id"
			class="lx-accordion__item"
			:class="{ 'is-open': isOpen(item.id), 'is-disabled': item.disabled }"
		>
			<button
				type="button"
				class="lx-accordion__trigger"
				:aria-expanded="isOpen(item.id)"
				:aria-controls="`panel-${item.id}`"
				:disabled="item.disabled"
				@click="toggle(item.id)"
			>
				<div class="lx-accordion__title-wrap">
					<slot name="title" :item="item" :open="isOpen(item.id)">
						<span class="lx-accordion__title">{{ item.title }}</span>
						<small v-if="item.description" class="lx-accordion__description">{{ item.description }}</small>
					</slot>
				</div>
				<span class="lx-accordion__icon" aria-hidden="true">{{ isOpen(item.id) ? '−' : '+' }}</span>
			</button>

			<div
				v-if="isOpen(item.id)"
				:id="`panel-${item.id}`"
				class="lx-accordion__panel"
				role="region"
			>
				<slot :name="`item-${item.id}`" :item="item">
					<slot name="item" :item="item" />
				</slot>
			</div>
		</article>
	</section>
</template>

<script setup lang='ts'>
	import { computed, watch } from 'vue';
	import type { ILxAccordionProps } from './types';

	const props = withDefaults(defineProps<ILxAccordionProps>(), {
		multiple: false,
		linked: false,
		defaultOpen: () => [],
	});

	const model = defineModel<string[]>({
		default: () => [],
	});

	const isSingleMode = computed(() => props.linked || !props.multiple);
	const isConnected = computed(() => props.linked && isSingleMode.value);

	const initialOpenIds = computed<string[]>(() => {
		const normalised = (() => {
			if (Array.isArray(props.defaultOpen)) {
				return props.defaultOpen;
			}

			if (typeof props.defaultOpen === 'string' && props.defaultOpen.length > 0) {
				return [props.defaultOpen];
			}

			return [];
		})();

		if (isSingleMode.value) {
			return normalised.slice(0, 1);
		}

		return normalised;
	});

	if (model.value.length === 0 && initialOpenIds.value.length > 0) {
		model.value = initialOpenIds.value;
	}

	watch(() => [props.items, isSingleMode.value] as const, () => {
		const enabledIds = new Set(
			props.items
				.filter(item => !item.disabled)
				.map(item => item.id),
		);

		const nextOpen = model.value.filter(id => enabledIds.has(id));
		model.value = isSingleMode.value ? nextOpen.slice(0, 1) : nextOpen;
	}, { immediate: true });

	const isOpen = (id: string): boolean => model.value.includes(id);

	const toggle = (id: string): void => {
		if (!isSingleMode.value) {
			model.value = isOpen(id)
				? model.value.filter(itemId => itemId !== id)
				: [...model.value, id];
			return;
		}

		model.value = isOpen(id) ? [] : [id];
	};
</script>

<style scoped lang='scss'>
	.lx-accordion {
		display: grid;
		gap: var(--lx-size-space-sm);
	}

	.lx-accordion__item {
		background: var(--lx-colour-surface-raised);
		border: var(--lx-size-border-width-hairline) solid var(--lx-colour-surface-border);
		border-radius: var(--lx-size-radius-md);
		overflow: hidden;
	}

	.lx-accordion__trigger {
		align-items: center;
		appearance: none;
		background: transparent;
		border: none;
		color: var(--lx-colour-surface-text);
		cursor: pointer;
		display: flex;
		font: inherit;
		justify-content: space-between;
		padding: var(--lx-size-space-md);
		text-align: left;
		width: 100%;
	}

	.lx-accordion__trigger:focus-visible {
		outline: var(--lx-size-border-width-standard) solid var(--lx-colour-focus-ring);
		outline-offset: -1px;
	}

	.lx-accordion__title-wrap {
		display: grid;
		gap: var(--lx-size-space-2xs);
	}

	.lx-accordion__title {
		font-weight: var(--lx-font-weight-semibold);
	}

	.lx-accordion__description {
		color: var(--lx-colour-surface-text-muted);
		font-size: var(--lx-font-size-xs);
	}

	.lx-accordion__icon {
		color: var(--lx-colour-surface-text-muted);
		font-size: var(--lx-font-size-lg);
		line-height: 1;
	}

	.lx-accordion__panel {
		border-top: var(--lx-size-border-width-hairline) solid var(--lx-colour-surface-border);
		padding: var(--lx-size-space-md);
	}

	.lx-accordion__item.is-disabled {
		opacity: 0.6;
	}

	.lx-accordion__item.is-disabled .lx-accordion__trigger {
		cursor: not-allowed;
	}

	.lx-accordion--connected {
		gap: 0;
	}

	.lx-accordion--connected .lx-accordion__item {
		border-radius: 0;
	}

	.lx-accordion--connected .lx-accordion__item:first-child {
		border-radius: var(--lx-size-radius-md) var(--lx-size-radius-md) 0 0;
	}

	.lx-accordion--connected .lx-accordion__item:last-child {
		border-radius: 0 0 var(--lx-size-radius-md) var(--lx-size-radius-md);
	}

	.lx-accordion--connected .lx-accordion__item + .lx-accordion__item {
		border-top: 0;
	}
</style>
