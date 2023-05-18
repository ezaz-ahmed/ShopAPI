import { InputType } from '@nestjs/graphql';

@InputType()
export class RegisterInput {
  name: string;
  walletAddress: string;
}
