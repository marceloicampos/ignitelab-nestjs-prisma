import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { AppService } from '../../services/app.service';
import { CreateNotificationBody } from '../dtos/create-notification-body';
import { NotificationViewModels } from '../view-models/notification-view-models';
import { CancelNotification } from '@application/use-cases/cancel-notification';
import { GetRecipientNotifications } from '@application/use-cases/get-recipient-notifications';
import { CountRecipientNotifications } from '@application/use-cases/count-recipient-notifications';
import { ReadNotification } from '@application/use-cases/read-notification';
import { UnreadNotification } from '@application/use-cases/unread-notification';
import { SendNotification } from '@application/use-cases/send-notification'; // ERROR PATH
// import { PrismaService } from '../../prisma.service';
// import { randomUUID } from 'node:crypto';

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
  constructor(
    private cancelNotification: CancelNotification,
    private getRecipientNotifications: GetRecipientNotifications,
    private countRecipientNotifications: CountRecipientNotifications,
    private readNotification: ReadNotification,
    private unreadNotification: UnreadNotification,
    private sendNotification: SendNotification,
  ) {}
  // constructor(private readonly prisma: PrismaService) {}
  // @Get()
  // list() {
  //   return this.prisma.notification.findMany();
  // }

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string) {
    await this.cancelNotification.execute({
      notificationId: id,
    });
  }

  @Get('count/from/:recipientId')
  async countFromRecipient(
    @Param('recipientId') recipientId: string,
  ): Promise<{ count: number }> {
    const { count } = await this.countRecipientNotifications.execute({
      recipientId,
    });

    return {
      count,
    };
  }

  @Get('from/:recipientId')
  async getFromRecipient(@Param('recipientId') recipientId: string) {
    const { notifications } = await this.getRecipientNotifications.execute({
      recipientId,
    });

    return {
      notifications: notifications.map(NotificationViewModels.toHTTP),
    };
  }

  @Patch(':id/read')
  async read(@Param('id') id: string) {
    await this.readNotification.execute({
      notificationId: id,
    });
  }

  @Patch(':id/unread')
  async unread(@Param('id') id: string) {
    await this.unreadNotification.execute({
      notificationId: id,
    });
  }

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    // console.log(body);
    const { recipientId, content, category } = body;
    const { notification } = await this.sendNotification.execute({
      recipientId,
      content,
      category,
    });

    return {
      notification: NotificationViewModels.toHTTP(notification),
    };

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
// ESTAMOS SEM ROTA GET, SOMENTE POST
// rota atual http://localhost:3000/notifications
// controllers controlam as rotas
