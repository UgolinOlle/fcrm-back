import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

import { UserService } from '@features/user/user.service';
import {
  UserCreateDto,
  UserCreateOutput,
} from '@features/user/dto/user-create.dto';
import { UserGetDto } from '@features/user/dto/user-get.dto';
import { UserDeleteDto } from '@features/user/dto/user-delete.dto';
import { JwtAuthGuard } from '@features/auth/guards/jwt-auth.guard';
import { Public } from '@core/decorators/public.decorator';
import { UserEntity } from '@features/user/entities/user.entity';
import { Role } from '@core/enums/role';
import { Roles } from '@core/decorators/roles.decorator';
import { UserMailDto } from '@features/user/dto/user-mail.dto';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(@Inject(UserService) private readonly userService: UserService) {}

  // -- Actions
  @Public()
  @Post('signup')
  async signup(@Body() body: UserCreateDto): Promise<UserCreateOutput> {
    return await this.userService.create(body);
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<UserDeleteDto> {
    return await this.userService.delete(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: Partial<UserEntity>,
  ): Promise<UserEntity> {
    return await this.userService.update(id, body);
  }

  @Post('mail')
  @Roles(Role.ADMIN)
  async sendMail(@Body() body: UserMailDto): Promise<any> {
    return await this.userService.sendMail(body);
  }

  // -- Getters
  @Get(':id')
  async getUser(@Param('id') id: string): Promise<UserGetDto> {
    return await this.userService.getById(id);
  }

  @Get()
  async getAll(): Promise<UserGetDto[]> {
    return await this.userService.getAll();
  }
}
