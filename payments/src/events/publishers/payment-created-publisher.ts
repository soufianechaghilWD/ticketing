import { PaymentCreatedEvent, Publisher, Subjects } from '@mysctickets/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
}
