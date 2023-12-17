import { prisma } from '../app';

export const addChannel = async (channelId: string) => {
  await prisma.channel.create({
    data: {
      channelId: channelId,
    },
  });
};
