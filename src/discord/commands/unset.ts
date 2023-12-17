import { SlashCommandBuilder } from 'discord.js';
import { Command } from '../types';
import { existsChannel, removeChannel } from '@/db';

export const unset: Command = {
  data: new SlashCommandBuilder()
    .setName('unset')
    .setDescription('24時間ランキングの送信を停止します'),
  execute: async (interaction) => {
    await interaction.reply(
      'このチャンネルのtwi-dougaの24時間ランキングの送信を停止します',
    );
    try {
      const exists = await existsChannel(interaction.channelId);
      if (!exists) {
        await interaction.editReply('このチャンネルは登録されていません');
        return;
      }
      await removeChannel(interaction.channelId);
    } catch (error) {
      await interaction.editReply(
        'エラーが発生しました もう一度お試しください\n' + error,
      );
      console.error(error);
    }
  },
};
