import { User } from "../User";
import { Token } from "../Token";
import jwt from 'jsonwebtoken'
import {IUser} from "../types";

export async function findAll() {
  const result = await User.find()
  return result.map((el) => {
    return {
      id: el._id.toString(),
      login: el.login,
      email: el.email,
      roleId: el.roleId,
      createdAt: el.createdAt
    }
  })
}

export async function create(email: string, login: string, password: string, roleId: number) {
  const user = await User.create({
    email,
    login,
    password,
    roleId
  })

  return {
    id: user._id,
    login: user.login,
    email: user.email,
    roleId: user.roleId,
    createdAt: user.createdAt
  }
}

export async function checkExisting(email: string, login: string) {
  const emailResult = await User.find({ email })
  const loginResult = await User.find({ login })
  return {
    emailExist: emailResult.length > 0,
    loginExist: loginResult.length > 0
  }
}

export async function getUser(email: string) {
  return await User.findOne({ email })
}

export async function getUserById(id: string) {
  return await User.findById(id)
}

export async function logoutUser(refreshToken: string) {
  return await removeToken(refreshToken)
}

export async function saveToken(userId: string, refreshToken: string) {
  const tokenData = await Token.findOne({ user: userId })
  if (tokenData) {
    tokenData.refreshToken = refreshToken
    return tokenData.save()
  }
  const token = await Token.create({ user: userId, refreshToken })
  return token
}

export async function removeToken(refreshToken: string) {
  return await Token.deleteOne({ refreshToken })
}

export async function findToken(refreshToken: string) {
  return await Token.findOne({ refreshToken })
}

export function validateAccessToken(token: string): IUser | null {
  try {
    const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET as string) as IUser
    return {
      id: userData.id,
      login: userData.login,
      email: userData.email,
      roleId: userData.roleId,
      createdAt: userData.createdAt,
    }
  } catch (e) {
    return null
  }
}

export function validateRefreshToken(token: string): IUser | null {
  try {
    const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET as string) as IUser
    return {
      id: userData.id,
      login: userData.login,
      email: userData.email,
      roleId: userData.roleId,
      createdAt: userData.createdAt,
    }
  } catch (e) {
    return null
  }
}

