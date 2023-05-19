import { InputType } from '@nestjs/graphql';

@InputType({ description: 'Inputs to register a new author' })
export class RegisterInput {
  name: string;
  walletAddress: string;
}
