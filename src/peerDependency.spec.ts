import { expect } from 'chai';
import { satisfies } from 'semver';
import { readFileSync } from 'fs';
import { join } from 'path';

describe('peerDependencies', () => {
  let peerRange: string;

  before(() => {
    const pkg = JSON.parse(readFileSync(join(__dirname, '../package.json')).toString());
    peerRange = pkg.peerDependencies.brighterscript;
  });

  it('matches brighterscript v1 pre-release versions', () => {
    expect(satisfies('1.0.0-alpha.1', peerRange)).to.be.true;
    expect(satisfies('1.0.0-alpha.50', peerRange)).to.be.true;
    expect(satisfies('1.0.0-beta.1', peerRange)).to.be.true;
  });

  it('matches brighterscript v1 stable versions', () => {
    expect(satisfies('1.0.0', peerRange)).to.be.true;
    expect(satisfies('1.5.0', peerRange)).to.be.true;
  });

  it('does not match brighterscript v0.x versions', () => {
    expect(satisfies('0.65.0', peerRange)).to.be.false;
    expect(satisfies('0.67.8', peerRange)).to.be.false;
  });

  it('does not match brighterscript v2+ versions', () => {
    expect(satisfies('2.0.0', peerRange)).to.be.false;
  });
});
