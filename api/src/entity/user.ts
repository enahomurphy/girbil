import {
  Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToOne,
} from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { plainToClass } from 'class-transformer';

import { Organization } from './organization';
import { Team } from './team';
import { Channel } from './channel';

@Entity('users')
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  readonly id?: string;

  @Field()
  @Column({
    nullable: true,
  })
  name?: string;

  @Field()
  @Column()
  email?: string;

  @Column({
    nullable: true,
  })
  password?: string;

  @Field({ nullable: true })
  @Column({
    name: 'is_verified',
    type: 'boolean',
  })
  isVerified?: boolean;

  @Column({
    nullable: true,
  })
  @Field({ nullable: true })
  avatar?: string;

  @OneToOne(() => Organization)
  organization?: Organization;

  @ManyToMany(() => Organization, (organization) => organization.users)
  organizations: Organization[];

  @ManyToMany(() => Team, (team) => team.users)
  teams?: Team[];

  @ManyToMany(() => Channel, (channel) => channel.users)
  channels?: Channel[];

  get user(): User {
    return plainToClass(User, {
      id: this.id,
      avatar: this.avatar,
      name: this.name,
      organization: this.organization,
      isVerified: Boolean(this.isVerified === 'true'),
      email: this.email,
    });
  }
}
