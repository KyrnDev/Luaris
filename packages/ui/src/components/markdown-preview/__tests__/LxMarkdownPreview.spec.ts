import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import LxMarkdownPreview from '../LxMarkdownPreview.vue';

describe('LxMarkdownPreview', () => {
	it('renders headings, emphasis, links and table', () => {
		const wrapper = mount(LxMarkdownPreview, {
			props: {
				source: '# Title\n\n| A | B |\n| - | - |\n| x | y |\n\n**bold** *italic* [link](https://example.com)',
			},
		});

		expect(wrapper.find('h1').text()).toBe('Title');
		expect(wrapper.find('table').exists()).toBe(true);
		expect(wrapper.findAll('th')).toHaveLength(2);
		expect(wrapper.find('strong').text()).toBe('bold');
		expect(wrapper.find('em').text()).toBe('italic');
		expect(wrapper.find('a').attributes('href')).toBe('https://example.com');
	});

	it('escapes html', () => {
		const wrapper = mount(LxMarkdownPreview, {
			props: {
				source: '<script>alert(1)</script>',
			},
		});

		expect(wrapper.html()).not.toContain('<script>');
		expect(wrapper.text()).toContain('<script>alert(1)</script>');
	});

	it('renders lists, code and heading variants', () => {
		const wrapper = mount(LxMarkdownPreview, {
			props: {
				source: '## H2\n\n### H3\n\n- one\n- two\n\n`inline`\nline',
			},
		});
		expect(wrapper.find('h2').text()).toBe('H2');
		expect(wrapper.find('h3').text()).toBe('H3');
		expect(wrapper.findAll('ul li')).toHaveLength(2);
		expect(wrapper.find('code').text()).toBe('inline');
		expect(wrapper.html()).toContain('<br>');
	});

	it('does not treat invalid one-column separator as a table', () => {
		const wrapper = mount(LxMarkdownPreview, {
			props: {
				source: '| Only |\n| --- |',
			},
		});
		expect(wrapper.find('table').exists()).toBe(false);
		expect(wrapper.find('p').exists()).toBe(true);
	});

	it('does not treat invalid separator under a valid header row as a table', () => {
		const wrapper = mount(LxMarkdownPreview, {
			props: {
				source: '| A | B |\n| --- |',
			},
		});
		expect(wrapper.find('table').exists()).toBe(false);
		expect(wrapper.text()).toContain('| A | B |');
	});
});
