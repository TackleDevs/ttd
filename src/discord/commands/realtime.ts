import { SlashCommandBuilder } from 'discord.js';
import type { Command } from '../types';
import { getRealtimeLinks } from '@/scraper';
import { sendMessage } from '../utils';

export const realtime: Command = {
  data: new SlashCommandBuilder()
    .setName('realtime')
    .setDescription(
      'リアルタイムのランキングを表示します ⚠️ 40~80件の間で大量に送信されます ⚠️ ',
    ),
  execute: async (interaction) => {
    await interaction.reply('検索中... ⚠️ 40~80件の間で大量に送信されます ⚠️');
    try {
      const links = await getRealtimeLinks();
      await interaction.editReply('検索が完了しました 結果を表示します');
      const twitterLinks = links.filter((link) => link.includes('twitter'));
      const twiLinks = links.filter((link) => link.includes('twimg'));
      if (twitterLinks.length === twiLinks.length) {
        new Error('scraping error');
      }
      const length = twitterLinks.length;
      for (let i = 0; i < length; i++) {
        await sendMessage(
          interaction.client,
          interaction.channelId,
          '\n\n' + twitterLinks[i] + '\n' + twiLinks[i],
        );
      }
      await sendMessage(
        interaction.client,
        interaction.channelId,
        '\n\n--- 以上、' + links.length / 2 + '件でした ---',
      );
    } catch (error) {
      await interaction.editReply(
        'エラーが発生しました もう一度お試しください\n' + error,
      );
      console.error(error);
    }
  },
};
