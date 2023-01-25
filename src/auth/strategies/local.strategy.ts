import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { AuthPayload } from '../interface/auth-payload.interface';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { UserEntity } from 'src/entity/user.entity';
import { UnauthorizedException } from '@nestjs/common/exceptions';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<UserEntity> {
    const user = await this.authService.validateUser({ email, password });
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
