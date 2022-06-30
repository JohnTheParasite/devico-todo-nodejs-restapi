import { Schema, model } from 'mongoose'

const tokenSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  refreshToken: {
    type: String,
    required: true
  }
})

export const Token = model('tokens', tokenSchema)
