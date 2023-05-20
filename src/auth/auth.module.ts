import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { AuthorsModule } from 'src/authors/authors.module';

@Module({
  imports: [
    AuthorsModule,
    JwtModule.register({
      global: true,
    }),
  ],
  providers: [AuthResolver, AuthService],
})
export class AuthModule {}
