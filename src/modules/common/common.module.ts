import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guards/auth.guard';

@Module({
  imports: [HttpModule],
  providers: [{ provide: APP_GUARD, useClass: AuthGuard }],
})
export class CommonModule {}
