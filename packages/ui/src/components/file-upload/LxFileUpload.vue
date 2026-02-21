<template>
	<div
		class="lx-file-upload"
		:class="{ 'is-dropzone': props.dropzone, 'is-dragging': dragging }"
		@dragover.prevent="onDragOver"
		@dragleave.prevent="dragging = false"
		@drop.prevent="onDrop"
	>
		<label class="lx-file-upload__input-wrap">
			<input
				class="lx-file-upload__input"
				type="file"
				:accept="props.accept"
				:multiple="props.multiple"
				:disabled="props.disabled"
				@change="onInputChange"
			>
			<span class="lx-file-upload__label">
				<slot>
					Choose file{{ props.multiple ? 's' : '' }}
				</slot>
			</span>
		</label>

		<ul v-if="files.length > 0" class="lx-file-upload__list">
			<li v-for="(file, index) in files" :key="`${file.name}-${index}`" class="lx-file-upload__item">
				<div>
					<p class="lx-file-upload__name">
						{{ file.name }}
					</p>
					<p class="lx-file-upload__meta">
						{{ formatFileSize(file.size) }}
					</p>
				</div>
				<LxButton
					variant="plain"
					size="xs"
					icon="xmark"
					aria-label="Remove file"
					:disabled="props.disabled"
					@click="removeFile(index)"
				/>
			</li>
		</ul>
		<template v-else />
	</div>
</template>

<script setup lang='ts'>
	import { ref } from 'vue';
	import { LxButton } from '../button';
	import type { ILxFileUploadProps } from './types';

	const props = withDefaults(defineProps<ILxFileUploadProps>(), {
		multiple: false,
		accept: '',
		disabled: false,
		maxFiles: 0,
		maxSize: 0,
		dropzone: true,
	});

	const emit = defineEmits<{
		(event: 'change', files: File[]): void,
		(event: 'error', message: string): void,
	}>();

	const model = defineModel<File[]>({
		default: () => [],
	});

	const dragging = ref(false);
	const files = ref<File[]>(model.value);

	const syncFiles = (nextFiles: File[]): void => {
		files.value = nextFiles;
		model.value = nextFiles;
		emit('change', nextFiles);
	};

	const validateFiles = (nextFiles: File[]): boolean => {
		if (props.maxFiles > 0 && nextFiles.length > props.maxFiles) {
			emit('error', `Maximum ${props.maxFiles} file(s) allowed.`);
			return false;
		}

		if (props.maxSize > 0 && nextFiles.some(file => file.size > props.maxSize)) {
			emit('error', `One or more files exceed the maximum size of ${formatFileSize(props.maxSize)}.`);
			return false;
		}

		return true;
	};

	const collectFiles = (fileList: FileList | null): void => {
		if (!fileList) {
			return;
		}

		const selected = Array.from(fileList);
		const nextFiles = props.multiple ? [...files.value, ...selected] : selected.slice(0, 1);
		if (validateFiles(nextFiles)) {
			syncFiles(nextFiles);
		}
	};

	const onInputChange = (event: Event): void => {
		const target = event.target as HTMLInputElement;
		collectFiles(target.files);
		target.value = '';
	};

	const onDragOver = (): void => {
		if (!props.disabled && props.dropzone) {
			dragging.value = true;
		}
	};

	const onDrop = (event: DragEvent): void => {
		dragging.value = false;
		if (props.disabled || !props.dropzone) {
			return;
		}

		collectFiles(event.dataTransfer?.files || null);
	};

	const removeFile = (index: number): void => {
		if (props.disabled) {
			return;
		}

		const nextFiles = files.value.filter((file, fileIndex) => {
			void file;
			return fileIndex !== index;
		});
		syncFiles(nextFiles);
	};

	const formatFileSize = (value: number): string => {
		if (value < 1024) {
			return `${value} B`;
		}
		if (value < 1024 * 1024) {
			return `${(value / 1024).toFixed(1)} KB`;
		}
		return `${(value / (1024 * 1024)).toFixed(1)} MB`;
	};
</script>

<style scoped lang='scss'>
	.lx-file-upload {
		background: var(--lx-colour-surface-raised);
		border: var(--lx-size-border-width-hairline) solid var(--lx-colour-surface-border);
		border-radius: var(--lx-size-radius-md);
		display: grid;
		gap: var(--lx-size-space-sm);
		padding: var(--lx-size-space-sm);
	}

	.lx-file-upload.is-dropzone {
		border-style: dashed;
	}

	.lx-file-upload.is-dragging {
		border-color: var(--lx-colour-primary);
		background: color-mix(in srgb, var(--lx-colour-primary) 10%, transparent);
	}

	.lx-file-upload__input-wrap {
		align-items: center;
		background: var(--lx-colour-surface-base);
		border: var(--lx-size-border-width-hairline) solid var(--lx-colour-surface-border);
		border-radius: var(--lx-size-radius-sm);
		cursor: pointer;
		display: inline-flex;
		gap: var(--lx-size-space-sm);
		padding: var(--lx-size-space-sm);
	}

	.lx-file-upload__input {
		display: none;
	}

	.lx-file-upload__label {
		color: var(--lx-colour-surface-text);
		font-size: var(--lx-font-size-sm);
	}

	.lx-file-upload__list {
		display: grid;
		gap: var(--lx-size-space-xs);
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.lx-file-upload__item {
		align-items: center;
		background: var(--lx-colour-surface-base);
		border-radius: var(--lx-size-radius-sm);
		display: flex;
		justify-content: space-between;
		padding: var(--lx-size-space-xs) var(--lx-size-space-sm);
	}

	.lx-file-upload__name {
		color: var(--lx-colour-surface-text);
		font-size: var(--lx-font-size-sm);
	}

	.lx-file-upload__meta {
		color: var(--lx-colour-surface-text-muted);
		font-size: var(--lx-font-size-xs);
	}
</style>
