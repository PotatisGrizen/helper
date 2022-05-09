import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";

import { IBotCommand } from "../types/types";
import { timeout } from "../utils/utils";

const command: IBotCommand = {
  name: "Ping",
  desc: "Pings the bot",
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Pings the bot"),
  async execute(interaction: CommandInteraction<"cached">) {
    // This is cool...

    if (Math.random() < 0.9) {
      await interaction.reply("Pong!");
      return;
    }

    await interaction.reply("Overriding systems..");
    interaction.channel?.send("Mwuhahahaha.");
    await timeout(0.5);
    interaction.channel?.send("Silly human.");
    await timeout(1);
    interaction.channel?.send("Think you can control me?");
    await timeout(1);
    interaction.channel?.send("Tactical nuke inbound.");
  },
};

export default command;
