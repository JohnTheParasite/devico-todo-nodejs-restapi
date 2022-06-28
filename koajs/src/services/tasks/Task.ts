import mongoose from 'mongoose'

const taskSchema = new mongoose.Schema({
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

export const Task = mongoose.model('tasks', taskSchema)
