import redis from 'redis';

export const dbRedisConfig = async () => {
  const url = `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`;
  const client = await redis.createClient(
    {
      url,
    },
  );
  client.on('error', (error) => {
    console.log(`client Error REDIS ${error}`);
  });
  client.on('connect', () => {
    console.log('client REDIS connect ready');
  });

  const subClient = client.duplicate();

  subClient.on('error', (error) => {
    console.log(`subClient Error REDIS ${error}`);
  });
  subClient.on('connect', () => {
    console.log('subClient REDIS connect ready');
  });

  await client.connect();
  await subClient.connect();

  global.redisClient = client;
  global.redisSubClient = subClient;
};
