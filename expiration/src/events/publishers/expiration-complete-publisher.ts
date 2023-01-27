import {
  Publisher,
  ExpirationCompleteEvent,
  Subjects,
} from '@mysctickets/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationComplete;
}
