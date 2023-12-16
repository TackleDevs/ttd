import { Client, Events, GatewayIntentBits } from 'discord.js';

export const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
  ]
});

client.once(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on('guildCreate', guild => {
  console.log(`Joined a new guild: ${guild.name}`);
  console.log(`Guild ID: ${guild.id}`);
});
