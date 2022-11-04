import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createUserDTO } from 'src/dto/createUser.dto';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { sign } from 'jsonwebtoken';
import { JWT_SECRET } from 'src/config';
import { UserResonseInterface } from 'src/types/userResponse.interface';
import { UserLoginDTO } from 'src/dto/userLogin.dto';
import { compare } from 'bcrypt';
import { updateUserDTO } from 'src/dto/update.user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(args: createUserDTO): Promise<UserEntity> {
    const errorResponse = { errors: {} };

    const userByEmail = await this.userRepository.findOne({
      where: { email: args.email },
    });

    const userByUsername = await this.userRepository.findOne({
      where: { username: args.username },
    });

    if (userByEmail) {
      errorResponse.errors['email'] = 'has already been taken';
    }

    if (userByUsername) {
      errorResponse.errors['username'] = 'has already been taken';
    }

    if (userByEmail || userByUsername) {
      throw new HttpException(errorResponse, HttpStatus.UNPROCESSABLE_ENTITY);
    }

    const newUser = new UserEntity();
    Object.assign(newUser, args);

    return await this.userRepository.save(newUser);
  }

  async login(args: UserLoginDTO): Promise<UserEntity> {
    const errorResponse = { errors: { 'email or password': 'is invalid' } };

    const user = await this.userRepository.findOne({
      where: { email: args.email },
      select: {
        id: true,
        username: true,
        email: true,
        bio: true,
        image: true,
        password: true,
      },
    });

    if (!user) {
      throw new HttpException(errorResponse, HttpStatus.UNPROCESSABLE_ENTITY);
    }

    const isPasswordCorrect = await compare(args.password, user.password);

    if (!isPasswordCorrect) {
      throw new HttpException(errorResponse, HttpStatus.UNPROCESSABLE_ENTITY);
    }

    delete user.password;

    return user;
  }

  async findById(id: number): Promise<UserEntity> {
    return this.userRepository.findOne({ where: { id } });
  }

  async updateUser(userId: number, args: updateUserDTO): Promise<UserEntity> {
    const user = await this.findById(userId);
    Object.assign(user, args);

    return await this.userRepository.save(user);
  }

  generateJWT(user: UserEntity): string {
    return sign(
      { id: user.id, username: user.username, email: user.email },
      JWT_SECRET,
    );
  }

  buildUserResponse(user: UserEntity): UserResonseInterface {
    return {
      user: {
        ...user,
        token: this.generateJWT(user),
      },
    };
  }
}
