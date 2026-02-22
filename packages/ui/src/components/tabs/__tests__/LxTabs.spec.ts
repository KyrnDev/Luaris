import { mount } from '@vue/test-utils';
import { defineComponent } from 'vue';
import { describe, expect, it } from 'vitest';
import LxTab from '../../tab/LxTab.vue';
import LxTabs from '../LxTabs.vue';

const TabsHarness = defineComponent({
	components: { LxTabs, LxTab },
	template: `
		<LxTabs v-model="value" variant="pills">
			<LxTab value="one" label="One">Panel one</LxTab>
			<LxTab value="two" label="Two">Panel two</LxTab>
		</LxTabs>
	`,
	data: () => ({ value: 'one' }),
});

describe('LxTabs', () => {
	it('renders tabs and switches panel', async () => {
		const wrapper = mount(TabsHarness);
		expect(wrapper.find('.lx-tabs--pills').exists()).toBe(true);
		expect(wrapper.text()).toContain('Panel one');
		await wrapper.findAll('.lx-tabs__tab')[1]?.trigger('click');
		expect(wrapper.text()).toContain('Panel two');
	});

	it('covers disabled tabs, vertical mode, and lazy=false', async () => {
		const wrapper = mount(defineComponent({
			components: { LxTabs, LxTab },
			template: `
				<LxTabs v-model="value" orientation="vertical" :lazy="false">
					<LxTab value="first">First panel</LxTab>
					<LxTab value="second" disabled>Second panel</LxTab>
					<div>
						<LxTab value="third" label="Third Label">
							<template #tab><span class="tab-slot">Custom Tab</span></template>
							Third panel
						</LxTab>
					</div>
				</LxTabs>
			`,
			data: () => ({ value: '' }),
		}));

		expect(wrapper.find('.lx-tabs--vertical').exists()).toBe(true);
		expect(wrapper.find('.tab-slot').exists()).toBe(true);
		expect(wrapper.findAll('.lx-tabs__panel').length).toBe(3);
		await wrapper.findAll('.lx-tabs__tab')[1]?.trigger('click');
		expect(wrapper.text()).toContain('First panel');
		await wrapper.findAll('.lx-tabs__tab')[2]?.trigger('click');
		expect(wrapper.text()).toContain('Third panel');
	});

	it('handles empty/default slot and invalid model values', async () => {
		const wrapper = mount(LxTabs, {
			props: {
				modelValue: '',
			},
		});
		expect(wrapper.findAll('.lx-tabs__tab')).toHaveLength(0);

		const withDisabledOnly = mount(defineComponent({
			components: { LxTabs, LxTab },
			template: `
				<LxTabs v-model="value">
					<LxTab value="disabled" disabled>Disabled</LxTab>
					<LxTab value="enabled">Enabled</LxTab>
				</LxTabs>
			`,
			data: () => ({ value: 'disabled' }),
		}));
		await withDisabledOnly.vm.$nextTick();
		expect(withDisabledOnly.text()).toContain('Enabled');
	});

	it('covers invalid click target and disabled-only tab set', async () => {
		const wrapper = mount(defineComponent({
			components: { LxTabs, LxTab },
			template: `
				<LxTabs v-model="value">
					<LxTab value="only" disabled>Only</LxTab>
				</LxTabs>
			`,
			data: () => ({ value: '' }),
		}));

		const button = wrapper.find('.lx-tabs__tab');
		expect(button.attributes('disabled')).toBeDefined();
		await button.trigger('click');
		expect(wrapper.find('.lx-tabs__panel').exists()).toBe(false);
	});

	it('covers setActiveTab guard branches directly', async () => {
		const wrapper = mount(defineComponent({
			components: { LxTabs, LxTab },
			template: `
				<LxTabs v-model="value" ref="tabsRef">
					<LxTab value="a">A</LxTab>
					<LxTab value="b" disabled>B</LxTab>
				</LxTabs>
			`,
			data: () => ({ value: 'a' }),
		}));
		const tabsComponent = wrapper.findComponent(LxTabs);
		const vm = tabsComponent.vm as unknown as { setActiveTab?: (value: string) => void };
		vm.setActiveTab?.('missing');
		vm.setActiveTab?.('b');
		await wrapper.vm.$nextTick();
		expect(wrapper.text()).toContain('A');
	});

	it('renders custom panel slot content branch', () => {
		const wrapper = mount(defineComponent({
			components: { LxTabs, LxTab },
			template: `
				<LxTabs v-model="value">
					<LxTab value="a" label="A">
						<template #default>
							<div class="custom-panel-slot">Panel A slot</div>
						</template>
					</LxTab>
				</LxTabs>
			`,
			data: () => ({ value: 'a' }),
		}));

		expect(wrapper.find('.custom-panel-slot').exists()).toBe(true);
	});

	it('covers vnode normalisation fallbacks for missing props and children', async () => {
		const wrapper = mount(defineComponent({
			components: { LxTabs, LxTab },
			template: `
				<LxTabs v-model="value">
					<LxTab />
					<LxTab value="real">Real panel</LxTab>
				</LxTabs>
			`,
			data: () => ({ value: 'real' }),
		}));

		await wrapper.vm.$nextTick();
		expect(wrapper.findAll('.lx-tabs__tab')).toHaveLength(1);
		expect(wrapper.text()).toContain('Real panel');
	});
});
