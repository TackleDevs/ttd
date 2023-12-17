import { client } from './discord';
import { app } from './elysia';

app.listen(process.env.PORT ?? 3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);

client.login(process.env.DISCORD_TOKEN);
