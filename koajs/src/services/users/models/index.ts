import jwt from 'jsonwebtoken'
import { IUser } from "../types";
import { Users } from "../../../entities/Users";
import { Tokens } from "../../../entities/Tokens";
import { AppDataSource } from "../../../data-source";

const usersRepository = AppDataSource.getRepository(Users)
const tokensRepository = AppDataSource.getRepository(Tokens)

export async function findAll() {
  return usersRepository.find()
}

export async function create(email: string, login: string, password: string, roleId: number) {
  const user: Users = new Users()
  user.email = email
  user.login = login
  user.password = password
  user.roleId = roleId

  const newUser = await usersRepository.save(user) as any

  return newUser
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
  return await usersRepository.findOneBy({ email })
}

export async function getUserById(id: number) {
  return await usersRepository.findOneBy({ id })
}

export async function logoutUser(refreshToken: string) {
  return await removeToken(refreshToken)
}

export async function saveToken(user: Users, refreshToken: string) {

  const userWithRelations = await usersRepository.findOne( {
    where: { id: user.id},
    relations: {
      tokens: true
    }
  })

  if (userWithRelations?.tokens.length) {
    await tokensRepository.update(userWithRelations?.tokens[0].id, { refreshToken })
    return
  }

  const token: Tokens = new Tokens()
  token.refreshToken = refreshToken
  token.user = user
  await tokensRepository.save(token)

}

export async function removeToken(refreshToken: string) {
  return await tokensRepository.delete({ refreshToken })
}

export async function findToken(refreshToken: string) {
  return await tokensRepository.findOne({ where: { refreshToken } })
}

export function validateAccessToken(token: string): IUser | null {
  try {
    const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET as string) as IUser
    return {
      id: userData.id,
      login: userData.login,
      email: userData.email,
      roleId: userData.roleId
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
      roleId: userData.roleId
    }
  } catch (e) {
    return null
  }
}

