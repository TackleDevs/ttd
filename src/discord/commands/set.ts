import { SlashCommandBuilder } from 'discord.js';
import { Command } from '../types';
import { addChannel, existsChannel } from '@/db';

export const set: Command = {
  data: new SlashCommandBuilder()
    .setName('set')
    .setDescription('24時間ランキングをこのチャンネルに送信します'),
  execute: async (interaction) => {
    await interaction.reply(
      'このチャンネルにtwi-dougaの24時間ランキングを毎日送信します',
    );
    try {
      const exists = await existsChannel(interaction.channelId);
      if (exists) {
        await interaction.editReply('このチャンネルは既に登録されています');
        return;
      }
      await addChannel(interaction.channelId);
    } catch (error) {
      await interaction.editReply(
        'エラーが発生しました もう一度お試しください\n' + error,
      );
      console.error(error);
    }
  },
};
