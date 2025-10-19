import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json, urlencoded } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.use(json({ limit: '300mb' }));
  app.use(urlencoded({ extended: true, limit: '300mb' }));

  // ✅ Active CORS pour ton frontend Next.js
  app.enableCors({
   origin: true,
  credentials: true,
});

  await app.listen(5000);
  console.log('✅ Backend NestJS sur http://localhost:5000');
}
bootstrap();
