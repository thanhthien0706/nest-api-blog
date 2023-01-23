import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entity/user.entity';
import { CategoryEntity } from 'src/entity/categories.entity';
import { CommentEntity } from 'src/entity/comment.entity';
import { CountPostsEntity } from 'src/entity/count_post.entity';
import { LikesPostsEntity } from 'src/entity/likes_posts.entity';
import { PostEntity } from 'src/entity/post.entity';
import { RoleEntity } from 'src/entity/role.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DATABASE.HOST'),
        port: configService.get('DATABASE.PORT'),
        username: configService.get('DATABASE.USER'),
        password: configService.get('DATABASE.PASSWORD'),
        database: configService.get('DATABASE.NAME'),
        entities: [
          RoleEntity,
          UserEntity,
          CategoryEntity,
          CommentEntity,
          CountPostsEntity,
          LikesPostsEntity,
          PostEntity,
        ],
        synchronize: true,
      }),
    }),
  ],
})
export class MysqlModule {}
