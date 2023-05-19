import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';

import { RegisterInput } from './dto/register.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthorsService } from 'src/authors/authors.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    // private jwtService: JwtService,
    private authorService: AuthorsService,
    private config: ConfigService,
  ) {}

  async register(registerInput: RegisterInput) {
    const author = await this.prisma.author.findUnique({
      where: {
        walletAddress: registerInput.walletAddress,
      },
    });
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
    });

    console.log(newAuthor);
    // return this.signToken(newAuthor);
  }

  async login(walletAddress: string) {
    const author = await this.authorService.findOne(walletAddress);

    if (author) {
      console.log(this.signToken(author));
    } else {
      throw new UnauthorizedException();
    }
  }

  async signToken(author): Promise<{ author; access_token: string }> {
    const secret = this.config.get('JWT_SECRET');

    console.log(secret);

    // const token = await this.jwt.signAsync(author, {
    //   expiresIn: '15m',
    //   secret: secret,
    // });

    return {
      author,
      access_token: 'sdfajdsfla',
    };
  }
}
