import {
  Entity, PrimaryColumn, Column,
} from 'typeorm';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
class Setting {
  @Field({ nullable: true })
  playbackSpeed: number

  @Field({ nullable: true })
  hideInviteWidget: boolean
}

@Entity('user_settings')
@ObjectType()
export class UserSetting {
  @Field()
  @PrimaryColumn({
    type: 'uuid',
    name: 'user_id',
  })
  userId?: string;

  @Field()
  @PrimaryColumn({
    name: 'organization_id',
    type: 'uuid',
  })
  organizationId?: string;

  @Field(() => Setting, { nullable: true })
  @Column({ type: 'json', array: true })
  settings?: Setting
}
