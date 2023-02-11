<p align="center">
  <a href="https://www.nettlelabs.com">
    <img alt="Nettle logo" src="assets/logo.png" style="padding-top: 15px" height="64" />
  </a>
</p>

<h1 align="center">
  NFDomain On-chain Lookup
</h1>

<p align="center">
  <a href="https://github.com/Nettle-Labs/nfd-lookup/actions/workflows/lint_build_test.yml" target="_blank">
    <img src="https://github.com/Nettle-Labs/nfd-lookup/actions/workflows/lint_build_test.yml/badge.svg" alt="Build" />
  </a>
  <a href="https://img.shields.io/npm/v/@nettlelabs/nfd-lookup" target="_blank">
    <img src="https://img.shields.io/npm/v/@nettlelabs/nfd-lookup" alt="npm" />
  </a>
</p>

<p align="center">
  Allows the lookup of on-chain NFDomain metadata by address. Can be used by either the client or server to fetch the metadata for a given address.
</p>

### Table of contents

* [1. Installation](#-1-installation)
* [2. Usage](#-2-usage)
  * [2.1. Quick Start](#21-quick-start)
  * [2.2. API](#22-api)
* [3. Development](#-3-development)
  * [3.1. Requirements](#31-requirements)
  * [3.2. Setup](#32-setup)
  * [3.3. Build](#33-build)
* [4. Appendix](#-4-appendix)
  * [4.1. Useful Information](#41-useful-information)
* [5. How To Contribute](#-5-how-to-contribute)
* [6. License](#-6-license)
* [7. Credits](#-7-credits)

## 📦 1. Installation

* Using npm:
```shell
$ npm install @nettlelabs/nfd-lookup
```

* Using yarn:
```shell
$ yarn add @nettlelabs/nfd-lookup
```

## 🪄 2. Usage

### 2.1 Quick Start

```typescript
import { INfdMetadata, lookupNfDomainByAddress } from '@nettlelabs/nfd-lookup';
import { Algodv2 } from 'algosdk';

const algodClient: Algodv2 = new Algodv2(
  '',
  'https://testnet-api.algonode.cloud',
  ''
); // first initialize your algod client
const metadata: INfdMetadata | null = await lookupNfDomainByAddress(
  'QSTBDZMDPUHM6LESD54ZUT55KICOECJ4CPOMLAWNMSS3563ZK64HKJ65TM',
  {
    algodClient,
    registryAppId: BigInt('84366825'), // this application ID MUST be the right one for the network
  },
);

if (metadata) {
  console.info(metadata.name); // kieran.algo
}

```

<sup>[Back to top ^][table-of-contents]</sup>

### 2.2 API

### `lookupNfDomainByAddress(address, [options])`

> Lookup NFDomain metadata for an Algorand address (public key) on-chain.

#### Parameters

| Name    | Type     | Description                                  |
|---------|----------|----------------------------------------------|
| address | `string` | The Algorand address (public key) to lookup. |

#### Options

An additional object must be provided:

| Name           | Type                           | Default  | Description                                                                                                                                                                                            |
|----------------|--------------------------------|----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| algodClient    | [`Algodv2`][algodv2-reference] | -        | An initialized Algod client that will be used to query the chain.                                                                                                                                      |
| debug          | `ILogLevel`                    | `silent` | Whether logs will be printed to console. Can be one of `debug`, `error`,  `info`, `silent` or `warn`. Defaults to `silent`.                                                                            |
| registryAppId  | `bigint`                       | -        | the registry app ID for the NFDomain you want to lookup. NOTE: you must use the correct registry that matches the client network connection. See [Registry Application IDs][registry-application-ids]. |

#### Returns

| Type                                       | Description                                                                                                                                                                        |
|--------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `Promise<INfdMetadata>` or `Promise<null>` | An object containing the metadata for this address or null if no NFDomain exists for address or an error was encountered. See the available [properties][nfd-metadata-properties]. |

#### TypeScript Example

```ts
import { INfdMetadata, lookupNfDomainByAddress } from '@nettlelabs/nfd-lookup';
import { Algodv2 } from 'algosdk';

const algodClient: Algodv2 = new Algodv2(
  '',
  'https://testnet-api.algonode.cloud',
  ''
); // first initialize your algod client
const metadata: INfdMetadata | null = await lookupNfDomainByAddress(
  'QSTBDZMDPUHM6LESD54ZUT55KICOECJ4CPOMLAWNMSS3563ZK64HKJ65TM',
  {
    algodClient,
    registryAppId: BigInt('84366825'), // this application ID MUST be the right one for the network
  },
);

console.info(result);
/*
Prints:
{
  internal: {
    asaid: '91947211',
    category: 'premium',
    commission1: '\x00\x00\x00\x00\x00\x00\x002',
    commission1Agent: '7ZZWL6MDVXBOWQPEFEAQQ3LKV755ONNMCBKO2WB3GARF5F2IQVJ5KYGTZY',
    contractLocked: '0',
    highestSoldAmt: '269000000',
    name: 'kieran.algo',
    owner: 'QSTBDZMDPUHM6LESD54ZUT55KICOECJ4CPOMLAWNMSS3563ZK64HKJ65TM',
    saleType: 'buyItNow',
    seller: 'QSTBDZMDPUHM6LESD54ZUT55KICOECJ4CPOMLAWNMSS3563ZK64HKJ65TM',
    timeChanged: '1667805899',
    timeCreated: '1653460340',
    timePurchased: '1653460421',
    ver: '1.13g'
  },
  verified: {},
  userDefined: {}
}
*/
```

<sup>[Back to top ^][table-of-contents]</sup>

## 🛠 3. Development

### 3.1. Requirements

* Install [Yarn v1.22.5+][yarn]

<sup>[Back to top ^][table-of-contents]</sup>

### 3.2. Setup

1. Install the dependencies:
```bash
$ yarn install
```

<sup>[Back to top ^][table-of-contents]</sup>

### 3.3. Build

* To build simply run:
```bash
$ yarn build
```

This will compile the Typescript source code into a `dist/` directory.

<sup>[Back to top ^][table-of-contents]</sup>

## 📑 4. Appendix

### 4.1 Useful Information

* [Registry Application IDs][registry-application-ids] - the Algorand Application IDs for the NFD registry contract.
* [nfd-cli-examples] - an almost identical Go implementation (it was the template for this repo).

<sup>[Back to top ^][table-of-contents]</sup>

## 👏 5. How To Contribute

Please read the [**Contributing Guide**][contribute] to learn about the development process.

<sup>[Back to top ^][table-of-contents]</sup>

## 📄 6. License

Please refer to the [LICENSE][license] file.

<sup>[Back to top ^][table-of-contents]</sup>

## 🎉 7. Credits

* A massive shout-out to [TxnLab][txn-lab] and the amazing work they are doing for the Algorand ecosystem. ❤️

<sup>[Back to top ^][table-of-contents]</sup>

<!-- Links -->
[algodv2-reference]: https://algorand.github.io/js-algorand-sdk/classes/Algodv2.html
[contribute]: ./CONTRIBUTING.md
[license]: ./LICENSE
[nfd-cli-examples]: https://github.com/TxnLab/nfd-cli-examples
[nfd-metadata-properties]: https://api-docs.nf.domains/reference/on-chain-reference/properties
[registry-application-ids]: https://api-docs.nf.domains/reference/on-chain-reference/registry-application-ids
[table-of-contents]: #table-of-contents
[txn-lab]: https://www.txnlab.dev/
[yarn]: https://yarnpkg.com/
