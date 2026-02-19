import type { TFaRegistryItem, TFaRemappedItem } from './types';
import { file } from 'bun';
import { resolve } from 'node:path';
import process from 'node:process';

const inputPath = resolve(process.cwd(), '../../../node_modules/@awesome.me/kit-74330f543d/icons/metadata/icons.json');
const outputPath = resolve(process.cwd(), '../../../../ui/src/data/fa-registry.json');

export default async function BuildFaRegistry() {
	// Check if file exists, if so, delete it.
	const outputFileExists = await file(outputPath).exists();
	if (outputFileExists) {
		await file(outputPath).delete();
	}

	// Define a place to hold the remapped data.
	const remapped: TFaRemappedItem[] = [];

	// Get the metadata.
	const metadataHandle = file(inputPath);
	if (!metadataHandle.exists()) throw new Error(`Font Awesome metadata file not found at path: ${inputPath}, make sure you have done \`bun install\` first.`);
	const metadata = await metadataHandle.json() as TFaRegistryItem[];

	// Process the remapped metadata.
	Object.entries(metadata).forEach(([iconName, icon]) => {
		// Define search terms.
		const searchTerms: string[] = [];
		searchTerms.push(iconName);
		if (iconName.includes('-')) searchTerms.push(iconName.replaceAll('-', ' '));

		if (Array.isArray(icon.aliases?.names)) {
			icon.aliases.names.forEach(name => {
				searchTerms.push(name);
				if (name.includes('-')) searchTerms.push(name.replaceAll('-', ' '));
			});
		}

		if (Array.isArray(icon.search?.terms)) {
			icon.search.terms.forEach(term => {
				searchTerms.push(term);
				if (term.includes('-')) searchTerms.push(term.replaceAll('-', ' '));
			});
		}

		remapped.push({
			icon: iconName,
			label: icon.label ?? '',
			styles: (icon.styles ?? []).map(style => style = style === 'custom' ? 'kit' : style),
			terms: searchTerms,
		});
	});

	// Validate output data.
	remapped.forEach(item => {
		if (item.icon.trim() === '') {
			throw new Error(`An icon is missing its "icon" property.`);
		}

		if (item.label.trim() === '') {
			throw new Error(`Icon "${item.icon}" is missing its "label" property.`);
		}

		if (item.styles.length === 0) {
			throw new Error(`Icon "${item.icon}" does not have any styles associated with it.`);
		}
	});

	// Write the output file.
	const outputHandle = file(outputPath);
	await outputHandle.write(JSON.stringify(remapped));
}

await BuildFaRegistry();
