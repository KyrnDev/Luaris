import type { HTMLAttributes } from 'vue';
import type { ILxComponentBase } from '@luaris/dsl';

export class LxComponent<
	TComponent extends string = string,
	TProps = Partial<HTMLElement>,
	TAttributes = HTMLAttributes,
	TSlots = Record<string, ILxComponentBase[]>,
> {
	public component!: TComponent;
	public key: string;
	public props: TProps = {} as TProps;
	public attributes: TAttributes = {} as TAttributes;
	public slots: TSlots = {} as TSlots;

	public constructor(key: string) {
		this.key = key;
	}

	public toJSON() {
		return JSON.parse(JSON.stringify({
			key: this.key,
			component: this.component,
			props: this.props,
			attributes: this.attributes,
			slots: this.slots,
		}));
	}
}
