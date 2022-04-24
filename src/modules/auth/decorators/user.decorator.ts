import { createParamDecorator, ExecutionContext } from '@nestjs/common';

const User = createParamDecorator((property: any, ctx: ExecutionContext) => {
  const { body } = ctx.switchToHttp().getRequest();

  if (!body.user) {
    return null;
  }
  if (property) {
    return body.user[property];
  }

  return body.user;
});
export default User;
