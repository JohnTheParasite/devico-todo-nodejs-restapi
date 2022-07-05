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
import { createUserValidation, loginValidation, passwordValidation, validateToken } from "../validation";
import { Context } from "koa";
import { IUser, ValidationResult } from "../types";
import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt";
import { Users } from "../../../entities/Users";

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

  const salt = await bcrypt.genSalt(10)
  const newPassword = await bcrypt.hash(password, salt)

  const user = await create(email, login, newPassword, roleId)

  const tokens = generateTokens(user)

  await saveToken(user as Users, tokens.refreshToken)

  ctx.cookies.set('refreshToken', tokens.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })

  respond(ctx, 200, { ...tokens, user: returnUserData(user) })
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

  const tokens = generateTokens(user as Users)

  await saveToken(user as Users, tokens.refreshToken)

  ctx.cookies.set('refreshToken', tokens.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })

  respond(ctx, 200, { ...tokens, user: returnUserData(user as Users) })
}

export async function logout(ctx: Context) {

  const { refreshToken } = ctx.request.body

  await logoutUser(refreshToken)

  ctx.cookies.set('refreshToken', '')

  respond(ctx, 200, { message: 'Logout' })

}

export async function refresh(ctx: Context) {
  const { refreshToken } = ctx.request.body

  const { error, resCode, message } = await validateToken(refreshToken) as ValidationResult
  if (error) {
    respond(ctx, resCode!, message!)
    return
  }

  const userData = validateRefreshToken(refreshToken) as IUser
  const user = await getUserById(userData.id)

  const tokens = generateTokens(user as Users)

  await saveToken(user as Users, tokens.refreshToken)

  ctx.cookies.set('refreshToken', tokens.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })

  respond(ctx, 200, { ...tokens, user: returnUserData(user as Users) })
}

function generateTokens(payload: Users) {
  const userdata = returnUserData(payload)

  const accessToken = jwt.sign(userdata, process.env.JWT_ACCESS_SECRET as string, { expiresIn: '30m' })
  const refreshToken = jwt.sign(userdata, process.env.JWT_REFRESH_SECRET as string, { expiresIn: '30d' })
  return {
    accessToken,
    refreshToken,
  }
}

function returnUserData(userData: Users) {
  return {
    id: userData.id,
    login: userData.login,
    email: userData.email,
    roleId: userData.roleId
  } as IUser
}

export default {
  getUsers,
  createUser,
  authorization,
  logout,
  refresh
}
