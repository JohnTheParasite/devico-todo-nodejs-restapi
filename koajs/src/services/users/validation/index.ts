import bcrypt from "bcrypt";

interface ValidationResult {
  error: boolean,
  resCode?: number,
  message?: string
}

interface IBody {
  email?: string,
  login?: string,
  password?: string,
  roleId?: string,
}

function constructResult(message?:string): ValidationResult {
  let result: ValidationResult = { error: false };

  if (message) {
    result = { error: true, resCode: 400, message};
  }

  return result
}

export function createUserValidation(body: IBody, existing: { emailExist: boolean, loginExist: boolean }) {
  const { email, login, password } = body
  const roleId = body.roleId ?? 1

  if (!email) {
    return constructResult('Email is required')
  } else if (!login) {
    return constructResult('Login is required')
  } else if (!password) {
    return constructResult('Password is required')
  } else if (roleId < 1 || roleId > 3) {
    return constructResult('Invalid Role ID')
  } else if (existing.emailExist) {
    return constructResult('Email already exist')
  } else if (existing.loginExist) {
    return constructResult('Login already exist')
  }

  return constructResult()
}

export function loginValidation (body: IBody) {
  const { email, password } = body
  if (!email) {
    return constructResult('Email is required')
  } else if (!password) {
    return constructResult('Password is required')
  }

  return constructResult()
}

export async function passwordValidation (user: any, bodyPassword: string) {
  if (user && await bcrypt.compare(bodyPassword, user.password)) {
    return constructResult()
  }
  return constructResult('Invalid email or password')
}
