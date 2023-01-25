import request from 'supertest';
import { app } from '../../app';
import { Order, OrderStatus } from '../../models/order';
import { Ticket } from '../../models/ticket';
import { natsWrapper } from '../../nats-wrapper';

it('makrs an order as cancelled', async () => {
  // create a ticket
  const ticket = Ticket.build({
    title: 'Concert',
    price: 100,
  });
  await ticket.save();

  // build an order with the ticket
  const user = global.signin();
  const { body: order } = await request(app)
    .post('/api/orders')
    .set('Cookie', user)
    .send({ ticketId: ticket.id })
    .expect(201);

  // make the request to cancel the order
  await request(app)
    .delete(`/api/orders/${order.id}`)
    .set('Cookie', user)
    .send()
    .expect(204);

  const updatedOrder = await Order.findById(order.id);

  // expectations to make sure the order is cancelled
  expect(updatedOrder?.status).toEqual(OrderStatus.Cancelled);
});

it('emits an order cancelled event', async () => {
  // create a ticket
  const ticket = Ticket.build({
    title: 'Concert',
    price: 100,
  });
  await ticket.save();

  // build an order with the ticket
  const user = global.signin();
  const { body: order } = await request(app)
    .post('/api/orders')
    .set('Cookie', user)
    .send({ ticketId: ticket.id })
    .expect(201);

  // make the request to cancel the order
  await request(app)
    .delete(`/api/orders/${order.id}`)
    .set('Cookie', user)
    .send()
    .expect(204);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
