import Router from 'koa-router'
import tasksRouter from './tasksRouter.js'

const rootRouter = new Router();
rootRouter.use(tasksRouter);

export default rootRouter;
