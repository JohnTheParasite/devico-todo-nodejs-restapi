import { Task } from "../Task";

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

export async function findById(id: string) {
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

export async function create(content: string) {
  await Task.create({
    content
  })
  return findAll()
}

export async function update(id: string, task: { content: string; done: boolean }) {
  await Task.updateOne({ _id: id }, { ...task })
  return findAll()
}

export async function remove(id: string) {
  await Task.deleteOne({ _id: id })
  return findAll()
}

export async function completeAllTasks(done: boolean) {
  await Task.updateMany({}, { $set: { done: done } })
  return findAll()
}

export async function completeAllDoneTasks() {
  await Task.deleteMany({ done: true })
  return findAll()
}
