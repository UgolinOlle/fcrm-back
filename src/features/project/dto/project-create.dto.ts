import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

import { ProjectType } from '@core/enums/project-type';
import { ProjectEntity } from '@features/project/entities/project.entity';

export class ProjectCreateDto {
  @IsString()
  name: ProjectEntity['name'];

  @IsString()
  description: ProjectEntity['description'];

  @IsEnum(ProjectType)
  project_type: ProjectEntity['project_type'];

  @IsNotEmpty()
  user: ProjectEntity['user'];
}

export class ProjectCreateOutput {
  project: ProjectEntity;
}
