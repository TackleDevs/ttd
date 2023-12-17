import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  SlashCommandBuilder,
} from 'discord.js';
import { Command } from '../types';
import { getRealtimeLinks } from '@/scraper';
import { sendMessage } from '../utils';

export const realtime: Command = {
  data: new SlashCommandBuilder()
    .setName('realtime')
    .setDescription(
      'リアルタイムのランキングを表示します ⚠️ 40~80件の間で大量に送信されます ⚠️ ',
    ),
  execute: async (interaction) => {
    await interaction.reply(
      '検索中...   ⚠️ 40~80件の間で大量に送信されます ⚠️',
    );
    try {
      const links = await getRealtimeLinks();
      if (!links) {
        new Error('scraping error');
        return;
      }
      await interaction.editReply('検索が完了しました 結果を表示します');
      const twitterLinks = links.filter((link, index) => {
        if (index % 2 === 1 && !link.includes('twimg')) {
          return link;
        }
      });
      const fxtwitterLinks = twitterLinks.map((link) =>
        link.replace('twitter', 'fxtwitter'),
      );
      const twiLinks = links.filter((link, index) => {
        if (index % 2 === 0 && !link.includes('twitter')) {
          return link;
        }
      });
      if (fxtwitterLinks.length === twiLinks.length) {
        new Error('scraping error');
      }
      const length = twitterLinks.length;

      for (let i = 0; i < length; i++) {
        const rows = new ActionRowBuilder<ButtonBuilder>()
          .addComponents(
            new ButtonBuilder()
              .setStyle(ButtonStyle.Link)
              .setLabel('Download')
              .setURL(twiLinks[i]),
          )
          .toJSON();
        await sendMessage(
          interaction.client,
          interaction.channelId,
          '=====================================================\n' +
            fxtwitterLinks[i],
          [rows],
        );
      }
      await sendMessage(
        interaction.client,
        interaction.channelId,
        '=====================================================\n' +
          '以上、' +
          links.length / 2 +
          '件でした',
      );
    } catch (error) {
      await interaction.editReply(
        'エラーが発生しました もう一度お試しください\n' + error,
      );
      console.error(error);
    }
  },
};
