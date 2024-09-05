/* eslint-disable prettier/prettier */
import { CanActivate, ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ValidateTokenGuard implements CanActivate {
  private options;

  constructor(
    private readonly logger: Logger,
    private readonly configService: ConfigService,
  ) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    return this.validate(context.switchToHttp().getRequest());
  }

  async validate(req): Promise<boolean> {
    console.log(req.headers.authorization?.split('Bearer ').join(''));
    //Bypass token validation
    /*
    if (!token) {
      this.logger.log('Not valid Auth token');
      throw new UnauthorizedException();
    }
    */

    return true;
  }
}
