import {findAll, create, checkExisting, getUser} from '../models'
import { respond } from "../../utils";
import {createUserValidation, loginValidation, passwordValidation} from "../validation";
import { Context } from "koa";

export async function getUsers(ctx: Context) {
  const tasks = await findAll()
  respond(ctx, 200, tasks)
}

export async function createUser(ctx: Context) {

  const { login, email, password } = ctx.request.body
  const existing = await checkExisting(email, login)

  const { error, resCode, message } = createUserValidation(ctx.request.body, existing);
  if (error) {
    respond(ctx, resCode!, message!)
    return
  }

  const roleId = ctx.request.body.roleId ?? 1

  const user = await create(email, login, password, roleId)
  respond(ctx, 200, user)
}

export async function authorization(ctx: Context) {

  const { error, resCode, message } = loginValidation(ctx.request.body);
  if (error) {
    respond(ctx, resCode!, message!)
    return
  }

  const { email, password } = ctx.request.body

  const user = await getUser(email)

  const passwordCheck = await passwordValidation(user, password)
  if (passwordCheck.error) {
    respond(ctx, passwordCheck.resCode!, passwordCheck.message!)
    return
  }

  const returnUser = {
    id: user._id,
    login: user.login,
    email: user.email,
    roleId: user.roleId,
    createdAt: user.createdAt
  }

  respond(ctx, 200, returnUser)
}

export default {
  getUsers,
  createUser,
  authorization
}
