import {InferSchemaType, Schema, model} from 'mongoose'

const coinSchema = new Schema({
    id: {type: String, required: true},
    symbol: {type: String},
    name: {type: String, required: true},
})

export type CoinType = InferSchemaType<typeof coinSchema>
export const CoinModel = model<CoinType>('Coin', coinSchema)