import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Author } from 'src/authors/entities/author.entity';

@ObjectType({ description: 'Book Model' })
export class Book {
  @Field(() => ID, { description: 'Unique identier of Book' })
  id: number;

  title: string;
  description: string;
  price: number;
  emoji: string;
  coverImage: string;

  @Field(() => Int)
  quantity: number;
  author: Author;
}
