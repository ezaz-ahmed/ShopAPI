import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Author } from 'src/authors/entities/author.entity';
import { Auth } from './entities/auth.entity';
import { RegisterInput } from './dto';

@Resolver(() => Author)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => Auth, { name: 'login' })
  async login(@Args('publicAddress') publicAddress: string) {
    return await this.authService.login(publicAddress);
  }

  @Mutation(() => Auth, { name: 'register' })
  async register(@Args('registerInput') registerInput: RegisterInput) {
    return await this.authService.register(registerInput);
  }
}
