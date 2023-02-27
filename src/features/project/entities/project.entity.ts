import { AbstractEntity } from '@core/entities/abstract.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { ProjectType } from '@core/enums/project-type';
import { UserEntity } from '@features/user/entities/user.entity';
import { EntityStatus } from '@core/enums/entity-status';

@Entity('project')
export class ProjectEntity extends AbstractEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ type: 'enum', enum: ProjectType, default: ProjectType.AUTRE })
  project_type: ProjectType.AUTRE;

  @Column({
    type: 'enum',
    enum: EntityStatus,
    default: EntityStatus.INACTIVE,
  })
  active: EntityStatus.INACTIVE;

  @ManyToOne(() => UserEntity, (user) => user.projects, { onDelete: 'CASCADE' })
  user: UserEntity;
}
