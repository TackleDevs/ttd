import { ChannelType, Client } from 'discord.js';

export const sendMessage = async (
  client: Client,
  channelId: string,
  message: string,
) => {
  try {
    const channel = client.channels.cache.get(channelId);
    if (channel === undefined) {
      new Error('Channel does not exist');
      return;
    }
    if (channel.type !== ChannelType.GuildText) {
      new Error('Channel is not a text channel');
      return;
    }
    await channel.send(message);
  } catch (error) {
    console.log(error);
  }
};
