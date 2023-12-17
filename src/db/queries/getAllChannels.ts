import { prisma } from '../app';

export const getAllChannels = async () => {
  const channels = await prisma.channel.findMany();
  return channels;
};
