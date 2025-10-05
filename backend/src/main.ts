import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Active CORS pour ton frontend Next.js
  app.enableCors({
  origin: [
    'http://localhost:3001',
    'http://192.168.100.9:3001',
  ],
  credentials: true,
});

  await app.listen(3000);
  console.log('✅ Backend NestJS sur http://localhost:3000');
}
bootstrap();
