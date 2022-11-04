/* eslint-disable prettier/prettier */
import { IsNotEmpty } from 'class-validator';

export class CreateArticleDTO {
  @IsNotEmpty()
  readonly title: string;

  @IsNotEmpty()
  readonly body: string;

  @IsNotEmpty()
  readonly description: string;

  readonly taglist?: string;
}
