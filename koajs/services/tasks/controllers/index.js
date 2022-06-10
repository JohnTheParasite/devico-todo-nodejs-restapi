import { findAll, findById, create, update, remove, completeAllTasks } from '../models/index.js'
import { respond } from '../../utils.js'
import { validation, doneProperty } from '../validation/index.js'

async function getTasks(ctx) {
  const tasks = await findAll()
  respond(ctx, 200, tasks)
}

async function getTask(ctx, id) {
  const task = await findById(id);
  if (!task) {
    respond(ctx, 404, 'Task not found')
    return
  }
  respond(ctx, 200, task)
}

async function createTask(ctx) {
  const { error, resCode, message } = validation(ctx.request.body);
  if (error) {
    respond(ctx, resCode, message)
    return
  }

  const { content } = ctx.request.body
  const tasks = await create(content)
  respond(ctx, 200, tasks)
}

async function updateTask(ctx, id) {
  const task = await findById(id);
  if (!task) {
    respond(ctx, 404, 'Task not found')
    return
  }

  const { error, resCode, message } = validation(ctx.request.body);
  if (error) {
    respond(ctx, resCode, message)
    return
  }

  const { done, content } = ctx.request.body
  const taskData = {
    done,
    content
  }

  const tasks = await update(id, taskData)
  respond(ctx, 200, tasks)
}

async function deleteTask(ctx, id) {
  const task = await findById(id)
  if (!task) {
    respond(ctx, 404, 'Task not found')
    return
  }

  const tasks = await remove(id)
  respond(ctx, 200, tasks)
}

async function completeAll (ctx) {
  const { error, resCode, message } = doneProperty(ctx.request.body);
  if (error) {
    respond(ctx, resCode, message)
    return
  }

  const tasks = await completeAllTasks(ctx.request.body.done)
  respond(ctx, 200, tasks)
}

export default {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  completeAll
}
