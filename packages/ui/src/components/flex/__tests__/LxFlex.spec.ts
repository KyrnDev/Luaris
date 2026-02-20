import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import LxFlex from '../LxFlex.vue';

describe('LxFlex', () => {
	it('renders with default flex settings', () => {
		const wrapper = mount(LxFlex, {
			slots: {
				default: '<span>Item</span>',
			},
		});

		expect(wrapper.classes()).toContain('lx-flex');
		expect(wrapper.attributes('style')).toContain('flex-direction: row;');
		expect(wrapper.attributes('style')).toContain('flex-wrap: nowrap;');
		expect(wrapper.attributes('style')).toContain('row-gap: var(--lx-size-space-md);');
		expect(wrapper.attributes('style')).toContain('column-gap: var(--lx-size-space-md);');
	});

	it('supports boolean layout controls and spacing props', () => {
		const wrapper = mount(LxFlex, {
			props: {
				wrap: true,
				inline: true,
				column: true,
				reverse: true,
				gap: '0.5rem',
				rowGap: '1rem',
				columnGap: '2rem',
				align: 'center',
				justify: 'between',
				fullWidth: true,
			},
		});

		expect(wrapper.classes()).toContain('lx-flex--inline');
		expect(wrapper.classes()).toContain('lx-flex--full-width');
		expect(wrapper.attributes('style')).toContain('flex-direction: column-reverse;');
		expect(wrapper.attributes('style')).toContain('flex-wrap: wrap;');
		expect(wrapper.attributes('style')).toContain('align-items: center;');
		expect(wrapper.attributes('style')).toContain('justify-content: space-between;');
		expect(wrapper.attributes('style')).toContain('row-gap: 1rem;');
		expect(wrapper.attributes('style')).toContain('column-gap: 2rem;');
	});

	it('respects explicit direction and custom element tag', () => {
		const wrapper = mount(LxFlex, {
			props: {
				as: 'section',
				direction: 'row-reverse',
				column: true,
				reverse: false,
			},
		});

		expect(wrapper.element.tagName).toBe('SECTION');
		expect(wrapper.attributes('style')).toContain('flex-direction: row-reverse;');
	});

	it('supports column direction without reverse when no explicit direction is provided', () => {
		const wrapper = mount(LxFlex, {
			props: {
				column: true,
				reverse: false,
			},
		});

		expect(wrapper.attributes('style')).toContain('flex-direction: column;');
	});

	it('supports reversed row direction and gap fallback when gap is empty', () => {
		const wrapper = mount(LxFlex, {
			props: {
				reverse: true,
				gap: '',
			},
		});

		expect(wrapper.attributes('style')).toContain('flex-direction: row-reverse;');
		expect(wrapper.attributes('style')).toContain('row-gap: 0px;');
		expect(wrapper.attributes('style')).toContain('column-gap: 0px;');
	});
});
