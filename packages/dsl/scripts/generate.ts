import { copyFile, mkdir, readdir, rm, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const dslFileName = `dsl.ts`;
const typesFileName = `types.ts`;

const scriptPath = fileURLToPath(import.meta.url);
const packageRootPath = resolve(dirname(scriptPath), '..');
const repoRootPath = resolve(packageRootPath, '..', '..');

const dslPackagePath = resolve(packageRootPath, 'src');
const dslComponentPath = resolve(dslPackagePath, 'components');
const dslTypesPath = resolve(dslPackagePath, 'types');
const componentsPath = resolve(repoRootPath, 'packages/ui/src/components');
const typesPath = resolve(repoRootPath, 'packages/ui/src/types');
const components = await readdir(componentsPath, { withFileTypes: true });
const types = await readdir(typesPath, { withFileTypes: true });

const componentExports: string[] = [];
const dslExports: string[] = [];
const typeExports: string[] = [];

// Copy the components across to the DSL package.
for (const component of components) {
	// Define the path to the component and check if it's a directory.
	const componentPath = resolve(componentsPath, component.name);
	if (!component.isDirectory()) continue;

	// Check for a folder, if so, remove it and create a new one.
	const dslComponentFolderPath = resolve(dslComponentPath, component.name);
	if (existsSync(dslComponentFolderPath)) {
		await rm(dslComponentFolderPath, { recursive: true, force: true });
	}
	await mkdir(dslComponentFolderPath, { recursive: true });

	// Copy the DSL and types files from the component to the DSL package.
	await copyFile(resolve(componentPath, dslFileName), resolve(dslComponentFolderPath, dslFileName));
	await copyFile(resolve(componentPath, typesFileName), resolve(dslComponentFolderPath, typesFileName));

	componentExports.push(`export * from './components/${component.name}/${dslFileName.replace(/\.ts$/, '')}';`);
	componentExports.push(`export * from './components/${component.name}/${typesFileName.replace(/\.ts$/, '')}';`);
}

// Copy the types across to the DSL package, we only care about `*.ts` files.
for (const type of types) {
	if (!type.isFile() || !type.name.endsWith('.ts')) continue;
	await copyFile(resolve(typesPath, type.name), resolve(dslTypesPath, type.name));

	typeExports.push(`export * from './types/${type.name.replace(/\.ts$/, '')}';`);
}

const dslFiles = await readdir(resolve(dslPackagePath, 'dsl'), { withFileTypes: true });
for (const file of dslFiles) {
	if (!file.isFile() || !file.name.endsWith('.ts')) continue;
	dslExports.push(`export * from './dsl/${file.name.replace(/\.ts$/, '')}';`);
}

componentExports.sort();
dslExports.sort();
typeExports.sort();

await writeFile(
	resolve(dslPackagePath, 'components.ts'),
	[
		...componentExports,
		'',
	].join('\n'),
);

await writeFile(
	resolve(dslPackagePath, 'index.ts'),
	[
		`export * from './components';`,
		...dslExports,
		...typeExports,
		'',
	].join('\n'),
);
