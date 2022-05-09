import { defaultGuildConfig, defaultPanelConfig } from "../configs/guildConfig/defaultConfig";
import configurationSchema from "../db/schemas/configuration.schema";
import panelsSchema from "../db/schemas/panels.schema";
import { TypedEvent } from "../types/types";

export default TypedEvent({
  eventName: "guildCreate",
  run: async (client, guild) => {
    if (
      await configurationSchema.findOne({
        $where: `this.guildId == ${guild.id}`,
      })
    )
      client.logger.console.debug("Guild already exists in database");
    else {
      const configuration = new configurationSchema({
        ...defaultGuildConfig,
        guildId: guild.id,
      });
      configuration.save();
      const panel = new panelsSchema({
        ...defaultPanelConfig,
        guildId: guild.id,
        channelId: guild.channels.cache.first()?.id
      });
      panel.save();
      client.logger.console.debug(
        `Guild added to database ${guild.name} - ${guild.id}`
      );
    }
  },
});
