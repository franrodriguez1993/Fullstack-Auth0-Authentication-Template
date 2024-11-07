/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class Auth0Service {
  private AUTH0_DOMAIN: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    // Notiwork
    this.AUTH0_DOMAIN = this.configService.get('AUTH0_DOMAIN');
  }

  getAuth0Id(res: Request): string {
    const token = res.header('Authorization');
    if (!token) {
      throw new UnauthorizedException('Error retrieving user id');
    }
    const decodedToken = jwt.decode(token.split(' ')[1], { complete: true });
    if (typeof decodedToken.payload.sub === 'string') {
      return decodedToken.payload.sub;
    } else {
      throw new UnauthorizedException('Error retrieving user id');
    }
  }

  getUserInfo(res: Request) {
    const token = res.header('Authorization');
    return firstValueFrom(
      this.httpService.get(`${this.AUTH0_DOMAIN}userinfo`, {
        headers: {
          Authorization: token,
        },
      }),
    );
  }
}
