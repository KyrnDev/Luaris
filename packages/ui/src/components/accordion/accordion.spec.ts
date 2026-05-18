import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { defineComponent } from 'vue';
import LxAccordion from './LxAccordion.vue';
import LxAccordionItem from './LxAccordionItem.vue';

const TestAccordion = defineComponent({
	components: {
		LxAccordion,
		LxAccordionItem,
	},
	props: {
		multiple: {
			type: Boolean,
			default: false,
		},
	},
	template: `
		<LxAccordion :multiple="multiple" variant="primary" size="lg">
			<LxAccordionItem title="First" value="first">One</LxAccordionItem>
			<LxAccordionItem title="Second" value="second">Two</LxAccordionItem>
		</LxAccordion>
	`,
});

describe('LxAccordion', () => {
	it('renders as a connected group by default', () => {
		const wrapper = mount(TestAccordion);
		expect(wrapper.get('.lx-accordion').classes()).toContain('lx-accordion--connected');
	});

	it('inherits default variant and size from the parent accordion', () => {
		const wrapper = mount(TestAccordion);
		const firstItem = wrapper.findComponent(LxAccordionItem);
		const setupState = (firstItem.vm.$ as typeof firstItem.vm.$ & {
			setupState: {
				resolvedVariant: string,
				resolvedSize: string,
			},
		}).setupState;

		expect(setupState.resolvedVariant).toBe('primary');
		expect(setupState.resolvedSize).toBe('lg');
	});

	it('keeps only one item open when multiple is disabled', async () => {
		const wrapper = mount(TestAccordion);
		const details = wrapper.findAll('details');
		const groupName = details[0].attributes('name');

		expect(groupName).toBeTruthy();
		expect(details[1].attributes('name')).toBe(groupName);

		(details[0].element as HTMLDetailsElement).open = true;
		await details[0].trigger('toggle');
		expect(wrapper.findAllComponents(LxAccordionItem)[0].emitted('update:open')).toEqual([[true]]);
	});

	it('does not assign a shared details name when multiple is enabled', () => {
		const wrapper = mount(TestAccordion, {
			props: {
				multiple: true,
			},
		});
		const details = wrapper.findAll('details');

		expect(details[0].attributes('name')).toBeUndefined();
		expect(details[1].attributes('name')).toBeUndefined();
	});
});
