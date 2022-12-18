import { Body, Controller, Get, Post } from '@nestjs/common';
import { SendNotification } from '../../../application/use-cases/send-notification';
import { AppService } from '../../services/app.service';
// import { PrismaService } from '../../prisma.service';
// import { randomUUID } from 'node:crypto';
import { CreateNotificationBody } from '../dtos/create-notification-body';

@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}
  // a classe recebe as dependências pelo construtor, ou seja, inversão de dependência
  @Get('hello')
  getHello(): string {
    return this.appService.getHello();
  }
}
// rota atual http://localhost:3000/app/hello

@Controller('notifications')
export class NotificationsController {
  constructor(private sendNotification: SendNotification) {}
  // constructor(private readonly prisma: PrismaService) {}
  // @Get()
  // list() {
  //   return this.prisma.notification.findMany();
  // }

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    // console.log(body);
    const { recipientId, content, category } = body;
    const { notification } = await this.sendNotification.execute({
      recipientId,
      content,
      category,
    });

    return { notification };

    // await this.prisma.notification.create({
    //   data: {
    //     id: randomUUID(),
    //     recipientId,
    //     content,
    //     category,
    //   },
    // });
  }
}
// rota atual http://localhost:3000/notifications
// controllers controlam as rotas
