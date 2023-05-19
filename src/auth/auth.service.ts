import { Injectable } from '@nestjs/common';
import { RegisterInput } from './dto/register.input';

@Injectable()
export class AuthService {
  create(registerInput: RegisterInput) {
    return 'This action adds a new auth';
  }

  login(walletAddress: string) {
    return `This action returns all auth`;
  }
}
