const mockRedisGet = jest.fn();
const mockRedisScanStream = jest.fn();
jest.mock('../lib/redis', () => {
  return {
    getClient: () => {
      return {
        get: mockRedisGet,
        scanStream: mockRedisScanStream,
      };
    },
  };
});

const userHandler = require('./userHandler');

beforeEach(() => {
  mockRedisGet.mockClear();
  mockRedisScanStream.mockClear();
});

test('getUser', async () => {
  mockRedisGet.mockImplementation((key) => {
    if (key === 'users:1') {
      return JSON.stringify({ id: 1, name: 'John Doe' });
    }
    return null;
  });

  let res = await userHandler.getUser(1);
  expect(res.id).toEqual(1);
  expect(res.name).toEqual('John Doe');

  res = await userHandler.getUser(2);
  expect(res).toBeNull();
});

test('getUser Reject', async () => {
  expect.assertions(2);

  mockRedisGet.mockRejectedValue(new Error('something error'));

  const reqMock = {params: { id: 1 }};

  try {
    await userHandler.getUser(reqMock);
  } catch (err) {
    expect(err.message).toStrictEqual('something error');
    expect(err instanceof Error).toStrictEqual(true);
  }
});

test('getUsers', async () => {
  const streamMock = {
    async *[Symbol.asyncIterator]() {
      yield ['users:1', 'users:2'];
      yield ['users:3', 'users:4'];
    },
  };
  mockRedisScanStream.mockReturnValue(streamMock);

  mockRedisGet.mockImplementation((key) => {
    switch (key) {
      case 'users:1':
        return JSON.stringify({ id: 1, name: 'John Doe' });
      case 'users:2':
        return JSON.stringify({ id: 2, name: 'Jane Doe' });
      case 'users:3':
        return JSON.stringify({ id: 3, name: 'John Smith' });
      case 'users:4':
        return JSON.stringify({ id: 4, name: 'Jane Smith' });
    }
    return Promise.resolve(null);
  });

  const res = await userHandler.getUsers();
  expect(res.users).toStrictEqual([
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Doe' },
    { id: 3, name: 'John Smith' },
    { id: 4, name: 'Jane Smith' },
  ]);
});
