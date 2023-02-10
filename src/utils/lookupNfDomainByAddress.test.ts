import { Algodv2 } from 'algosdk';

// Utils
import lookupNfDomainByAddress from './lookupNfDomainByAddress';
import { INfdMetadata } from '../types';

describe('utils#lookupNfDomainByAddress()', () => {
  const address: string =
    'QSTBDZMDPUHM6LESD54ZUT55KICOECJ4CPOMLAWNMSS3563ZK64HKJ65TM';
  const registryAppId: bigint = BigInt('84366825'); // TestNet {@link https://api-docs.nf.domains/reference/on-chain-reference/registry-application-ids}
  let algodClient: Algodv2;

  beforeAll(() => {
    algodClient = new Algodv2('', 'https://testnet-api.algonode.cloud', '');
  });

  it('should return null if the registry app id is not valid', async () => {
    // Arrange
    // Act
    const metadata: INfdMetadata | null = await lookupNfDomainByAddress(
      address,
      {
        algodClient,
        registryAppId: BigInt('123456789'),
      }
    );

    // Assert
    expect(metadata).toBeNull();
  });

  it('should return null if the address has no nfdomain associated with it', async () => {
    // Arrange
    // Act
    const metadata: INfdMetadata | null = await lookupNfDomainByAddress(
      'W62XMS3KZII4QAJKYQAHSO6P6ZR5P74YWP2KOROS7B4YXB4EGC3OHQ6H7Q',
      {
        algodClient,
        registryAppId,
      }
    );

    // Assert
    expect(metadata).toBeNull();
  });

  it('should get nfd metadata for address', async () => {
    // Arrange
    // Act
    const metadata: INfdMetadata | null = await lookupNfDomainByAddress(
      address,
      {
        algodClient,
        registryAppId,
      }
    );

    if (!metadata) {
      throw new Error('expected metadata to be defined');
    }

    // Assert
    expect(metadata.internal.name).toBe('kieran.algo');
  });
});
