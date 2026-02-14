export type TLayoutsNode = (
	keyof HTMLElementTagNameMap
	| keyof SVGElementTagNameMap
	| keyof MathMLElementTagNameMap
);

export type TLayoutsCalc = `calc(${string})`;
export type TLayoutsVar = `var(--${string})`;
export type TLayoutsZero = 0 | '0';
export type TLayoutsGlobal = 'inherit' | 'initial' | 'revert' | 'revert-layer' | 'unset';
export type TLayoutsBase = TLayoutsCalc | TLayoutsVar | TLayoutsGlobal;
export type TLayoutsNumeric = TLayoutsBase | TLayoutsZero;

export type TLayoutsUnits = (
	'cap' | 'ch' | 'em' | 'ex' | 'ic' | 'lh'
	| 'rcap' | 'rch' | 'rem' | 'rex' | 'ric' | 'rlh'
	| 'vh' | 'vw' | 'vmax' | 'vmin' | 'vb' | 'vi'
	| 'cqw' | 'cqh' | 'cqi' | 'cqb' | 'cqmin' | 'cqmax'
	| 'px' | 'cm' | 'mm' | 'Q' | 'in' | 'pc' | 'pt'
);

export type TLayoutsColour = TLayoutsVar | TLayoutsGlobal | string;
export type TLayoutsLength = TLayoutsNumeric | `${number}${TLayoutsUnits}`;
export type TLayoutsLengthPercentage = TLayoutsNumeric | `${number}${TLayoutsUnits}` | `${number}%`;
export type TLayoutsNumber = TLayoutsNumeric | number | `${number}`;
export type TLayoutsPercentage = TLayoutsNumeric | `${number}%`;
