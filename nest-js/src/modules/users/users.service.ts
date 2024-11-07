import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Users, UsersDocument } from './users.schema';
import { Model } from 'mongoose';

import { CreateUserDto } from './user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name) private usersModel: Model<UsersDocument>,
  ) {}

  async register(data: CreateUserDto) {
    return (await this.usersModel.create(data)).toObject();
  }

  async findByAuth0Id(auth0Id: string): Promise<UsersDocument> {
    return await this.usersModel.findOne({ auth0Id });
  }

  async findByEmail(email: string) {
    return await this.usersModel.findOne({ email }).lean();
  }


}
