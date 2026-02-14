import { defineComponent } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import usePage from '../usePage';

const Harness = defineComponent({
	setup() {
		return usePage();
	},
	template: `
		<div>
			<p data-root-areas>{{ getRootTemplateAreas }}</p>
			<p data-root-columns>{{ getRootColumns }}</p>
			<p data-root-rows>{{ getRootRows }}</p>
			<p data-content-areas>{{ getContentTemplateAreas }}</p>
			<p data-content-rows>{{ getContentRows }}</p>
		</div>
	`,
});

describe('usePage', () => {
	it('builds template areas when all slots are present', () => {
		const wrapper = mount(Harness, {
			slots: {
				'header': '<div>Header</div>',
				'subheader': '<div>Subheader</div>',
				'navigation': '<div>Nav</div>',
				'content': '<div>Content</div>',
				'content-header': '<div>Content Header</div>',
				'content-footer': '<div>Content Footer</div>',
				'aside': '<div>Aside</div>',
				'footer': '<div>Footer</div>',
			},
		});

		expect(wrapper.find('[data-root-areas]').text()).toContain('navigation content aside');
		expect(wrapper.find('[data-root-columns]').text()).toContain('var(--lx-size-layout-sidebar-width) 1fr var(--lx-size-layout-sidebar-width)');
		expect(wrapper.find('[data-content-areas]').text()).toContain('"content-header" "content" "content-footer"');
	});

	it('handles minimal content-only layout', () => {
		const wrapper = mount(Harness, {
			slots: {
				default: '<div>Only content</div>',
			},
		});

		expect(wrapper.find('[data-root-areas]').text()).toContain('"content"');
		expect(wrapper.find('[data-root-columns]').text()).toBe('1fr');
		expect(wrapper.find('[data-root-rows]').text()).toContain('minmax(0, 1fr)');
	});

	it('handles header/footer without main areas', () => {
		const wrapper = mount(Harness, {
			slots: {
				header: '<div>Header</div>',
				footer: '<div>Footer</div>',
			},
		});

		expect(wrapper.find('[data-root-areas]').text()).toContain('\"header\"');
		expect(wrapper.find('[data-root-areas]').text()).toContain('\"footer\"');
		expect(wrapper.find('[data-root-columns]').text()).toBe('');
	});
});
