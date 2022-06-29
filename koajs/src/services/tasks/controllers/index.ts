import {
  findAll,
  findById,
  create,
  update,
  remove,
  completeAllTasks,
  completeAllDoneTasks,
  findAllByUserId
} from '../models'
import { respond } from "../../utils";
import { createTodoValidation, toggleAllDoneProperty } from "../validation";
import { Context } from "koa";

export async function getTasks(ctx: Context) {
  const tasks = await findAll()
  respond(ctx, 200, tasks)
}

export async function getUserTasks(ctx: Context, userId: string) {
  const tasks = await findAllByUserId(userId)
  respond(ctx, 200, tasks)
}

async function getTask(ctx: Context, id: string) {
  const task = await findById(id);
  if (!task) {
    respond(ctx, 404, 'Task not found')
    return
  }
  respond(ctx, 200, task)
}

async function createTask(ctx: Context) {
  const { error, resCode, message } = createTodoValidation(ctx.request.body);
  if (error) {
    respond(ctx, resCode!, message!)
    return
  }

  const { content, userId } = ctx.request.body
  const tasks = await create(content, userId)
  respond(ctx, 200, tasks)
}

async function updateTask(ctx: Context, id: string) {
  const task = await findById(id);
  if (!task) {
    respond(ctx, 404, 'Task not found')
    return
  }

  const { error, resCode, message } = createTodoValidation(ctx.request.body);
  if (error) {
    respond(ctx, resCode!, message!)
    return
  }

  const { done, content } = ctx.request.body
  const taskData = {
    done,
    content
  }

  const tasks = await update(id, task.userId, taskData)
  respond(ctx, 200, tasks)
}

async function deleteTask(ctx: Context, id: string) {
  const task = await findById(id)
  if (!task) {
    respond(ctx, 404, 'Task not found')
    return
  }

  const tasks = await remove(id, task.userId)
  respond(ctx, 200, tasks)
}

async function completeAll (ctx: Context) {
  const { error, resCode, message } = toggleAllDoneProperty(ctx.request.body);
  if (error) {
    respond(ctx, resCode!, message!)
    return
  }

  const { userId, done } = ctx.request.body
  const tasks = await completeAllTasks(userId, done)
  respond(ctx, 200, tasks)
}

async function deleteAllCompletedTasks (ctx: Context, userId: string) {
  const tasks = await completeAllDoneTasks(userId)
  respond(ctx, 200, tasks)
}

export default {
  getTasks,
  getUserTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  completeAll,
  deleteAllCompletedTasks
}
