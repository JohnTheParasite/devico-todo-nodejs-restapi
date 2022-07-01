export interface IUser {
  id: string,
  login: string,
  email: string,
  roleId: number,
  createdAt: string
}

export interface ValidationResult {
  error: boolean,
  resCode?: number,
  message?: string
}


