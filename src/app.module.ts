import { Module } from '@nestjs/common';
import { HttpModule } from './http.module';
import { AppController, PrismaController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';

@Module({
  imports: [HttpModule],
  controllers: [AppController, PrismaController],
  providers: [AppService, PrismaService],
  // acima temos a injeção de independências, auto magicamente o nestjs detecta e injeta as dependências que estão instanciadas nas classes
  // tanto que o AppService tem o Decorator @Injectable()
})
export class AppModule { }

// o module cria os módulos da aplicação, no caso estamos usando o
// controllers: [AppController] que falam as rotas da aplicação e
// providers: [AppService] que falam quais são os serviços da aplicação
// no caso o modulo é um acoplador
// NOTA: um módulo pode importar outro módulo
