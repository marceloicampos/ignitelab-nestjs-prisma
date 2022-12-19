import { Module } from '@nestjs/common';
import { NotificationsController } from './controllers/notifications.controller';
import { SendNotification } from '@application/use-cases/send-notification';
import { DatabaseModule } from '../database/database.module';
import { UnreadNotification } from '@application/use-cases/unread-notification';
import { ReadNotification } from '@application/use-cases/read-notification';
import { CountRecipientNotifications } from '@application/use-cases/count-recipient-notifications';
import { GetRecipientNotifications } from '@application/use-cases/get-recipient-notifications';
import { CancelNotification } from '@application/use-cases/cancel-notification';
import { PrismaService } from '@infra/database/prisma/prisma.service';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [
    PrismaService,
    CancelNotification,
    CountRecipientNotifications,
    GetRecipientNotifications,
    ReadNotification,
    UnreadNotification,
    SendNotification,
  ],
})
export class HttpModule {}
