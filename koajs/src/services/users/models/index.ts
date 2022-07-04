import { User } from "../User";
import { Token } from "../Token";
import jwt from 'jsonwebtoken'
import { IUser } from "../types";
import db from "../../../db"
import { Users } from "../../../entities/Users";
import { AppDataSource } from "../../../data-source";

const usersRepository = AppDataSource.getRepository(Users)

export async function findAll() {
  return usersRepository.find()
}

export async function create(email: string, login: string, password: string, roleId: number) {
  const user: Users = new User()
  user.email = email
  user.login = login
  user.password = password
  user.roleId = roleId

  const newUser = await usersRepository.save(user) as any

  return {
    id: newUser._id,
    login: newUser.login,
    email: newUser.email,
    roleId: newUser.roleId,
    createdAt: newUser.createdAt
  }
}

export async function checkExisting(email: string, login: string) {
  const emailResult = await usersRepository.findOneBy({ email })
  const loginResult = await usersRepository.findOneBy({ login })
  return {
    emailExist: emailResult !== null,
    loginExist: loginResult !== null
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

