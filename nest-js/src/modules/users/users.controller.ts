import {
  Controller,
  Post,
  HttpStatus,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersDocument } from './users.schema';
import { ModuleRef } from '@nestjs/core';
import { Auth0Service } from '../shared/services/auth0.service';
import { AuthenticationGuard } from '../shared/guard/authentication.guard';
import { Request } from 'express';

@ApiTags('users')
@Controller('users')
export class UsersController {
  private auth0Service: Auth0Service;
  constructor(
    private readonly usersService: UsersService,
    private readonly moduleRef: ModuleRef,
  ) {}

  onModuleInit() {
    this.auth0Service = this.moduleRef.get(Auth0Service, { strict: false });
  }

  @Post('/me')
  @ApiOperation({ summary: 'Get user data' })
  @UseGuards(AuthenticationGuard)
  @ApiBearerAuth()
  async me(@Req() req: Request) {
    const auth0Id = this.auth0Service.getAuth0Id(req);
    let user: UsersDocument = null;

    user = await this.usersService.findByAuth0Id(auth0Id);

    if (!user) {
      const data = await this.auth0Service.getUserInfo(req);
      const body = data.data;
      user = await this.usersService.register({
        username: body.nickname,
        email: body.email,
        auth0Id,
        avatar: body.picture,
      });
    }

    return { statusCode: HttpStatus.CREATED, result: { user } };
  }
}
