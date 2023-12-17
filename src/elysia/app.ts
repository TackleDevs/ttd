import { Elysia } from 'elysia';
import cron from '@elysiajs/cron';
import { getAllChannels } from '@/db';
import { client, sendMessage } from '@/discord';
import { getDayLinks } from '@/scraper';

export const app = new Elysia();

app.use(
  cron({
    name: 'heartbeat',
    pattern: '0 0 * * *',
    run() {
      (async () => {
        try {
          const links = await getDayLinks();
          if (!links) {
            new Error('links is undefined');
            return;
          }
          const channels = await getAllChannels();
          for (const channel of channels) {
            for (const link of links) {
              await sendMessage(client, channel.channelId, link);
            }
          }
        } catch (error) {
          console.error(error);
        }
      })();
    },
  }),
);
