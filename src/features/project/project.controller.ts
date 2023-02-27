import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@features/auth/guards/jwt-auth.guard';
import { ProjectService } from '@features/project/project.service';
import {
  ProjectCreateDto,
  ProjectCreateOutput,
} from '@features/project/dto/project-create.dto';
import { ProjectReadDto } from '@features/project/dto/project-read.dto';

@Controller('project')
@UseGuards(JwtAuthGuard)
export class ProjectController {
  constructor(
    @Inject(ProjectService) private readonly projectService: ProjectService,
  ) {}

  // -- Actions
  @Post()
  async create(@Body() body: ProjectCreateDto): Promise<ProjectCreateOutput> {
    return await this.projectService.create(body);
  }

  // -- Getters
  @Get()
  async getAll(): Promise<ProjectReadDto[]> {
    return await this.projectService.getAll();
  }
}
