import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  
  create(createUserDto: CreateUserDto) {
    // return 'This action adds a new user: ' + [...Object.values(createUserDto)].join(', ');
    try {
      return this.userModel.create(createUserDto);
    } catch (error) {
      throw new ConflictException('user email must be unigue');
    }
  }

  findAll(email: string) {
    return this.userModel.find({email: {$ne: email}});
  }

  findOne(email: string) {
    return this.userModel.findOne({ email });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
