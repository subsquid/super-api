import * as ss58 from '@subsquid/ss58'
import { EventHandlerContext, ExtrinsicHandlerContext, toHex } from '@subsquid/substrate-processor'
import config from '../config'
import { PayeeType } from '../model'
import { PayeeTypeRaw } from '../types/custom/stakingData'
import { StorageContext } from '../types/generated/support'
import { EXTRINSIC_SUCCESS } from './consts'

export function encodeId(id: Uint8Array) {
    try {
        return ss58.codec(config.prefix).encode(id)
    } catch (e) {
        const hex = toHex(id)
        console.warn(`Warning: Failed to encode ${hex} with prefix ${config.prefix}`)

        return hex
    }
}

export function decodeId(id: string) {
    return ss58.codec(config.prefix).decode(id)
}

export interface ItemBase {
    id: string
    timestamp: Date | null | undefined
    blockNumber: bigint | null | undefined
    extrinsicHash: string | null | undefined
}

export function isExtrinsicSuccess(ctx: ExtrinsicHandlerContext) {
    return ctx.event.name === EXTRINSIC_SUCCESS
}

export function createPrevStorageContext(ctx: StorageContext & { block: { parentHash: string } }) {
    return {
        _chain: ctx._chain,
        block: {
            ...ctx.block,
            hash: ctx.block.parentHash,
        },
    }
}

export function convertPayee(
    payeeTypeRaw: PayeeTypeRaw,
    accounts: {
        stash: string
        controller: string
        payeeAccount: string | null | undefined
    }
) {
    switch (payeeTypeRaw) {
        case 'Account':
            return {
                payeeType: PayeeType.Account,
                payee: accounts.payeeAccount || undefined,
            }
        case 'Stash':
            return {
                payeeType: PayeeType.Stash,
                payee: accounts.stash,
            }
        case 'Staked':
            return {
                payeeType: PayeeType.Staked,
                payee: accounts.stash,
            }
        case 'Controller':
            return {
                payeeType: PayeeType.Controller,
                payee: accounts.stash,
            }
        case 'None': {
            return {
                payeeType: PayeeType.Controller,
                payee: undefined,
            }
        }
    }
}

export function getMeta(ctx: EventHandlerContext) {
    return {
        extrinsicHash: ctx.extrinsic?.hash,
        blockNumber: BigInt(ctx.block.height).valueOf(),
        timestamp: new Date(ctx.block.timestamp),
    }
}
