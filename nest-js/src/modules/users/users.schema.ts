import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UsersDocument = Users & Document;

@Schema({
  versionKey: false,
  timestamps: {
    createdAt: true,
    updatedAt: true,
  },
})
export class Users {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  auth0Id: string;

  @Prop({ required: false })
  username: string;

  @Prop({ required: false })
  birthday: string;

  @Prop({ required: false })
  avatar: string;
}

export const UsersSchema = SchemaFactory.createForClass(Users);
