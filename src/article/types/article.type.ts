/* eslint-disable prettier/prettier */
import { ArticleEntity } from '../article.entity';

export type ArticleType = Omit<ArticleEntity, 'updateTimestamp'>;
