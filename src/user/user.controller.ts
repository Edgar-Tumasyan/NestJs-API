import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { User } from 'src/decorators/user.decorater';
import { createUserDTO } from 'src/user/dto/createUser.dto';
import { updateUserDTO } from 'src/user/dto/update.user.dto';
import { UserLoginDTO } from 'src/user/dto/userLogin.dto';
import { AuthGuard } from 'src/guards/auth.guards';
import { BackendValidationPipe } from 'src/shared/pipes/backendValidation.pipe';
import { ExpressRequestInterface } from 'src/user/types/expressRequest.interface';
import { UserResonseInterface } from 'src/user/types/userResponse.interface';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UsePipes(new BackendValidationPipe())
  async createUser(@Body() args: createUserDTO): Promise<UserResonseInterface> {
    const user = await this.userService.createUser(args);
    return this.userService.buildUserResponse(user);
  }

  @Post('/login')
  @UsePipes(new BackendValidationPipe())
  async login(@Body() args: UserLoginDTO): Promise<UserResonseInterface> {
    const user = await this.userService.login(args);
    return this.userService.buildUserResponse(user);
  }

  @Get()
  @UseGuards(AuthGuard)
  async currenUser(
    @Req() request: ExpressRequestInterface,
    @User() user: UserEntity,
  ): Promise<UserResonseInterface> {
    return this.userService.buildUserResponse(user);
  }

  @Put()
  @UseGuards(AuthGuard)
  async updateCurrentUser(
    @User('id') currentUserId: number,
    @Body() args: updateUserDTO,
  ): Promise<UserResonseInterface> {
    const user = await this.userService.updateUser(currentUserId, args);

    return this.userService.buildUserResponse(user);
  }
}
