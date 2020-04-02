import Redis from 'ioredis';
import { keys } from '../../config';

export default new Redis({
  host: keys.redis.host,
  port: keys.redis.port,
});
