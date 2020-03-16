import { ObjectType, Field } from 'type-graphql';
import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToMany, OneToOne, JoinTable,
} from 'typeorm';

import { plainToClass } from 'class-transformer';
import { User } from '.';

@Entity('organizations')
@ObjectType()
export class Organization {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  readonly id: string

  @Field({ nullable: true })
  @Column()
  name: string

  @Field({ nullable: true })
  @Column({
    unique: true,
  })
  domain?: string

  @Field({ nullable: true })
  @Column()
  logo?: string

  @Field({ nullable: true })
  @Column({
    name: 'user_id',
  })
  userId?: string

  @Field()
  role?: string

  @Field({ nullable: true })
  position?: string

  @Field({ nullable: true })
  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt?: Date

  @Field(() => User, { nullable: true })
  @OneToOne(() => User)
  creator?: User

  @ManyToMany(() => User, (user) => user.organizations)
  @JoinTable({
    name: 'user_organizations',
    joinColumn: {
      name: 'userId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'organizationId',
      referencedColumnName: 'id',
    },
  })
  users?: User[];

  get organization(): Organization {
    return plainToClass(Organization, {
      id: this.id,
      role: this.role,
      domain: this.domain,
      name: this.name,
      logo: this.logo,
    });
  }
}
