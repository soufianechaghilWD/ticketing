import { Publisher, Subjects, TicketUpdatedEvent } from '@mysctickets/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
