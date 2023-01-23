import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { StatusPost } from './enum/StatusPost.enum';
import { UserEntity } from './user.entity';
import { CommentEntity } from './comment.entity';
import { CategoryEntity } from './categories.entity';
import { LikesPostsEntity } from './likes_posts.entity';
import { CountPostsEntity } from './count_post.entity';

@Entity({ name: 'db_posts' })
export class PostEntity extends BaseEntity {
  @Column()
  title: string;

  @Column({ type: 'text' })
  avatar: string;

  @Column()
  slug: string;

  @Column({ type: 'text' })
  subContent: string;

  @Column({ type: 'text' })
  content: string;

  @Column()
  status: StatusPost;

  @Column()
  isAction: boolean;

  @ManyToOne(() => UserEntity, (user) => user.posts)
  author: UserEntity;

  @OneToMany(() => CommentEntity, (comment) => comment.post)
  comments: CommentEntity[];

  @OneToMany(() => LikesPostsEntity, (lp) => lp.post)
  likes: LikesPostsEntity[];

  @OneToMany(() => CountPostsEntity, (cp) => cp.post)
  counter: LikesPostsEntity[];

  @ManyToMany(() => CategoryEntity, (category) => category.posts)
  @JoinTable({
    name: 'db_post_category',
    joinColumn: { name: 'post_id' },
    inverseJoinColumn: { name: 'category_id' },
  })
  categories: CategoryEntity[];
}
