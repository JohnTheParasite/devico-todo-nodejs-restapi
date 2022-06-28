import { User } from "../User";

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
