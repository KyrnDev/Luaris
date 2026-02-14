import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import LxPage from '../LxPage.vue';

describe('LxPage', () => {
	it('renders configured slot regions', () => {
		const wrapper = mount(LxPage, {
			slots: {
				'header': '<div>Header</div>',
				'subheader': '<div>Subheader</div>',
				'navigation': '<div>Navigation</div>',
				'content-header': '<div>Content Header</div>',
				'content': '<div>Content</div>',
				'content-footer': '<div>Content Footer</div>',
				'aside': '<div>Aside</div>',
				'footer': '<div>Footer</div>',
			},
		});

		expect(wrapper.find('.lx-page__header').exists()).toBe(true);
		expect(wrapper.find('.lx-page__navigation').exists()).toBe(true);
		expect(wrapper.find('.lx-page__content-header').exists()).toBe(true);
		expect(wrapper.find('.lx-page__aside').exists()).toBe(true);
		expect(wrapper.find('.lx-page__footer').exists()).toBe(true);
	});

	it('does not render optional regions when slots are absent', () => {
		const wrapper = mount(LxPage);

		expect(wrapper.find('.lx-page__header').exists()).toBe(false);
		expect(wrapper.find('.lx-page__subheader').exists()).toBe(false);
		expect(wrapper.find('.lx-page__navigation').exists()).toBe(false);
		expect(wrapper.find('.lx-page__content-main').exists()).toBe(false);
		expect(wrapper.find('.lx-page__aside').exists()).toBe(false);
		expect(wrapper.find('.lx-page__footer').exists()).toBe(false);
	});
});
