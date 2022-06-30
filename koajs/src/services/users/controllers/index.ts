import {
  findAll,
  create,
  checkExisting,
  getUser,
  getUserById,
  saveToken,
  logoutUser,
  validateRefreshToken
} from '../models'
import { respond } from "../../utils";
import { ValidationResult, createUserValidation, loginValidation, passwordValidation, validateToken } from "../validation";
import { Context } from "koa";
import jwt from 'jsonwebtoken'

const JWT_ACCESS_SECRET = 'jwt-devico-secret-key'
const JWT_REFRESH_SECRET = 'jwt-devico-refresh-secret-key'

interface IUser {
  id: string,
  login: string,
  email: string,
  roleId: number,
  createdAt: string
}

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

  const tokens = generateTokens({
    id: user.id,
    login: user.login,
    email: user.email,
    roleId: user.roleId,
    createdAt: user.createdAt
  })

  await saveToken(user.id, tokens.refreshToken)

  ctx.cookies.set('refreshToken', tokens.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })

  respond(ctx, 200, { ...tokens, user })
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

  const tokens = generateTokens(returnUser)
  await saveToken(returnUser.id, tokens.refreshToken)

  ctx.cookies.set('refreshToken', tokens.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })

  respond(ctx, 200, { ...tokens, user: returnUser })
}

export async function logout(ctx: Context) {

  const refreshToken = ctx.cookies.get('refreshToken') as string

  await logoutUser(refreshToken)

  ctx.cookies.set('refreshToken', '')

  respond(ctx, 200, { message: 'Logout' })

}

export async function refresh(ctx: Context) {

  const refreshToken = ctx.cookies.get('refreshToken') as string

  const { error, resCode, message } = await validateToken(refreshToken) as ValidationResult
  if (error) {
    respond(ctx, resCode!, message!)
    return
  }

  const userData = validateRefreshToken(refreshToken) as IUser
  const user = await getUserById(userData.id)

  const returnUser = {
    id: user._id,
    login: user.login,
    email: user.email,
    roleId: user.roleId,
    createdAt: user.createdAt
  }

  const tokens = generateTokens(returnUser)

  await saveToken(returnUser.id, tokens.refreshToken)

  ctx.cookies.set('refreshToken', tokens.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })

  respond(ctx, 200, { ...tokens, user: returnUser })
}

function generateTokens(payload: IUser) {
  const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET, { expiresIn: '30m' })
  const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: '30d' })
  return {
    accessToken,
    refreshToken,
  }
}

export default {
  getUsers,
  createUser,
  authorization,
  logout,
  refresh
}
