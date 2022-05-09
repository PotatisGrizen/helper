import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/rest/v9";

import { config_ as config } from "../configs/config-handler";
import configurationSchema from "../db/schemas/configuration.schema";
import { commandFiles } from "../files";
import { Bot } from "../structures/Bot";
import { IBotCommand, TypedEvent } from "../types/types";

export default TypedEvent({
  eventName: "ready",
  once: true,
  run: async (client: Bot) => {
    client.logger.console.info(`Logged in as ${client.user?.tag}.`);
    client.logger.console.info(
      `Ready to serve ${client.guilds.cache.size} guilds.`
    );
    client.logger.console.info(
      `Invite -> ${client.generateInvite({
        permissions: ["ADMINISTRATOR"],
        scopes: ["applications.commands", "bot"],
      })}`
    );

    const commandArr: object[] = [];

    for await (const file of commandFiles) {
      const command = (await import(file)).default as IBotCommand;
      if (!command) {
        client.logger.console.error(
          `File at path ${file} seems to incorrectly be exporting a command.`
        );
        continue;
      }

      commandArr.push(command.data.toJSON());
      client.commands.set(command.data.name, command);
      client.logger.console.debug(`Registered command ${command.data.name}`);
    }

    const rest = new REST({ version: "9" }).setToken(config.token);

    rest.put(Routes.applicationGuildCommands(client.user.id, config.guildId), {
      body: commandArr,
    });
  },
});
