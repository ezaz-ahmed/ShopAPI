import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Book } from 'src/books/entities/book.entity';

@ObjectType({ description: 'Author Model' })
export class Author {
  @Field(() => ID, { description: 'Unique identier of Author' })
  id: number;

  name: string;
  walletAddress: string;
  stripeAccountId?: string;
  isOwner: boolean;
  isVerified: boolean;
  books?: Book[];
}
