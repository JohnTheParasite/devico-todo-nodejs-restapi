import { Task } from "../Task.js";

export async function findAll() {
  const result = await Task.find()
  return result.map((el) => {
    return {
      id: el._id.toString(),
      done: el.done,
      content: el.content,
      createdAt: el.createdAt,
      updatedAt: el.updatedAt
    }
  })
}

export async function findById(id) {
  const task = await Task.findById(id)
  if (task) {
    return {
      id: task._id.toString(),
      done: task.done,
      content: task.content,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt
    }
  }
  return task
}

export async function create(content) {
  await Task.create({
    content
  })
  return findAll()
}

export async function update(id, task) {
  await Task.updateOne({ _id: id }, { ...task })
  return findAll()
}

export async function remove(id) {
  await Task.deleteOne({ _id: id })
  return findAll()
}

export async function completeAllTasks(done) {
  await Task.updateMany({}, { $set: { done: done } })
  return findAll()
}

export async function completeAllDoneTasks() {
  await Task.deleteMany({ done: true })
  return findAll()
}
