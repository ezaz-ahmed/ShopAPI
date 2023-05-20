import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthorsService {
  constructor(private prisma: PrismaService, private config: ConfigService) {}

  findOne(walletAddress: string) {
    return this.prisma.author.findUnique({
      where: {
        walletAddress,
      },
      select: {
        id: true,
        isOwner: true,
        walletAddress: true,
        isVerified: true,
      },
    });
  }

  findAll() {
    return this.prisma.author.findMany({
      where: {
        isOwner: false,
      },
    });
  }
}
