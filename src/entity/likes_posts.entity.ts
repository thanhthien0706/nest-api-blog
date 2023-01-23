import { Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { PostEntity } from './post.entity';
import { UserEntity } from './user.entity';

@Entity({ name: 'db_likes_posts' })
export class LikesPostsEntity extends BaseEntity {
  @ManyToOne(() => PostEntity, (post) => post.likes)
  post: PostEntity;

  @ManyToOne(() => UserEntity, (user) => user.likes)
  user: UserEntity;
}
