import { Task } from "../Task";

export async function findAll() {
  const result = await Task.find({})
  return result.map((el) => {
    return {
      id: el._id.toString(),
      userId: el.userId,
      done: el.done,
      content: el.content,
      createdAt: el.createdAt,
      updatedAt: el.updatedAt
    }
  })
}

export async function findAllByUserId(userId: string) {
  const result = await Task.find({userId})
  return result.map((el) => {
    return {
      id: el._id.toString(),
      userId: el.userId,
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
      userId: task.userId,
      done: task.done,
      content: task.content,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt
    }
  }
  return task
}

export async function create(content: string, userId: string) {
  await Task.create({
    userId,
    content
  })
  return findAllByUserId(userId)
}

export async function update(id: string, userId: string, task: { content: string; done: boolean }) {
  await Task.updateOne({ _id: id }, { ...task })
  return findAllByUserId(userId)
}

export async function remove(id: string, userId: string) {
  await Task.deleteOne({ _id: id })
  return findAllByUserId(userId)
}

export async function completeAllTasks(userId: string, done: boolean) {
  await Task.updateMany({ userId }, { $set: { done: done } })
  return findAllByUserId(userId)
}

export async function completeAllDoneTasks(userId: string) {
  await Task.deleteMany({ userId, done: true })
  return findAllByUserId(userId)
}
