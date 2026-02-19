export type TFaRegistryItem = {
	aliases: Record<string, string[]>,
	changes: string[],
	free: string[],
	label: string,
	ligatures: string[],
	search: {
		terms: string[],
	},
	styles: string[],
	svg: Record<string, {
		height: number,
		// eslint-disable-next-line ts/naming-convention
		last_modified: number,
		path: string[],
		viewBox: number[],
		width: number,
		raw: string,
	}>,
	unicode: string,
	voted: boolean,
};

export type TFaRemappedItem = {
	icon: string,
	label: string,
	styles: string[],
	terms: string[],
};
