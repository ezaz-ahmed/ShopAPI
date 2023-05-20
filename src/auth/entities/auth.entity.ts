import { ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Author Model' })
export class Auth {
  access_token: string;
}
