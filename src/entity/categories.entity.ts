import { Column, Entity, ManyToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { PostEntity } from './post.entity';

@Entity({ name: 'db_categories' })
export class CategoryEntity extends BaseEntity {
  @Column()
  name: string;

  @Column()
  slug: string;

  @Column()
  description: string;

  @ManyToMany(() => PostEntity, (post) => post.categories)
  posts: PostEntity[];
}
