const Koa = require('koa')
const Router = require('koa-router')
const TasksController = require('./services/tasks/controllers')
const { respond } = require('./services/utils');

const app = new Koa()
const router = new Router()

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

app.use(require('koa-body')())
app.use(router.allowedMethods())
app.use(router.routes())

const port = process.env.PORT || 8081;
app.listen(port, () => console.log(`Listening on port ${port}...`))
