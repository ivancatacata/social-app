import { Injectable } from '@angular/core';
import { AuthCredentials, User } from '../models/user.model';
import { sleep } from '../../shared/utils/helpers';

const MOCK_EMAIL = 'oliver@queen.com';
const MOCK_PASSWORD = 'password123';

@Injectable({ providedIn: 'root' })
export class AuthService {
  async loginWithEmail(credentials: AuthCredentials): Promise<User> {
    await sleep(900);

    if (
      credentials.email !== MOCK_EMAIL ||
      credentials.password !== MOCK_PASSWORD
    ) {
      throw new Error('Invalid email or password');
    }

    return {
      id: 'user-001',
      name: 'Oliver Queen',
      email: MOCK_EMAIL,
      avatarInitials: 'OQ',
      provider: 'email',
    };
  }

  async loginWithGoogle(): Promise<User> {
    await sleep(1000);

    return {
      id: 'user-005',
      name: 'Barry Allen',
      email: 'barry.allen@gmail.com',
      avatarInitials: 'BA',
      provider: 'google',
    };
  }
}
