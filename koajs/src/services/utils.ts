import {Context} from "koa";

export function respond(ctx: Context, resCode: number, message: string|object) {

  let body:string|object = message
  if (typeof message === 'string') {
    body = { message }
  }

  ctx.status = resCode
  ctx.body = body
}

export default {
  respond
}
