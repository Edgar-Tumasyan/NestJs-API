/* eslint-disable prettier/prettier */
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { ArticleEntity } from './article/article.entity';
import { FollowEntity } from './profile/follow.entity';
import { TagEntity } from './tag/tag.entity';
import { UserEntity } from './user/user.entity';

const config: PostgresConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'NestAPI',
  entities: [TagEntity, UserEntity, ArticleEntity, FollowEntity],
  synchronize: true,
  // migrations: [__dirname + '/migrations/**/*{.ts, .js}'],
};

export default config;
