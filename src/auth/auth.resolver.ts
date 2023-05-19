import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Author } from 'src/authors/entities/author.entity';
import { Auth } from './entities/auth.entity';
import { RegisterInput } from './dto';

@Resolver(() => Author)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => Auth, { name: 'login', nullable: true })
  login(@Args('walletAddress') walletAddress: string) {
    return this.authService.login(walletAddress);
  }

  @Mutation(() => Auth, { name: 'register', nullable: true })
  register(@Args('registerInput') registerInput: RegisterInput) {
    return this.authService.register(registerInput);
  }
}
