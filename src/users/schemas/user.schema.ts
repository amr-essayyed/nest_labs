
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
    @Prop({ unique: true, required: true })
    email: string;

    @Prop({ required: true })
    password: string;
    
    @Prop({ required: true })
    fullName: string;

    @Prop({ required: true, min: 16, max: 60 })
    age: number;

    @Prop({ required: true, match: /^01\d{9}$/ })
    mobileNumber: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
