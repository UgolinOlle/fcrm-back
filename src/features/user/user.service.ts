import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { genSaltSync, hashSync } from 'bcrypt';
import { isUUID } from 'class-validator';

import { UserEntity } from '@features/user/entities/user.entity';
import {
  UserCreateDto,
  UserCreateOutput,
} from '@features/user/dto/user-create.dto';
import { UserDeleteDto } from '@features/user/dto/user-delete.dto';
import { UserGetDto } from '@features/user/dto/user-get.dto';
import { MailerService } from '@shared/mailer/mailer.service';
import { UserMailDto } from '@features/user/dto/user-mail.dto';
import { ProjectEntity } from '@features/project/entities/project.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(ProjectEntity)
    private readonly projectRepository: Repository<ProjectEntity>,
    private readonly mailer: MailerService,
  ) {}

  async create(body: UserCreateDto): Promise<UserCreateOutput> {
    const userExist = await this.userRepository.findOneBy({
      email: body.email,
    });

    if (userExist) {
      throw new HttpException('User already exist', HttpStatus.CONFLICT);
    }

    let user = this.userRepository.create({
      ...body,
      password: hashSync(body.password, genSaltSync()),
    });

    user = await this.userRepository.save(user);
    return { user };
  }

  async delete(id: UserEntity['id']): Promise<UserDeleteDto> {
    const user = await this.userRepository.findOne({
      where: { id: id },
      relations: { projects: true },
    });
    if (!user) {
      throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
    }

    await Promise.all(
      user.projects.map(async (project) => {
        await this.projectRepository.remove(project);
      }),
    );

    await this.userRepository.delete(id);
    return { id };
  }

  async update(
    id: UserEntity['id'],
    body: Partial<UserEntity>,
  ): Promise<UserEntity> {
    const user = await this.userRepository.findBy({ id: id });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    await this.userRepository.update(id, { ...body });
    return await this.userRepository.findOne({ where: { id: id } });
  }

  async sendMail(mail: UserMailDto): Promise<any> {
    return await this.mailer.sendMail({
      to: mail.to,
      subject: mail.subject,
      body: mail.body,
    });
  }

  // -- Getter
  async getAll(): Promise<UserGetDto[]> {
    return this.userRepository.find({ relations: { projects: true } });
  }

  async getById(id: UserEntity['id']): Promise<UserEntity> {
    if (!isUUID(id)) {
      throw new HttpException('uuid is incorrect', HttpStatus.BAD_REQUEST);
    }

    const user = await this.userRepository.findOne({
      where: { id },
      relations: { projects: true },
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async getByRole(role: UserEntity['role']): Promise<UserEntity[]> {
    return await this.userRepository.find({ where: { role } });
  }

  async getByEmail(email: UserEntity['email']): Promise<UserEntity> {
    return await this.userRepository.findOne({
      where: { email },
    });
  }
}
