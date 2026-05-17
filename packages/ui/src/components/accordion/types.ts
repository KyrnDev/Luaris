import type { ComputedRef, InjectionKey, Ref } from 'vue';
import type {
	TBorderWidths,
	TColours,
	TRadiusSize,
	TSizes,
	TSurfaceColours,
} from '../../types/theme';

export type TLxAccordionVariant = TColours | TSurfaceColours;

export type TLxAccordionItemProps = {
	title?: string,
	icon?: string,
	content?: string,
	variant?: TLxAccordionVariant,
	size?: TSizes,
	contentPadding?: TSizes,
	contentBackgroundColour?: TSurfaceColours | 'transparent',
	borderRadius?: TRadiusSize,
	borderWidth?: TBorderWidths,
	disabled?: boolean,
	value?: string,
};

export type TLxAccordionProps = {
	multiple?: boolean,
	connected?: boolean,
	variant?: TLxAccordionVariant,
	size?: TSizes,
	gap?: TSizes,
	contentPadding?: TSizes,
	contentBackgroundColour?: TSurfaceColours | 'transparent',
	borderRadius?: TRadiusSize,
	borderWidth?: TBorderWidths,
};

export type TLxAccordionContext = {
	multiple: Ref<boolean>,
	defaultVariant: ComputedRef<TLxAccordionVariant>,
	defaultSize: ComputedRef<TSizes>,
	defaultContentPadding: ComputedRef<TSizes | undefined>,
	defaultContentBackgroundColour: ComputedRef<TSurfaceColours | 'transparent' | undefined>,
	defaultBorderRadius: ComputedRef<TRadiusSize>,
	defaultBorderWidth: ComputedRef<TBorderWidths>,
	registerItem: (id: string, setOpen: (value: boolean) => void) => void,
	unregisterItem: (id: string) => void,
	notifyOpen: (id: string) => void,
};

export const LX_ACCORDION_CONTEXT_KEY: InjectionKey<TLxAccordionContext> = Symbol('lx-accordion-context');
