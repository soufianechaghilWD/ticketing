import { Ticket } from '../ticket';

it('implements optimistic concurrency control', async () => {
  // create a ticket
  const ticket = Ticket.build({
    title: 'concert',
    price: 5,
    userId: '123',
  });

  // save the ticket
  await ticket.save();

  // fetch the ticket twice
  const firstInstance = await Ticket.findById(ticket.id);

  const secondInstance = await Ticket.findById(ticket.id);

  // make two seperate changes to the tickets we fetched
  firstInstance?.set({ price: 10 });
  secondInstance?.set({ price: 50 });

  // save the first fetched ticket
  await firstInstance?.save();

  // save the second fetch ticket and expect an error
  try {
    await secondInstance?.save();
  } catch (err) {
    return;
  }

  throw new Error('Should not reach this point');
});

it('implements optimistic concurrency control', async () => {
  // create a ticket
  const ticket = Ticket.build({
    title: 'concert',
    price: 5,
    userId: '123',
  });

  // save the ticket
  await ticket.save();

  expect(ticket.version).toEqual(0);
  await ticket.save();
  expect(ticket.version).toEqual(1);
  await ticket.save();
  expect(ticket.version).toEqual(2);
});
