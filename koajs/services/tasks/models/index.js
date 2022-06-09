import { Task } from "../Task.js";

export async function findAll() {
  return Task.find()
}

export async function findById(id) {
  return Task.findById(id)
}

export async function create(content) {
  await Task.create({
    content
  })
  return findAll()
}

export async function update(id, task) {
  const taskToUpdate = await findById(id)
  if (!taskToUpdate) {
    throw new Error(`Task ${id} is has not been found`)
  }
  Object.assign(taskToUpdate, task)
  await taskToUpdate.save()
  return findAll()
}

export async function remove(id) {
  await Task.deleteOne({ _id: id })
  return findAll()
}
