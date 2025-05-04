
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
    @Prop()
    emial: string;

    @Prop()
    Password: string;
    
    @Prop()
    fullName: string;

    @Prop()
    age: number;

    @Prop()
    mboileNumber: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
