import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import LxFileUpload from '../LxFileUpload.vue';

const createFile = (name: string, size = 1024): File => {
	const file = new File(['a'.repeat(Math.min(size, 4096))], name, { type: 'text/plain' });
	Object.defineProperty(file, 'size', {
		value: size,
		configurable: true,
	});
	return file;
};

describe('LxFileUpload', () => {
	it('accepts input selection and remove flow', async () => {
		const wrapper = mount(LxFileUpload, {
			props: {
				multiple: true,
			},
		});

		const input = wrapper.find('input[type="file"]');
		const fileA = createFile('a.txt', 1200);
		Object.defineProperty(input.element, 'files', {
			value: [fileA],
			configurable: true,
		});
		await input.trigger('change');

		expect(wrapper.emitted('change')?.[0]?.[0]).toHaveLength(1);
		expect(wrapper.text()).toContain('a.txt');
		await wrapper.find('.lx-button').trigger('click');
		expect(wrapper.emitted('change')?.at(-1)?.[0]).toHaveLength(0);

		Object.defineProperty(input.element, 'files', {
			value: null,
			configurable: true,
		});
		await input.trigger('change');
	});

	it('validates max files/max size and dropzone branches', async () => {
		const wrapper = mount(LxFileUpload, {
			props: {
				multiple: true,
				maxFiles: 1,
				maxSize: 1000,
				dropzone: true,
			},
		});

		const input = wrapper.find('input[type="file"]');
		Object.defineProperty(input.element, 'files', {
			value: [createFile('a.txt', 500), createFile('b.txt', 500)],
			configurable: true,
		});
		await input.trigger('change');
		expect(wrapper.emitted('error')?.[0]?.[0]).toContain('Maximum 1 file');

		await wrapper.trigger('dragover');
		await wrapper.trigger('dragleave');
		await wrapper.trigger('drop', {
			dataTransfer: {
				files: [createFile('large.txt', 5000)],
			},
		});
		expect((wrapper.emitted('error') || []).length).toBeGreaterThan(1);

		Object.defineProperty(input.element, 'files', {
			value: [createFile('locked.txt', 500)],
			configurable: true,
		});
		await input.trigger('change');
		await wrapper.setProps({ dropzone: false, disabled: true });
		await wrapper.find('.lx-button').trigger('click');
		await wrapper.trigger('dragover');
		await wrapper.trigger('drop', {
			dataTransfer: {
				files: [createFile('c.txt', 500)],
			},
		});
		await wrapper.trigger('drop');
		expect(wrapper.find('.lx-file-upload').classes()).not.toContain('is-dropzone');
		expect(wrapper.text()).toContain('locked.txt');

		const api = (wrapper.vm as {
			$: {
				setupState: {
					removeFile: (index: number) => void,
				},
			},
		}).$.setupState;
		api.removeFile(0);
		expect(wrapper.text()).toContain('locked.txt');
	});

	it('formats megabyte sized files', async () => {
		const wrapper = mount(LxFileUpload, {
			props: {
				multiple: false,
			},
		});

		const input = wrapper.find('input[type="file"]');
		Object.defineProperty(input.element, 'files', {
			value: [createFile('big.bin', 2 * 1024 * 1024)],
			configurable: true,
		});
		await input.trigger('change');
		expect(wrapper.text()).toContain('2.0 MB');
	});

	it('supports dragover and drop happy path', async () => {
		const wrapper = mount(LxFileUpload, {
			props: {
				dropzone: true,
			},
		});

		await wrapper.trigger('dragover');
		expect(wrapper.classes()).toContain('is-dragging');
		await wrapper.trigger('drop', {
			dataTransfer: {
				files: [createFile('dropped.txt', 900)],
			},
		});
		await wrapper.trigger('drop');
		expect(wrapper.emitted('change')?.length).toBeGreaterThan(0);
	});
});
