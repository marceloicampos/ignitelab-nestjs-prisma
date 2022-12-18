import { Module } from '@nestjs/common';
import { HttpModule } from './infra/http/http.module';
import { DatabaseModule } from './infra/database/database.module';
import { AppController } from './infra/http/controllers/notifications.controller';
import { AppService } from './infra/services/app.service';

@Module({
  imports: [HttpModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
  // acima temos a injeção de independências, auto magicamente o nestjs detecta e injeta as dependências que estão instanciadas nas classes
  // tanto que o AppService tem o Decorator @Injectable()
})
export class AppModule {}

// o module cria os módulos da aplicação, no caso estamos usando o
// controllers: [AppController] que falam as rotas da aplicação e
// providers: [AppService] que falam quais são os serviços da aplicação
// no caso o modulo é um acoplador
// NOTA: um módulo pode importar outro módulo
