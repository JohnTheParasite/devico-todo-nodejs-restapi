import { findAll, findById, create, update, remove } from '../models/index.js'
import { respond } from '../../utils.js'
import { validation } from '../validation/index.js'

function getTasks(ctx) {
  respond(ctx, 200, findAll())
}

function getTask(ctx, id) {
  const task = findById(id);
  if (!task) {
    respond(ctx, 404, 'Task not found')
    return
  }
  respond(ctx, 200, task)
}

function createTask(ctx) {
  const { error, resCode, message } = validation(ctx.request.body);
  if (error) {
    respond(ctx, resCode, message)
    return
  }

  const { content } = ctx.request.body
  const tasks = create(content)
  respond(ctx, 200, tasks)
}

function updateTask(ctx, id) {
  const task = findById(id);
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

  const tasks = update(id, taskData)
  respond(ctx, 200, tasks)
}

function deleteTask(ctx, id) {
  const task = findById(id)
  if (!task) {
    respond(ctx, 404, 'Task not found')
    return
  }

  const tasks = remove(id)
  respond(ctx, 200, tasks)
}

export default {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask
}