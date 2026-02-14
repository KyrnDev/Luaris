import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import LxCard from '../LxCard.vue';

describe('LxCard', () => {
	it('renders title in header and slot body', () => {
		const wrapper = mount(LxCard, {
			props: {
				title: 'Card title',
			},
			slots: {
				default: '<p>Body content</p>',
			},
		});

		expect(wrapper.find('.lx-card__header').text()).toContain('Card title');
		expect(wrapper.find('.lx-card__body').text()).toContain('Body content');
	});

	it('applies interactive class', () => {
		const wrapper = mount(LxCard, {
			props: {
				interactive: true,
			},
		});

		expect(wrapper.classes()).toContain('lx-card--interactive');
	});

	it('renders header and footer slots when provided', () => {
		const wrapper = mount(LxCard, {
			slots: {
				header: '<div>Custom Header</div>',
				footer: '<div>Custom Footer</div>',
			},
		});

		expect(wrapper.find('.lx-card__header').text()).toContain('Custom Header');
		expect(wrapper.find('.lx-card__footer').text()).toContain('Custom Footer');
	});

	it('supports selected state and configurable padding', () => {
		const wrapper = mount(LxCard, {
			props: {
				selected: true,
				padding: '0',
			},
		});

		expect(wrapper.classes()).toContain('lx-card--selected');
		expect(wrapper.attributes('style')).toContain('--lx-card-padding: 0;');
	});
});
