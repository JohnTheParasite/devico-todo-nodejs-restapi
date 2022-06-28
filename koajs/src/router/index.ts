import Router from 'koa-router'
import tasksRouter from './tasksRouter'
import usersRouter from './usersRouter'

const rootRouter = new Router();
rootRouter.use(tasksRouter);
rootRouter.use(usersRouter);

export default rootRouter;
