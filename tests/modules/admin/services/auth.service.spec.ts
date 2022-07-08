import { ConfigService } from '@nestjs/config';
import { AdminAuthService } from 'src/modules/admin/services/auth.service';

const DEFAULT_CONFIG = {
  admin: {
    username: 'admin',
    password: 'admin',
  },
};

describe('AdminAuthService (Unit)', () => {
  it('should be return null when user not matches with user and password', async () => {
    const configService = new ConfigService(DEFAULT_CONFIG);
    const adminAuthService = new AdminAuthService(configService);

    await expect(adminAuthService.authenticate('test', 'test')).resolves.toBeNull();
  });

  it('should be TRUE when user matches with user and password', async () => {
    const configService = new ConfigService(DEFAULT_CONFIG);
    const adminAuthService = new AdminAuthService(configService);

    await expect(
      adminAuthService.authenticate(DEFAULT_CONFIG.admin.username, DEFAULT_CONFIG.admin.password),
    ).resolves.toBeTruthy();
  });
});
