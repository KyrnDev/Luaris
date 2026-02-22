import { mount } from '@vue/test-utils';
import { defineComponent } from 'vue';
import { describe, expect, it, vi } from 'vitest';
import LxTimeline from '../LxTimeline.vue';
import LxTimelineItem from '../../timeline-item/LxTimelineItem.vue';

class ResizeObserverStub {
	public observe = vi.fn();
	public disconnect = vi.fn();
}

const TimelineHarness = defineComponent({
	components: { LxTimeline, LxTimelineItem },
	template: `
		<LxTimeline>
			<LxTimelineItem id="a" marker="2024" title="Start">Start body</LxTimelineItem>
			<LxTimelineItem id="b" marker="2025" title="Next">Next body</LxTimelineItem>
		</LxTimeline>
	`,
});

describe('LxTimeline', () => {
	it('covers default marker fallback and root-less width update guard directly', () => {
		const wrapper = mount(defineComponent({
			components: { LxTimeline, LxTimelineItem },
			template: `
				<LxTimeline type="custom" ref="timelineRef">
					<LxTimelineItem id="c1" />
				</LxTimeline>
			`,
		}));

		expect(wrapper.text()).toContain('•');

		const timeline = wrapper.findComponent(LxTimeline);
		const vm = timeline.vm as unknown as {
			defaultMarker?: (index: number, type: string) => string,
			updateOverviewWidth?: () => void,
			rootRef?: { value: HTMLElement | null },
		};

		expect(vm.defaultMarker?.(0, 'unknown')).toBe('•');
		wrapper.unmount();
		expect(() => vm.updateOverviewWidth?.()).not.toThrow();
	});

	it('covers empty default-slot branch', () => {
		const wrapper = mount(LxTimeline);
		expect(wrapper.findAll('.lx-timeline__item')).toHaveLength(0);
	});

	it('renders timeline items and marker data', async () => {
		vi.stubGlobal('ResizeObserver', ResizeObserverStub);
		const wrapper = mount(TimelineHarness);
		await wrapper.vm.$nextTick();
		expect(wrapper.findAll('.lx-timeline__item')).toHaveLength(2);
		expect(wrapper.text()).toContain('Start');
		expect(wrapper.text()).toContain('Next');
		vi.unstubAllGlobals();
	});

	it('supports type markers, horizontal mode and custom slots', async () => {
		vi.stubGlobal('ResizeObserver', undefined);
		const wrapper = mount(defineComponent({
			components: { LxTimeline, LxTimelineItem },
			template: `
				<LxTimeline orientation="horizontal" type="number">
					<LxTimelineItem id="one" title="One" subtitle="Sub">
						<template #marker><span class="custom-marker">M</span></template>
						<div class="content-one">Body</div>
					</LxTimelineItem>
					<div>
						<LxTimelineItem id="two" type="date" marker-note="note" />
					</div>
				</LxTimeline>
			`,
		}));
		await wrapper.vm.$nextTick();
		expect(wrapper.find('.lx-timeline--horizontal').exists()).toBe(true);
		expect(wrapper.find('.custom-marker').exists()).toBe(true);
		expect(wrapper.text()).toContain('One');
		expect(wrapper.text()).toContain('Date');
		vi.unstubAllGlobals();
	});

	it('covers marker defaults, filtering and observer updates', async () => {
		const observe = vi.fn();
		const disconnect = vi.fn();
		let resizeCallback: (() => void) | null = null;
		vi.stubGlobal('ResizeObserver', class {
			public constructor(callback: () => void) {
				resizeCallback = callback;
			}

			public observe = observe;
			public disconnect = disconnect;
		});

		const wrapper = mount(defineComponent({
			components: { LxTimeline, LxTimelineItem },
			data: () => ({ show: true }),
			template: `
				<LxTimeline type="year">
					<LxTimelineItem id="y1" />
					<span class="ignored">Ignore me</span>
					<LxTimelineItem v-if="show" id="n1" type="number" />
				</LxTimeline>
			`,
		}));

		await wrapper.vm.$nextTick();
		expect(wrapper.text()).toContain('Year');
		expect(wrapper.text()).toContain('2');
		expect(observe).toHaveBeenCalled();
		resizeCallback?.();

		await wrapper.setData({ show: false });
		await wrapper.vm.$nextTick();
		expect(disconnect).toHaveBeenCalled();

		wrapper.unmount();
		expect(disconnect).toHaveBeenCalled();
		vi.unstubAllGlobals();
	});

	it('covers internal fallbacks and null overview refs in observer loops', async () => {
		const observe = vi.fn();
		const disconnect = vi.fn();
		vi.stubGlobal('ResizeObserver', class {
			public observe = observe;
			public disconnect = disconnect;
		});

		const wrapper = mount(defineComponent({
			components: { LxTimeline, LxTimelineItem },
			data: () => ({ showSecond: true }),
			template: `
				<LxTimeline ref="timelineRef">
					<LxTimelineItem />
					<LxTimelineItem v-if="showSecond" id="b" title="B" />
				</LxTimeline>
			`,
		}));
		const timeline = wrapper.findComponent(LxTimeline);
		const vm = timeline.vm as unknown as {
			items?: Array<{ id: string }>,
			rootRef?: { value: HTMLElement | null },
			overviewRefs?: { value: Array<HTMLElement | null> },
			updateOverviewWidth?: () => void,
			setOverviewRef?: (element: Element | null, index: number) => void,
		};
		vm.setOverviewRef?.(null, 0);
		vm.setOverviewRef?.(null, 1);
		await wrapper.vm.$nextTick();
		expect(wrapper.text()).toContain('Item 1');

		expect(vm.items?.[0]?.id).toBe('timeline-0');
		vm.setOverviewRef?.(null, 0);
		if (vm.rootRef?.value && vm.overviewRefs) {
			vm.overviewRefs.value = [null];
			vm.updateOverviewWidth?.();
			expect(vm.rootRef.value.style.getPropertyValue('--lx-timeline-overview-width')).toBe('0px');
		}

		vm.setOverviewRef?.(null, 0);
		await wrapper.setData({ showSecond: false });
		await wrapper.vm.$nextTick();
		expect(disconnect).toHaveBeenCalled();
		expect(observe).toHaveBeenCalled();

		wrapper.unmount();
		vi.unstubAllGlobals();
	});
});
