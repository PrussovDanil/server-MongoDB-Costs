import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private authService: AuthService) {}
  async canActivate(
    context: ExecutionContext,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const { username, password } = request.body;
    const user = await this.authService.validateUser(username);
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!user) {
      throw new UnauthorizedException(`User ${username} not exist`);
    }
    if (!passwordValid) {
      throw new UnauthorizedException(`Wrong password for user:${username}`);
    }
    return true;
  }
}
