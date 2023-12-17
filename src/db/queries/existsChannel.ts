import { prisma } from '../app';

export const existsChannel = async (channelId: string) => {
  const channel = await prisma.channel.findUnique({
    where: {
      channelId: channelId,
    },
  });
  if (!channel) {
    return false;
  }
  return true;
};
