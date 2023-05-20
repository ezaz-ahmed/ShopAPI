import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { RegisterInput } from './dto/register.input';
import { AuthorsService } from 'src/authors/authors.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private authorService: AuthorsService,
    private config: ConfigService,
  ) {}

  async register(
    registerInput: RegisterInput,
  ): Promise<{ access_token: string }> {
    const author = await this.authorService.findOne(
      registerInput.walletAddress,
    );

    if (author) {
      throw new ForbiddenException('Author Already has an account.');
    }

    return await this.signToken(author);
  }

  async login(publicAddress: string): Promise<{ access_token: string }> {
    const author = await this.authorService.findOne(publicAddress);

    if (!author) {
      throw new UnauthorizedException("Author doesn't exist");
    }

    return await this.signToken(author);
  }

  async signToken(author): Promise<{ access_token: string }> {
    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwtService.signAsync(author, {
      expiresIn: '15m',
      secret: secret,
    });

    return {
      access_token: token,
    };
  }
}
