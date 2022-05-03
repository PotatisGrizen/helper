import { PrismaClient } from "@prisma/client";
import { TypedEvent } from "../types/types";
const { configurations } = new PrismaClient();


export default TypedEvent({
  eventName: 'guildCreate',
  run: async (client, guild) => {
    if (!await configurations.findFirst({ where: { discordId: guild.id } })) {
      await configurations.create({
        data: {
          discordId: guild.id,
          ownerId: (await guild.fetchOwner()).id,
          active: true
        }
      });
      client.logger.console.debug(`Created configuration for guild ${guild.name}`);
    } else {
      client.logger.console.debug(`Configuration for guild ${guild.name} already exists`);
    }
  }
});