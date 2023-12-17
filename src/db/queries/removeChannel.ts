import { prisma } from '../app';

export const removeChannel = async (channelId: string) => {
  await prisma.channel.delete({
    where: {
      channelId: channelId,
    },
  });
};
