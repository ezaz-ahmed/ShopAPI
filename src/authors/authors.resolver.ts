import { Resolver, Query, Args } from '@nestjs/graphql';
import { AuthorsService } from './authors.service';
import { Author } from './entities/author.entity';

@Resolver(() => Author)
export class AuthorsResolver {
  constructor(private readonly authorsService: AuthorsService) {}

  @Query(() => Author, { name: 'author' })
  findOne(@Args('publicAddress') publicAddress: string) {
    return this.authorsService.findOne(publicAddress);
  }

  @Query(() => [Author], { name: 'authors' })
  findAll() {
    return this.authorsService.findAll();
  }
}
