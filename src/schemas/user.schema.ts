import { SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from 'src/domain/entities';

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);