export function respond(ctx, resCode, message) {
  let body = message
  if (typeof message === 'string') {
    body = { message }
  }

  ctx.status = resCode
  ctx.body = body
}

export default {
  respond
}
