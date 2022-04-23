import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const User = createParamDecorator((property: any, ctx: ExecutionContext) => {
    const body = ctx.switchToHttp().getRequest().body

    if (!body.user) {
        return null
    }
    if (property) {
        return body.user[property]
    }

    return body.user
})