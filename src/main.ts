import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();

// main é o arquio principal que basicamente é o que inicia o servidor e
// o que vai rodar no app.module
// nestFactory é o que vai criar o servidor
// o await é para esperar o servidor rodar
// e a aplicação irá rodar na porta 3000 localhost
