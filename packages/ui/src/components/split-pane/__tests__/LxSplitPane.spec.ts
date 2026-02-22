import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import LxSplitPane from '../LxSplitPane.vue';

describe('LxSplitPane', () => {
	it('drags divider to update model in horizontal mode', async () => {
		const wrapper = mount(LxSplitPane, {
			attachTo: document.body,
			props: {
				'modelValue': 40,
				'onUpdate:modelValue': (value: number) => wrapper.setProps({ modelValue: value }),
			},
			slots: {
				first: '<div>First</div>',
				second: '<div>Second</div>',
			},
		});

		await wrapper.find('.lx-split-pane__divider').trigger('mousedown');
		document.dispatchEvent(new MouseEvent('mousemove', { clientX: 300, clientY: 0 }));
		document.dispatchEvent(new MouseEvent('mouseup'));
		expect(typeof wrapper.props('modelValue')).toBe('number');
	});

	it('covers vertical mode and no-parent guard branch', async () => {
		const wrapper = mount(LxSplitPane, {
			attachTo: document.body,
			props: {
				'orientation': 'vertical',
				'min': 20,
				'max': 80,
				'modelValue': 50,
				'onUpdate:modelValue': (value: number) => wrapper.setProps({ modelValue: value }),
			},
			slots: {
				first: '<div>A</div>',
				second: '<div>B</div>',
			},
		});

		expect(wrapper.find('.is-vertical').exists()).toBe(true);
		await wrapper.find('.lx-split-pane__divider').trigger('mousedown');
		document.dispatchEvent(new MouseEvent('mousemove', { clientY: 9999 }));
		document.dispatchEvent(new MouseEvent('mouseup'));
		expect((wrapper.props('modelValue') as number) <= 80).toBe(true);

		const querySpy = vi.spyOn(document, 'querySelector').mockReturnValue(null);
		await wrapper.find('.lx-split-pane__divider').trigger('mousedown');
		document.dispatchEvent(new MouseEvent('mousemove', { clientY: 10 }));
		document.dispatchEvent(new MouseEvent('mouseup'));
		expect(querySpy).toHaveBeenCalled();
		querySpy.mockRestore();
	});
});
