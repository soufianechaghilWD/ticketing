import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

declare global {
  var signin: (id?: string) => string[];
}

let mongo: any;
jest.mock('../nats-wrapper');

beforeAll(async () => {
  process.env.JWT_KEY = 'asdf';

  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri, {});
});

beforeEach(async () => {
  jest.clearAllMocks();
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  if (mongo) {
    await mongo.stop();
  }

  await mongoose.connection.close();
});

global.signin = (id?: string) => {
  const token = jwt.sign(
    {
      id: id || new mongoose.Types.ObjectId().toHexString(),
      email: 'test@test.test',
    },
    process.env.JWT_KEY!
  );
  const sessionJSON = JSON.stringify({ jwt: token });

  const base64 = Buffer.from(sessionJSON).toString('base64');

  return [`session=${base64}`];
};
