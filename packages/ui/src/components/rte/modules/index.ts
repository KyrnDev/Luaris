import boldModule from './bold';
import italicModule from './italic';
import underlineModule from './underline';
import strikeModule from './strike';
import blockModule from './block';
import listModule from './list';
import linkModule from './link';
import clearModule from './clear';
import undoModule from './undo';
import redoModule from './redo';
import type { ILxRteModule } from '../types';

export const lxRteBuiltInModules: ILxRteModule[] = [
	boldModule,
	italicModule,
	underlineModule,
	strikeModule,
	blockModule,
	listModule,
	linkModule,
	clearModule,
	undoModule,
	redoModule,
];

export const lxRteDefaultToolbarModules: string[] = [
	'bold',
	'italic',
	'underline',
	'strike',
	'block',
	'list',
	'link',
	'clear',
	'undo',
	'redo',
];

export {
	blockModule,
	boldModule,
	clearModule,
	italicModule,
	linkModule,
	listModule,
	redoModule,
	strikeModule,
	underlineModule,
	undoModule,
};
