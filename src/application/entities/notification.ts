import { Replace } from '@helpers/Replace';
import { Content } from './content';
import { randomUUID } from 'node:crypto';

export interface NotificationProps {
  recipientId: string;
  content: Content;
  category: string;
  readAt?: Date | null;
  canceledAt?: Date | null;
  // acima podemos ter um Date (uma data), um undefined (não existe esse dado) ou null (esse dado existe e é vazio)
  // podemos usar o maybe do purify-ts
  createdAt: Date;
}

export class Notification {
  private _id: string;
  private props: NotificationProps;

  constructor(
    props: Replace<NotificationProps, { createdAt?: Date }>,
    id?: string,
  ) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    };
  }

  public get id() {
    return this._id;
  }

  public get recipientId(): string {
    return this.props.recipientId;
  }

  public set recipientId(recipientId: string) {
    this.props.recipientId = recipientId;
  }

  public get content(): Content {
    return this.props.content;
  }

  public set content(content: Content) {
    this.props.content = content;
  }

  public get category(): string {
    return this.props.category;
  }

  public set category(category: string) {
    this.props.category = category;
  }

  public get canceledAt(): Date | null | undefined {
    return this.props.canceledAt;
  }
  // -------------------------------------------------------------
  public cancel() {
    if (this.props.canceledAt) {
      throw new Error('This notification has already been canceled'); // maybe take off the if and error
    }
    this.props.canceledAt = new Date();
  }
  // -------------------------------------------------------------
  public get readAt(): Date | null | undefined {
    return this.props.readAt;
  }
  // -------------------------------------------------------------
  public read() {
    if (this.props.readAt) {
      throw new Error('This notification has already been read'); // maybe take off the if and error
    }
    this.props.readAt = new Date();
  }

  public unread() {
    this.props.readAt = null;
  }

  // -------------------------------------------------------------
  public get createdAt(): Date {
    return this.props.createdAt;
  }
}
