import { ProcessorConfig } from './processorConfig'

const config: ProcessorConfig = {
    chainName: 'kusama',
    prefix: 'kusama',
    dataSource: {
        archive: 'https://kusama.archive.subsquid.io/graphql',
        chain: 'wss://kusama-rpc.polkadot.io',
    },
    typesBundle: 'kusama',
    batchSize: 200,
    blockRange: {
        from: 100000,
    },
}

export default config
