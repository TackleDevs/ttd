import { Elysia } from 'elysia';
import { cron } from '@elysiajs/cron'

export const app = new Elysia();

// app.use(
//   cron({
//     name: 'heartbeat',
//     pattern: '*/10 * * * * *',
//     run() {
//       console.log('Heartbeat')
//     }
//   })
// );
