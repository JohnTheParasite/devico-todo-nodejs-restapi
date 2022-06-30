import { Context } from "koa";

export function respond(ctx: Context, resCode: number, message: string|object) {

  let body:string|object = message
  if (typeof message === 'string') {
    body = { message }
  }

  ctx.status = resCode
  ctx.body = body
}

export function UnauthorizedError(ctx: Context) {
  ctx.status = 401
  ctx.body = '401 Unauthorized'
}
