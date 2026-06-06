import type { ILxAccordionComponent, ILxAccordionItemComponent } from '@luaris/dsl';
import { LxComponent } from '../base/component';

export class LxAccordionItem extends LxComponent<
	'LxAccordionItem',
	ILxAccordionItemComponent['props'],
	ILxAccordionItemComponent['attributes'],
	ILxAccordionItemComponent['slots']
> implements ILxAccordionItemComponent {
	public override readonly component = 'LxAccordionItem';

	public constructor(key: string) {
		super(key);

		this.slots = {
			default: [],
			summary: [],
			content: [],
		};

		this.props = {
			...this.props,
			title: '',
			icon: '',
			content: '',
			variant: 'raised',
			size: 'md',
			contentPadding: 'md',
			contentLineHeight: 'normal',
			contentBackgroundColour: 'transparent',
			borderRadius: 'md',
			borderWidth: 'thin',
		};
	}

	public addChild(child: ILxAccordionItemComponent['slots']['default'][number]) {
		this.slots.default.push(child);
		return this;
	}

	public removeChild(key: string) {
		this.slots.default = this.slots.default.filter(child => typeof child === 'string' || child.key !== key);
		return this;
	}
}

export class LxAccordion extends LxComponent<
	'LxAccordion',
	ILxAccordionComponent['props'],
	ILxAccordionComponent['attributes'],
	ILxAccordionComponent['slots']
> implements ILxAccordionComponent {
	public override readonly component = 'LxAccordion';

	public constructor(key: string) {
		super(key);

		this.slots = {
			default: [],
		};

		this.props = {
			...this.props,
			multiple: false,
			disconnected: false,
			variant: 'raised',
			size: 'md',
			gap: 'md',
			contentPadding: 'md',
			contentLineHeight: 'normal',
			contentBackgroundColour: 'transparent',
			borderRadius: 'md',
			borderWidth: 'thin',
		};
	}

	public addChild(child: ILxAccordionComponent['slots']['default'][number]) {
		this.slots.default.push(child);
		return this;
	}

	public removeChild(key: string) {
		this.slots.default = this.slots.default.filter(child => typeof child === 'string' || child.key !== key);
		return this;
	}
}

const text = new LxComponent('text');
text.component = 'p';
text.slots = {
	default: ['Hello from a paragraph'],
};

const item1 = new LxAccordionItem('item1').addChild(text);
const item2 = new LxAccordionItem('item2').addChild('Direct accordion body content');
const accordion = new LxAccordion('accordion1')
	.addChild(item1)
	.addChild(item2);

console.log(JSON.stringify(accordion, null, 2));
