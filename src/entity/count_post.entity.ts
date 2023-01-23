import { Entity, ManyToOne } from 'typeorm';
import { PostEntity } from './post.entity';
import { UserEntity } from './user.entity';
import { BaseEntity } from './base.entity';

@Entity({ name: 'db_count_posts' })
export class CountPostsEntity extends BaseEntity {
  @ManyToOne(() => PostEntity, (post) => post.counter)
  post: PostEntity;

  @ManyToOne(() => UserEntity, (user) => user.counter)
  user: UserEntity;
}
