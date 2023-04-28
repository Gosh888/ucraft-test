import redis from 'redis';

export const dbRedisConfig = async () => {
  const client = await redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  });
  client.on('error', (error) => {
    console.log(`Error REDIS ${error}`);
  });
  client.on('connect', () => {
    console.log('REDIS connect ready');
  });
  await client.connect();
  global.redisClient = client;
};
