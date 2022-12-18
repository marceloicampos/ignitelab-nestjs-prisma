import { Content } from './content';
import { Notification } from './notification';

describe('Notification Content', () => {
  it('should be able to create a notification', () => {
    const notification = new Notification({
      recipientId: '321c6914-5aaf-4b7f-9239-a2387569c4b9',
      content: new Content('Nova Solicitação de Compra'),
      category: 'Compras',
    });
    expect(notification).toBeTruthy();
  });
});
