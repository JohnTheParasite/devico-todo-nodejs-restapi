import { Task } from "../Task";
import { Users } from "../../../entities/Users";
import { Tasks } from "../../../entities/Tasks";
import { AppDataSource } from "../../../data-source";

const usersRepository = AppDataSource.getRepository(Users)
const tasksRepository = AppDataSource.getRepository(Tasks)

export async function findAll() {
  return await tasksRepository.find()
}

export async function findAllByUserId(userId: number) {
  const user = await usersRepository.findOne({
    where: { id: userId },
    relations: { tasks: true },
  })

  return user?.tasks
}

export async function findById(id: number) {
  return await tasksRepository.findOne( { where: { id }, relations: { user: true } })
}

export async function create(content: string, userId: number) {
  const user = await usersRepository.findOne({ where: { id: userId }})

  const task: Tasks = new Tasks()
  task.content = content
  task.user = user as Users

  await tasksRepository.save(task)

  return findAllByUserId(userId)
}

export async function update(id: number, userId: number, task: { content: string; done: boolean }) {
  await tasksRepository.update(id, task)
  return await findAllByUserId(userId)
}

export async function remove(id: number, userId: number) {
  await tasksRepository.delete(id)
  return findAllByUserId(userId)
}

export async function completeAllTasks(userId: number, done: boolean) {

  const user = await usersRepository.findOne({ where: { id: userId } })

  await tasksRepository.update({ user: user as Users }, { done })

  return findAllByUserId(userId)

}

export async function completeAllDoneTasks(userId: number) {

  const user = await usersRepository.findOne({ where: { id: userId } })

  if (user) {
    await tasksRepository.delete({ user, done: true })
  }

  return findAllByUserId(userId)
}
