import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import LxIcon from '../LxIcon.vue';

describe('LxIcon', () => {
	it('renders fa classes for icon style and name', () => {
		const wrapper = mount(LxIcon, {
			props: {
				name: 'house',
				iconStyle: 'solid',
				size: 'lg',
				spin: true,
			},
		});

		expect(wrapper.classes()).toContain('fa-solid');
		expect(wrapper.classes()).toContain('fa-house');
		expect(wrapper.classes()).toContain('fa-lg');
		expect(wrapper.classes()).toContain('fa-spin');
	});

	it('supports sharp and utility classes', () => {
		const wrapper = mount(LxIcon, {
			props: {
				name: 'sparkles',
				iconStyle: 'sharp-solid',
				pulse: true,
				fixedWidth: true,
			},
		});

		expect(wrapper.classes()).toContain('fa-sharp');
		expect(wrapper.classes()).toContain('fa-solid');
		expect(wrapper.classes()).toContain('fa-pulse');
		expect(wrapper.classes()).toContain('fa-fw');
	});

	it('maps all size classes', () => {
		const sizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const;

		for (const size of sizes) {
			const wrapper = mount(LxIcon, {
				props: {
					name: 'star',
					size,
					iconStyle: 'thin',
				},
			});

			expect(wrapper.classes()).toContain('fa-thin');
			if (size === 'md') {
				expect(wrapper.classes().some(cls => cls.startsWith('fa-') && cls.includes('md'))).toBe(false);
			} else {
				expect(wrapper.classes()).toContain(`fa-${size}`);
			}
		}
	});

	it('sets accessible label when icon is non-decorative', () => {
		const wrapper = mount(LxIcon, {
			props: {
				name: 'circle-info',
				decorative: false,
				label: 'Information',
			},
		});

		expect(wrapper.attributes('aria-hidden')).toBeUndefined();
		expect(wrapper.attributes('aria-label')).toBe('Information');
	});
});
