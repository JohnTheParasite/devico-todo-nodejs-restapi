import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
  login: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  roleId: {
    type: Number,
    required: true,
    min: 1,
    max: 3
  },
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now()
  }
})

userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

export const User = mongoose.model('users', userSchema)
