import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { IsEmail } from 'class-validator';
import { RoleEntity } from './role.entity';
import { PostEntity } from './post.entity';
import { CommentEntity } from './comment.entity';
import { LikesPostsEntity } from './likes_posts.entity';
import { CountPostsEntity } from './count_post.entity';

@Entity({ name: 'db_users' })
export class UserEntity extends BaseEntity {
  @Column()
  fullName: string;

  @Column()
  avatar: string;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  password: string;

  @Column()
  isActive: boolean;

  @ManyToMany(() => RoleEntity, (role) => role.users)
  @JoinTable({
    name: 'db_user_role',
    joinColumn: { name: 'user_id' },
    inverseJoinColumn: { name: 'role_id' },
  })
  roles: RoleEntity[];

  @OneToMany(() => PostEntity, (post) => post.author)
  posts: PostEntity[];

  @OneToMany(() => CommentEntity, (comment) => comment.user)
  comments: CommentEntity[];

  @OneToMany(() => LikesPostsEntity, (lp) => lp.user)
  likes: LikesPostsEntity[];

  @OneToMany(() => CountPostsEntity, (cp) => cp.user)
  counter: LikesPostsEntity[];
}
