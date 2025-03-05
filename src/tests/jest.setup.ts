import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

chai.use(chaiAsPromised);

export const databasePath = path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'tests.db');

export const runCommand = async (args: string[] = []): Promise<string> => {
	try {
		return Promise.resolve(
			execSync(`tsx ${path.resolve('./src/fleet')} ${args.join(' ')}`, {
				env: {
					...process.env,
					DATABASE_ADAPTER: 'SQLITE',
					DATABASE_PATH: databasePath
				},
				stdio: 'pipe'
			}).toString()
		);
	} catch (error) {
		return Promise.reject(error?.toString());
	}
};

afterEach(() => {
	if (!fs.existsSync(databasePath)) return;
	fs.unlinkSync(databasePath);
});
