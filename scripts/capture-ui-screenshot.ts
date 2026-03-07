import { mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import process from 'node:process';
import { spawn } from 'node:child_process';

interface ICaptureOptions {
	url: string;
	outputPath: string;
	startupTimeoutMs: number;
	loadTimeoutMs: number;
	readySelector: string;
	settleMs: number;
};

const DEFAULT_URL = 'http://127.0.0.1:5173';
const DEFAULT_OUTPUT = 'tmp/ui-screenshot.png';

const sleep = async (ms: number): Promise<void> => {
	await new Promise(resolvePromise => setTimeout(resolvePromise, ms));
};

const parseArgs = (): ICaptureOptions => {
	const args = new Map<string, string>();
	for (const entry of process.argv.slice(2)) {
		const [key, ...rest] = entry.split('=');
		if (!key?.startsWith('--')) {
			continue;
		}
		args.set(key.slice(2), rest.join('='));
	}

	return {
		url: args.get('url') || DEFAULT_URL,
		outputPath: resolve(process.cwd(), args.get('out') || DEFAULT_OUTPUT),
		startupTimeoutMs: Number(args.get('startup-timeout') || 45_000),
		loadTimeoutMs: Number(args.get('load-timeout') || 30_000),
		readySelector: args.get('ready-selector') || 'body',
		settleMs: Number(args.get('settle-ms') || 1200),
	};
};

const waitForServer = async (url: string, timeoutMs: number): Promise<void> => {
	const startedAt = Date.now();

	while ((Date.now() - startedAt) < timeoutMs) {
		try {
			const response = await fetch(url);
			if (response.ok) {
				return;
			}
		}
		catch {}

		await sleep(500);
	}

	throw new Error(`Timed out waiting for dev server at ${url}.`);
};

const stopProcess = async (child: ReturnType<typeof spawn>): Promise<void> => {
	if (child.killed || child.exitCode !== null) {
		return;
	}

	const shouldKillGroup = process.platform !== 'win32' && typeof child.pid === 'number';
	const sendSignal = (signal: NodeJS.Signals): void => {
		try {
			if (shouldKillGroup) {
				process.kill(-child.pid, signal);
				return;
			}
			child.kill(signal);
		}
		catch (error) {
			const systemError = error as NodeJS.ErrnoException;
			if (systemError.code === 'ESRCH') {
				return;
			}
			throw error;
		}
	};

	sendSignal('SIGTERM');
	for (let index = 0; index < 20; index += 1) {
		if (child.exitCode !== null) {
			return;
		}
		await sleep(100);
	}

	sendSignal('SIGKILL');
};

const main = async (): Promise<void> => {
	const options = parseArgs();
	const outputDirectory = dirname(options.outputPath);
	await mkdir(outputDirectory, { recursive: true });

	let playwright: typeof import('playwright');
	try {
		playwright = await import('playwright');
	}
	catch {
		throw new Error('Playwright is not installed. Install it first (e.g. `bun add -d playwright`).');
	}

	const child = spawn('bun', ['run', 'ui:dev'], {
		cwd: process.cwd(),
		detached: process.platform !== 'win32',
		stdio: ['ignore', 'pipe', 'pipe'],
		env: process.env,
	});

	child.stdout.on('data', chunk => process.stdout.write(`[ui:dev] ${String(chunk)}`));
	child.stderr.on('data', chunk => process.stderr.write(`[ui:dev] ${String(chunk)}`));

	try {
		console.log(`Starting dev server and waiting for ${options.url}...`);
		await waitForServer(options.url, options.startupTimeoutMs);
		console.log('Dev server is responding. Launching Playwright...');

		const browser = await playwright.chromium.launch();
		try {
			const page = await browser.newPage({
				viewport: {
					width: 1440,
					height: 1200,
				},
			});
			await page.goto(options.url, {
				waitUntil: 'networkidle',
				timeout: options.loadTimeoutMs,
			});

			await page.waitForSelector(options.readySelector, {
				state: 'visible',
				timeout: options.loadTimeoutMs,
			});
			await page.waitForLoadState('load', {
				timeout: options.loadTimeoutMs,
			});
			if (options.settleMs > 0) {
				await page.waitForTimeout(options.settleMs);
			}

			console.log(`Capturing screenshot to ${options.outputPath}...`);
			await page.screenshot({
				path: options.outputPath,
				fullPage: true,
			});
			console.log(`Saved screenshot to ${options.outputPath}`);
		}
		finally {
			await browser.close();
		}

		console.log('Stopping dev server...');
		await stopProcess(child);
	}
	catch (error) {
		await stopProcess(child);
		throw error;
	}
};

await main();
