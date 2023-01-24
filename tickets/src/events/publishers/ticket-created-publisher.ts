import { Publisher, Subjects, TicketCreatedEvent } from '@mysctickets/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
