import { expect } from 'chai';
import { runCommand } from './jest.setup.js';

const fleetId: string = '1';
const runCreate = (args: string[] = []): Promise<string> => runCommand(['create', ...args]);

describe('without fleet id argument', () => {
	it('should throw an error', async () => {
		await expect(runCreate()).to.be.rejectedWith('missing required argument');
	});
});

describe('with fleet id argument', () => {
	it('create fleet : should display a success message', async () => {
		expect(await runCreate([fleetId])).to.contain(`created the fleet #${fleetId}`);
	});

	it('create fleet twice : should throw an error', async () => {
		await runCreate([fleetId]);
		await expect(runCreate([fleetId])).to.be.rejectedWith('already exists');
	});
});
