import { GENDER } from '@shared/constants';

export class User {
  id: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  gender: GENDER;
  image: string;
  token: string;
}
