import {
  APIActionRowComponent,
  APIMessageActionRowComponent,
  ChannelType,
  Client,
} from 'discord.js';

export const sendMessage = async (
  client: Client,
  channelId: string,
  content: string,
  components?: APIActionRowComponent<APIMessageActionRowComponent>[],
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
    await channel.send({ content, components });
  } catch (error) {
    console.error(error);
  }
};
