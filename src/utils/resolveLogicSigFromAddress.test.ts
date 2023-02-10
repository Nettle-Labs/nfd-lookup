import { LogicSig } from 'algosdk';

// Utils
import resolveLogicSigFromAddress from './resolveLogicSigFromAddress';

describe('utils#resolveLogicSigFromAddress()', () => {
  it('should resolve the smart-signature account for an address', async () => {
    // Arrange
    // Act
    const logSig: LogicSig = await resolveLogicSigFromAddress({
      address: 'QSTBDZMDPUHM6LESD54ZUT55KICOECJ4CPOMLAWNMSS3563ZK64HKJ65TM',
      registryAppId: BigInt('760937186'), // TestNet {@link https://api-docs.nf.domains/reference/on-chain-reference/registry-application-ids}
    });

    // Assert
    expect(logSig.address()).toMatchSnapshot();
  });
});
