import { TypedEvent } from "../types/types";

export default TypedEvent({
  eventName: "guildCreate",
  run: async (client, guild) => {
    client.logger.console.info(
      `The bot has joined the guild ${guild.name} - ${guild.id}`
    );
  },
});
