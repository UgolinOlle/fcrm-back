import { Column, Entity, OneToMany } from 'typeorm';

import { AbstractEntity } from '@core/entities/abstract.entity';
import { Role } from '@core/enums/role';
import { ProjectEntity } from '@features/project/entities/project.entity';
import { EntityStatus } from '@core/enums/entity-status';

@Entity('user')
export class UserEntity extends AbstractEntity {
  @Column({ unique: true })
  email: string;

  @Column()
  firstName?: string;

  @Column()
  lastName?: string;

  @Column()
  password: string;

  @Column({ name: 'refresh_token', nullable: true })
  refreshToken?: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.PROSPECT,
  })
  role: Role;

  @Column({ type: 'enum', enum: EntityStatus, default: EntityStatus.INACTIVE })
  status: EntityStatus.INACTIVE;

  @OneToMany(() => ProjectEntity, (project) => project.user)
  projects: ProjectEntity[];
}
