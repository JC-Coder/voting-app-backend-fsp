import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface ILoggedInUser {
  userId: string;
  role: string;
}

export const LoggedInUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    return req.user ?? null;
  },
);
