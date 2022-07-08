import { ConfigService } from '@nestjs/config';
import { Env } from 'src/config';

export class AdminAuthService {
  constructor(private readonly configService: ConfigService<Env>) {}

  public async authenticate(username: string, password: string) {
    const admin = this.configService.get<Env['admin']>('admin');

    const matchUser = username === admin.username && password === admin.password;

    if (!matchUser) return null;

    return {
      email: username,
    };
  }
}
