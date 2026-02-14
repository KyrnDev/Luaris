import process from 'node:process';
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

type TFaLicence = 'free' | 'pro';
type TLxIconStyle = (
	'solid'
	| 'regular'
	| 'brands'
	| 'light'
	| 'duotone'
	| 'thin'
	| 'sharp-solid'
	| 'sharp-regular'
	| 'sharp-light'
	| 'sharp-thin'
	| 'sharp-duotone'
);

interface IFaFamilyStyleRef {
	family?: string;
	style?: string;
}

interface IFaMetadataEntry {
	styles?: string[];
	search?: {
		terms?: string[];
	};
	aliases?: {
		names?: string[];
		search?: {
			terms?: string[];
		};
	};
	free?: string[];
	pro?: string[];
	familyStylesByLicense?: {
		free?: IFaFamilyStyleRef[] | Record<string, string[]>;
		pro?: IFaFamilyStyleRef[] | Record<string, string[]>;
	};
}

interface IFaRegistryEntry {
	name: string;
	keywords: string[];
	styles: TLxIconStyle[];
	families: string[];
	licences: TFaLicence[];
	styleSources: Record<string, TFaLicence[]>;
}

const METADATA_URL = process.env.FA_METADATA_URL || 'https://raw.githubusercontent.com/FortAwesome/Font-Awesome/7.x/metadata/icons.json';
const PRO_METADATA_URL = process.env.FA_PRO_METADATA_URL || '';
const ROOT_DIR = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const OUTPUT_FILE = resolve(ROOT_DIR, 'src/data/fa-registry.json');
const SUPPORTED_STYLES: TLxIconStyle[] = [
	'solid',
	'regular',
	'brands',
	'light',
	'duotone',
	'thin',
	'sharp-solid',
	'sharp-regular',
	'sharp-light',
	'sharp-thin',
	'sharp-duotone',
];

const SUPPORTED_STYLE_SET = new Set<TLxIconStyle>(SUPPORTED_STYLES);

const uniqueStrings = (values: string[]): string[] => {
	return Array.from(new Set(values.filter(Boolean)));
};

const mapFamilyStyle = (family: string, style: string): TLxIconStyle | null => {
	const cleanedFamily = family.trim().toLowerCase();
	const cleanedStyle = style.trim().toLowerCase();

	if (SUPPORTED_STYLE_SET.has(cleanedStyle as TLxIconStyle)) {
		return cleanedStyle as TLxIconStyle;
	}

	if (cleanedFamily === 'sharp') {
		const sharpStyle = `sharp-${cleanedStyle}` as TLxIconStyle;
		return SUPPORTED_STYLE_SET.has(sharpStyle) ? sharpStyle : null;
	}

	if (cleanedFamily === 'brands' && cleanedStyle === 'brands') {
		return 'brands';
	}

	if (cleanedFamily === 'classic') {
		return SUPPORTED_STYLE_SET.has(cleanedStyle as TLxIconStyle) ? cleanedStyle as TLxIconStyle : null;
	}

	if (cleanedStyle === 'brands') {
		return 'brands';
	}

	return null;
};

const ensureRecord = <T>(value: unknown): value is Record<string, T> => {
	return typeof value === 'object' && value !== null;
};

const mergeMetadataEntry = (base: IFaMetadataEntry | undefined, incoming: IFaMetadataEntry): IFaMetadataEntry => {
	return {
		styles: uniqueStrings([...(base?.styles || []), ...(incoming.styles || [])]),
		search: {
			terms: uniqueStrings([...(base?.search?.terms || []), ...(incoming.search?.terms || [])]),
		},
		aliases: {
			names: uniqueStrings([...(base?.aliases?.names || []), ...(incoming.aliases?.names || [])]),
			search: {
				terms: uniqueStrings([...(base?.aliases?.search?.terms || []), ...(incoming.aliases?.search?.terms || [])]),
			},
		},
		free: uniqueStrings([...(base?.free || []), ...(incoming.free || [])]),
		pro: uniqueStrings([...(base?.pro || []), ...(incoming.pro || [])]),
		familyStylesByLicense: {
			free: [...(Array.isArray(base?.familyStylesByLicense?.free) ? base.familyStylesByLicense?.free : []), ...(Array.isArray(incoming.familyStylesByLicense?.free) ? incoming.familyStylesByLicense?.free : [])],
			pro: [...(Array.isArray(base?.familyStylesByLicense?.pro) ? base.familyStylesByLicense?.pro : []), ...(Array.isArray(incoming.familyStylesByLicense?.pro) ? incoming.familyStylesByLicense?.pro : [])],
		},
	};
};

const parseFamilyStyles = (value: IFaFamilyStyleRef[] | Record<string, string[]>, licence: TFaLicence): Array<{ style: TLxIconStyle; family: string; licence: TFaLicence }> => {
	if (Array.isArray(value)) {
		return value
			.map((item) => {
				if (!item.family || !item.style) {
					return null;
				}

				const mappedStyle = mapFamilyStyle(item.family, item.style);
				if (!mappedStyle) {
					return null;
				}

				return {
					style: mappedStyle,
					family: item.family.toLowerCase(),
					licence,
				};
			})
			.filter(Boolean) as Array<{ style: TLxIconStyle; family: string; licence: TFaLicence }>;
	}

	if (!ensureRecord<string[]>(value)) {
		return [];
	}

	return Object.entries(value).flatMap(([family, styles]) => {
		if (!Array.isArray(styles)) {
			return [];
		}

		return styles
			.map((style) => {
				const mappedStyle = mapFamilyStyle(family, style);
				if (!mappedStyle) {
					return null;
				}

				return {
					style: mappedStyle,
					family: family.toLowerCase(),
					licence,
				};
			})
			.filter(Boolean) as Array<{ style: TLxIconStyle; family: string; licence: TFaLicence }>;
	});
};

const buildRegistryEntry = (name: string, entry: IFaMetadataEntry): IFaRegistryEntry | null => {
	const styleSources = new Map<TLxIconStyle, Set<TFaLicence>>();
	const families = new Set<string>();
	const keywords = new Set<string>();

	keywords.add(name);
	for (const term of entry.search?.terms || []) {
		keywords.add(term.toLowerCase());
	}
	for (const alias of entry.aliases?.names || []) {
		keywords.add(alias.toLowerCase());
	}
	for (const term of entry.aliases?.search?.terms || []) {
		keywords.add(term.toLowerCase());
	}

	const addSource = (style: TLxIconStyle, licence: TFaLicence, family: string): void => {
		if (!styleSources.has(style)) {
			styleSources.set(style, new Set<TFaLicence>());
		}

		styleSources.get(style)?.add(licence);
		families.add(family);
	};

	const familyStyles = entry.familyStylesByLicense;
	if (familyStyles) {
		for (const detail of parseFamilyStyles(familyStyles.free || [], 'free')) {
			addSource(detail.style, detail.licence, detail.family);
		}
		for (const detail of parseFamilyStyles(familyStyles.pro || [], 'pro')) {
			addSource(detail.style, detail.licence, detail.family);
		}
	}

	for (const style of entry.free || []) {
		const mappedStyle = mapFamilyStyle(style === 'brands' ? 'brands' : 'classic', style);
		if (mappedStyle) {
			addSource(mappedStyle, 'free', mappedStyle === 'brands' ? 'brands' : 'classic');
		}
	}

	for (const style of entry.pro || []) {
		const mappedStyle = mapFamilyStyle(style === 'brands' ? 'brands' : 'classic', style);
		if (mappedStyle) {
			addSource(mappedStyle, 'pro', mappedStyle === 'brands' ? 'brands' : 'classic');
		}
	}

	for (const style of entry.styles || []) {
		const mappedStyle = mapFamilyStyle(style === 'brands' ? 'brands' : 'classic', style);
		if (mappedStyle && !styleSources.has(mappedStyle)) {
			addSource(mappedStyle, 'pro', mappedStyle === 'brands' ? 'brands' : 'classic');
		}
	}

	if (styleSources.size === 0) {
		return null;
	}

	const styles = Array.from(styleSources.keys()).sort();
	const styleSourceRecord = Object.fromEntries(
		styles.map(style => [
			style,
			Array.from(styleSources.get(style) || []).sort(),
		]),
	);
	const licences = Array.from(new Set(Object.values(styleSourceRecord).flat())).sort() as TFaLicence[];

	return {
		name,
		keywords: Array.from(keywords).sort(),
		styles,
		families: Array.from(families).sort(),
		licences,
		styleSources: styleSourceRecord,
	};
};

const fetchMetadata = async (url: string): Promise<Record<string, IFaMetadataEntry>> => {
	const response = await fetch(url);
	if (!response.ok) {
		throw new Error(`Failed to fetch metadata from ${url}. Status: ${response.status}`);
	}

	return response.json() as Promise<Record<string, IFaMetadataEntry>>;
};

const main = async (): Promise<void> => {
	const metadata = await fetchMetadata(METADATA_URL);

	if (PRO_METADATA_URL) {
		const proMetadata = await fetchMetadata(PRO_METADATA_URL);
		for (const [name, entry] of Object.entries(proMetadata)) {
			metadata[name] = mergeMetadataEntry(metadata[name], entry);
		}
	}

	const registry = Object.entries(metadata)
		.map(([name, entry]) => buildRegistryEntry(name, entry))
		.filter(Boolean)
		.sort((left, right) => {
			if (!left || !right) return 0;
			return left.name.localeCompare(right.name);
		});

	await mkdir(dirname(OUTPUT_FILE), { recursive: true });
	await writeFile(OUTPUT_FILE, `${JSON.stringify(registry, null, '\t')}\n`, 'utf8');

	console.info(`Generated ${registry.length} icon records at ${OUTPUT_FILE}`);
	if (!PRO_METADATA_URL) {
		console.info('No FA_PRO_METADATA_URL provided. Registry contains icons available from the public metadata source only.');
	}
};

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
