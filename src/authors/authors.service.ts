import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthorsService {
  constructor(private prisma: PrismaService, private config: ConfigService) {}

  findOne(publicAddress: string) {
    return this.prisma.author.findUnique({
      where: {
        publicAddress,
      },
      select: {
        id: true,
        isOwner: true,
        publicAddress: true,
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
