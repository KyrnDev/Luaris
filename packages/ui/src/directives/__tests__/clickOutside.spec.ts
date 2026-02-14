import { describe, expect, it, vi } from 'vitest';
import { vClickOutside } from '../clickOutside';

describe('vClickOutside', () => {
	it('calls handler only when click is outside element', () => {
		const element = document.createElement('div');
		const inside = document.createElement('button');
		element.appendChild(inside);
		document.body.appendChild(element);

		const handler = vi.fn();
		vClickOutside.mounted?.(element, { value: handler } as never, {} as never, {} as never);

		document.body.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
		expect(handler).toHaveBeenCalledTimes(1);

		inside.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
		expect(handler).toHaveBeenCalledTimes(1);

		// Guard branch: ignore events without targets.
		const elementWithHandler = element as HTMLElement & {
			_lxClickOutsideHandler?: (event: MouseEvent | TouchEvent) => void,
		};
		elementWithHandler._lxClickOutsideHandler?.({ target: null } as unknown as MouseEvent);
		expect(handler).toHaveBeenCalledTimes(1);

		vClickOutside.unmounted?.(element, {} as never, {} as never, {} as never);
		document.body.removeChild(element);
	});

	it('safely unmounts when no handler is registered', () => {
		const element = document.createElement('div');
		vClickOutside.unmounted?.(element, {} as never, {} as never, {} as never);
		expect(true).toBe(true);
	});
});
