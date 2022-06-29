import Router from 'koa-router';
import TasksController from "../services/tasks/controllers";
import { respond } from '../services/utils'

const router = new Router();

router.get('/api/tasks',async ctx => {
  try {
    await TasksController.getTasks(ctx);
  } catch(e) {
    console.error(e)
    respond(ctx, 500, 'Internal Server Error')
  }
})

router.get('/api/tasks/:userId',async ctx => {
  try {
    const userId = ctx.params.userId;
    await TasksController.getUserTasks(ctx, userId);
  } catch(e) {
    console.error(e)
    respond(ctx, 500, 'Internal Server Error')
  }
})

router.post('/api/tasks', async ctx => {
  try {
    await TasksController.createTask(ctx);
  } catch(e) {
    console.error(e)
    respond(ctx, 500, 'Internal Server Error')
  }
})

router.put('/api/tasks/bulk/update', async ctx => {
  try {
    await TasksController.completeAll(ctx);
  } catch(e) {
    console.error(e)
    respond(ctx, 500, 'Internal Server Error')
  }
})

router.put('/api/tasks/:id', async ctx => {
  try {
    const id = ctx.params.id;
    await TasksController.updateTask(ctx, id);
  } catch(e) {
    console.error(e)
    respond(ctx, 500, 'Internal Server Error.')
  }
})

router.delete('/api/tasks/:id', async ctx => {
  try {
    const id = ctx.params.id;
    await TasksController.deleteTask(ctx, id);
  } catch(e) {
    console.error(e)
    respond(ctx, 500, 'Internal Server Error')
  }
})

router.delete('/api/tasks/bulk/delete/:userId', async ctx => {
  try {
    const userId = ctx.params.userId;
    await TasksController.deleteAllCompletedTasks(ctx, userId);
  } catch(e) {
    console.error(e)
    respond(ctx, 500, 'Internal Server Error')
  }
})

export default router.routes();
