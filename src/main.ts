import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { Environment } from './common/configs/environment';
import helmet from 'helmet';
import { HttpExceptionFilter } from './common/filter/filter';
import { ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from './modules/v1/auth/guards/jwt-auth.guard';
import { RolesGuard } from './modules/v1/auth/guards/role.guard';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors({
    origin: '*',
  });

  // security
  app.use(helmet());

  //filters
  app.useGlobalFilters(new HttpExceptionFilter());

  // prefix
  app.setGlobalPrefix('/api/v1');

  // global guards
  const reflector = new Reflector();
  app.useGlobalGuards(new JwtAuthGuard(reflector));
  app.useGlobalGuards(new RolesGuard(reflector));

  // pipeline validation
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(Environment.APP.PORT);
}
bootstrap();
