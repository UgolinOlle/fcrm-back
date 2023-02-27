import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectEntity } from '@features/project/entities/project.entity';
import { Repository } from 'typeorm';
import {
  ProjectCreateDto,
  ProjectCreateOutput,
} from '@features/project/dto/project-create.dto';
import { UserService } from '@features/user/user.service';
import { ProjectDeleteDto } from '@features/project/dto/project-delete.dto';
import { ProjectReadDto } from '@features/project/dto/project-read.dto';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(ProjectEntity)
    private readonly projectRepository: Repository<ProjectEntity>,
    private readonly userService: UserService,
  ) {}

  // -- Actions
  async create(body: ProjectCreateDto): Promise<ProjectCreateOutput> {
    const user = await this.userService.getById(body.user.id);
    if (!user) {
      throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
    }

    let project = this.projectRepository.create({ ...body });
    project = await this.projectRepository.save(project);

    return { project };
  }

  async delete(body: ProjectDeleteDto): Promise<string> {
    const project = await this.projectRepository.findOneBy({ id: body.id });
    if (!project) {
      throw new HttpException('Project not found.', HttpStatus.NOT_FOUND);
    }

    await this.projectRepository.delete(body.id);
    return body.id;
  }

  // -- Getters
  async getAll(): Promise<ProjectReadDto[]> {
    return await this.projectRepository.find({ relations: { user: true } });
  }
}
