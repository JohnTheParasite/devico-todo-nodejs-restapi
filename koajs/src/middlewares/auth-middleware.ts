import { Context, Next, Request } from "koa";
import { UnauthorizedError } from "../services/utils";
import { validateAccessToken } from "../services/users/models";
import { IUser } from "../services/users/types";


interface ExpressRequestInterface extends Context {
  request: Request & { user?: IUser | null; }
}


export default async function (ctx: ExpressRequestInterface, next: Next) {
  try {
    const authorizationHeader = ctx.headers.authorization as string

    if (!authorizationHeader) {
      UnauthorizedError(ctx)
      return
    }

    const accessToken = authorizationHeader.split(' ')[1]
    if (!accessToken) {
      UnauthorizedError(ctx)
      return
    }

    const userData = validateAccessToken(accessToken)
    if (!userData) {
      UnauthorizedError(ctx)
      return
    }

    ctx.request.user = userData

    return next()

  } catch (e) {
    UnauthorizedError(ctx)
  }
}
