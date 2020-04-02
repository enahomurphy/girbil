import { Queue } from 'bullmq';
import connection from './redis';

export const queue = new Queue('myqueue', { connection });
