import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import LxButton from './LxButton.vue';

describe('LxButton', () => {
	it('uses the variant colour for invert hover text', () => {
		const wrapper = mount(LxButton, {
			props: {
				label: 'Save',
				variant: 'success',
				hoverMode: 'invert',
			},
		});
		const button = wrapper.get('.lx-button');
		const setupState = (wrapper.vm.$ as typeof wrapper.vm.$ & {
			setupState: {
				getTextColour: string,
				getInvertHoverTextColour: string,
			},
		}).setupState;

		expect(button.classes()).toContain('lx-button-hover--invert');
		expect(button.text()).toBe('Save');
		expect(setupState.getTextColour).toBe('var(--lx-colour-on-success)');
		expect(setupState.getInvertHoverTextColour).toBe('var(--lx-colour-success)');
	});
});
