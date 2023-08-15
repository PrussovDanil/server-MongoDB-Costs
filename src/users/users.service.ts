import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { User, UsersDocument } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly usersModel: Model<UsersDocument>,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<User | null> {
    const userExist = await this.usersModel.collection.findOne({
      username: createUserDto.username,
    });
    if (userExist) {
      throw new BadRequestException('User already exist');
    }
    const createdUser = new this.usersModel();
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    createdUser.username = createUserDto.username;
    createdUser.password = hashedPassword;
    return createdUser.save();
  }

  async login(loginUserDto: LoginUserDto): Promise<User | null> {
    const user = await this.usersModel.collection.findOne({
      username: loginUserDto.username,
    });
    if (!user) {
      throw new BadRequestException('Wrong!!!');
    }
    return user as User;
  }

  async findOne(username: string) {
    return this.usersModel.findOne({ username });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
