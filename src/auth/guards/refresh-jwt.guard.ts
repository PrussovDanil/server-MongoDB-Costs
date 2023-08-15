import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class RefreshJWTGuard implements CanActivate {
  constructor(private userService: UsersService) {}
  async canActivate(
    context: ExecutionContext,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const { refreshToken, username } = request.body;
    if (!refreshToken) {
      throw new UnauthorizedException('Error with refresh token');
    }

    if (!username) {
      throw new UnauthorizedException('Error with username');
    }
    const user = await this.userService.findOne(username);

    if (!user) {
      throw new UnauthorizedException('User is not exist ');
    }
    return true;
  }
}
