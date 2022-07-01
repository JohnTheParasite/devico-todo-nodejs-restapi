import { Schema, model } from 'mongoose'

const taskSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  done: {
    type: Boolean,
    default: false
  },
  content: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now()
  },
  updatedAt: {
    type: Date,
    default: () => Date.now()
  },
})

taskSchema.pre('save', function(next) {
  this.updatedAt = Date.now()
  next()
})

export const Task = model('tasks', taskSchema)
