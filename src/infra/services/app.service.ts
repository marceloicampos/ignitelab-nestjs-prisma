import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}

// service é todo o resto das funcionalidades que o servidor pode fazer
// neste caso, o servidor vai fazer o getHello e o getHello vai retornar uma string
// o service é utilizado pelo controllers ou até por outros services
