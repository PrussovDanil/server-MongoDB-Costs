import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type UsersDocument = User & Document;

@Schema()
export class User {
  @Prop({ require: true })
  username: string;

  @Prop({ require: true })
  password: string;
  _id: mongoose.Types.ObjectId | string;
}

export const UsersSchema = SchemaFactory.createForClass(User);
