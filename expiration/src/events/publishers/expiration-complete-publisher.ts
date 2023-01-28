import {
  Subjects,
  Publisher,
  ExpirationCompleteEvent,
} from '@mysctickets/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
