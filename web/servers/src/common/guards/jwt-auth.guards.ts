import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtAuthGuard {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const auth = request.headers['authorization'];
    if (!auth || !auth.startsWith('Bearer '))
      throw new UnauthorizedException('Missing token');

    try {
      const token = auth.split(' ')[1];
      const payload: any = jwt.verify(
        token,
        process.env.JWT_SECRET || 'secret',
      );
      request.user = payload;
      return true;
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
