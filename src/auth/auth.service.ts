import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { RegisterInput } from './dto/register.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthorsService } from 'src/authors/authors.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
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
      throw new ForbiddenException('Author Already Has an account.');
    }

    const nonce = Math.floor(Math.random() * 10000);
    const newAuthor = await this.prisma.author.create({
      data: {
        name: registerInput.name,
        walletAddress: registerInput.walletAddress,
        nonce: nonce.toString(),
      },
      select: {
        id: true,
        isOwner: true,
        isVerified: true,
      },
    });

    let token = await this.signToken(newAuthor);

    console.log(token);

    return token;
  }

  async login(walletAddress: string): Promise<{ access_token: string }> {
    const author = await this.authorService.findOne(walletAddress);

    if (!author) {
      throw new UnauthorizedException();
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
