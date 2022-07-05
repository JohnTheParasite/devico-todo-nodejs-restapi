export interface IUser {
  id: number,
  login: string,
  email: string,
  roleId: number
}

export interface ValidationResult {
  error: boolean,
  resCode?: number,
  message?: string
}


