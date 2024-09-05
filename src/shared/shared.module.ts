import { Logger, Module } from '@nestjs/common';
import { ValidateTokenGuard } from './guards/validate-token.guard';

@Module({
  imports: [],
  providers: [Logger, ValidateTokenGuard],
  exports: [ValidateTokenGuard],
})
export class SharedModule {}
