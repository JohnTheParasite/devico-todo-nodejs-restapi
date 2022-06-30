import { Context, Next } from "koa";
import { UnauthorizedError } from "../services/utils";
import { validateAccessToken } from "../services/users/models";


export default async function (ctx: Context, next: Next) {
  try {
    const authorizationHeader = ctx.headers.authorization as string
    if (!authorizationHeader) {
      UnauthorizedError(ctx)
      return await next()
    }

    const accessToken = authorizationHeader.split(' ')[1]
    if (!accessToken) {
      UnauthorizedError(ctx)
      return await next()
    }

    const userData = validateAccessToken(accessToken)
    if (!userData) {
      UnauthorizedError(ctx)
      return await next()
    }

    // ctx.request.user = userData
    return await next()
  } catch (e) {
    UnauthorizedError(ctx)
    return await next()
  }
}
