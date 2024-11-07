import { Module } from '@nestjs/common';
import { UtilService } from './services/util.service';
import { Auth0Service } from './services/auth0.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), HttpModule],
  providers: [UtilService, Auth0Service],
  exports: [UtilService, Auth0Service],
})
export class SharedModule {}
