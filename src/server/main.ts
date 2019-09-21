import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { RoleGuard } from './guards/role.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  // app.useGlobalGuards(new RoleGuard(new Reflector()));
  await app.listen(3000);
}
bootstrap();
