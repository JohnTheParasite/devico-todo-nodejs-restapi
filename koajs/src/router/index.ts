import Router from 'koa-router'
import tasksRouter from './tasksRouter'

const rootRouter = new Router();
rootRouter.use(tasksRouter);

export default rootRouter;
