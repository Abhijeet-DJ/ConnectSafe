// common/guards/auth.guard.ts
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    const token = req.cookies?.token;

    if (!token) {
      throw new UnauthorizedException('No token found');
    }

    // 🔥 USE AuthService HERE
    const user = await this.authService.validateToken(token);

    req.user = user;

    return true;
  }
}