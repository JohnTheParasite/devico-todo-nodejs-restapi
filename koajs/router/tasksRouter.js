import Router from 'koa-router';
import TasksController from '../services/tasks/controllers/index.js'
import { respond } from '../services/utils.js'

const router = new Router();

router.get('/api/tasks',ctx => {
  try {
    TasksController.getTasks(ctx);
  } catch {
    respond(ctx, 500, 'Internal Server Error')
  }
})

router.get('/api/tasks/:id',ctx => {
  try {
    const id = parseInt(ctx.params.id);
    TasksController.getTask(ctx, id);
  } catch {
    respond(ctx, 500, 'Internal Server Error')
  }
})

router.post('/api/tasks', ctx => {
  try {
    TasksController.createTask(ctx);
  } catch {
    respond(ctx, 500, 'Internal Server Error')
  }
})

router.put('/api/tasks/:id', ctx => {
  try {
    const id = parseInt(ctx.params.id);
    TasksController.updateTask(ctx, id);
  } catch {
    respond(ctx, 500, 'Internal Server Error')
  }
})

router.delete('/api/tasks/:id', ctx => {
  try {
    const id = parseInt(ctx.params.id);
    TasksController.deleteTask(ctx, id);
  } catch {
    respond(ctx, 500, 'Internal Server Error')
  }
})

export default router.routes();
