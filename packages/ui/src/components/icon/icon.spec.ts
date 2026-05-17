import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import LxIcon from './LxIcon.vue';

describe('LxIcon', () => {
	it('applies the default style prefix to a bare icon name', () => {
		const wrapper = mount(LxIcon, {
			props: {
				name: 'car',
			},
		});

		expect(wrapper.get('i').classes()).toEqual(expect.arrayContaining(['fa-solid', 'fa-car']));
	});

	it('applies the default style prefix to a prefixed icon name without an explicit style', () => {
		const wrapper = mount(LxIcon, {
			props: {
				name: 'fa-car',
			},
		});

		expect(wrapper.get('i').classes()).toEqual(expect.arrayContaining(['fa-solid', 'fa-car']));
	});

	it('preserves explicit full class names without adding another style prefix', () => {
		const wrapper = mount(LxIcon, {
			props: {
				name: 'fa-regular fa-car',
			},
		});

		const classes = wrapper.get('i').classes();
		expect(classes).toContain('fa-regular');
		expect(classes).toContain('fa-car');
		expect(classes).not.toContain('fa-solid');
	});

	it('supports other explicit styles such as duotone', () => {
		const wrapper = mount(LxIcon, {
			props: {
				name: 'fa-duotone fa-car',
			},
		});

		const classes = wrapper.get('i').classes();
		expect(classes).toContain('fa-duotone');
		expect(classes).toContain('fa-car');
		expect(classes).not.toContain('fa-solid');
	});

	it('deduplicates explicit utility classes when matching props are also enabled', () => {
		const wrapper = mount(LxIcon, {
			props: {
				name: 'fa-regular fa-car fa-spin',
				spin: true,
			},
		});

		const spinClasses = wrapper.get('i').classes().filter(className => className === 'fa-spin');
		expect(spinClasses).toHaveLength(1);
	});
});
