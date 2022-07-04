import Router from 'koa-router';
import UsersController from "../services/users/controllers";
import { respond } from '../services/utils'
import AuthMiddleware from "../middlewares/auth-middleware";

const router = new Router();

router.get('/api/users', async ctx => {
  try {
    await UsersController.getUsers(ctx);
  } catch(e) {
    console.error(e)
    respond(ctx, 500, 'Internal Server Error')
  }
})

router.post('/api/users',async ctx => {
  try {
    await UsersController.createUser(ctx);
  } catch(e) {
    console.error(e)
    respond(ctx, 500, 'Internal Server Error')
  }
})

router.post('/api/login', async ctx => {
  try {
    await UsersController.authorization(ctx);
  } catch(e) {
    console.error(e)
    respond(ctx, 500, 'Internal Server Error')
  }
})

router.post('/api/logout', async ctx => {
  try {
    await UsersController.logout(ctx);
  } catch(e) {
    console.error(e)
    respond(ctx, 500, 'Internal Server Error')
  }
})

router.post('/api/refresh', async ctx => {
  try {
    await UsersController.refresh(ctx);
  } catch(e) {
    console.error(e)
    respond(ctx, 500, 'Internal Server Error')
  }
})

export default router.routes();
