import { ObjectType } from '@nestjs/graphql';
import { Author } from 'src/authors/entities/author.entity';

@ObjectType({ description: 'Author Model' })
export class Auth {
  accessToken: string;
  author: Author;
}
