import type { ObjectDirective } from 'vue';

interface IClickOutsideElement extends HTMLElement {
	_lxClickOutsideHandler?: (event: MouseEvent | TouchEvent) => void,
}

export const vClickOutside: ObjectDirective<IClickOutsideElement, (event: MouseEvent | TouchEvent) => void> = {
	mounted(el, binding) {
		el._lxClickOutsideHandler = event => {
			const target = event.target as Node | null;
			if (!target) {
				return;
			}

			if (!el.contains(target)) {
				binding.value?.(event);
			}
		};

		document.addEventListener('mousedown', el._lxClickOutsideHandler);
		document.addEventListener('touchstart', el._lxClickOutsideHandler);
	},
	unmounted(el) {
		if (el._lxClickOutsideHandler) {
			document.removeEventListener('mousedown', el._lxClickOutsideHandler);
			document.removeEventListener('touchstart', el._lxClickOutsideHandler);
		}
	},
};
