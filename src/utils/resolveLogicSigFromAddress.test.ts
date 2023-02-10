import { LogicSig } from 'algosdk';

// Types
import { ILogger } from '../types';

// Utils
import createLogger from './createLogger';
import resolveLogicSigFromAddress from './resolveLogicSigFromAddress';

describe('utils#resolveLogicSigFromAddress()', () => {
  const address: string =
    'QSTBDZMDPUHM6LESD54ZUT55KICOECJ4CPOMLAWNMSS3563ZK64HKJ65TM';
  const logger: ILogger = createLogger('silent');
  const registryAppId: bigint = BigInt('84366825'); // TestNet {@link https://api-docs.nf.domains/reference/on-chain-reference/registry-application-ids}

  it('should resolve the smart-signature account for an address', async () => {
    // Arrange
    // Act
    const logSig: LogicSig = await resolveLogicSigFromAddress(
      address,
      registryAppId,
      { logger }
    );

    // Assert
    expect(logSig.address()).toMatchSnapshot();
  });
});
