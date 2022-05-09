import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, MessageEmbed } from "discord.js";
import { IBotCommand } from "../types/types";

import * as fs from "fs";
import { Bot } from "../structures/Bot";

const values: any = [];

const command: IBotCommand = {
  name: "Help Command",
  desc: "List of all commands",
  timeout: 2000,
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("list all commands"),
  execute(interaction: CommandInteraction<"cached">, client: Bot) {
    fs.readdir("./dist/commands", (err, files) => {
      if (values[1] != null) {
        const embed = new MessageEmbed()
          .setTitle("Command list!")
          .setColor("BLUE")
          .setTimestamp()
          .setDescription(`List of all commands`);
        for (let i = 0; i < values.length; i++) {
          embed.addField(values[i], values[(i = i + 1)], true);
        }
        return interaction.reply({ embeds: [embed], ephemeral: true });
      } else if (values[1] == null) {
        if (err) client.logger.console.error(err);
        let jsfiles = files.filter((f) => f.split(".").pop() === "js");
        if (jsfiles.length <= 0) {
          client.logger.console.error(files);
          return;
        }
        let namelist = "";
        let desclist = "";
        jsfiles.forEach((f, _i) => {
          let props = require(`./${f}`).default;
          client.logger.console.debug(props);
          namelist = props.name;
          desclist = props.desc;
          values.push(`${namelist}`);
          values.push(`${desclist}`);
        });
        const embed = new MessageEmbed()
          .setTitle(`Command List!`)
          .setColor("BLUE")
          .setTimestamp()
          .setDescription("List all commands");
        for (let i = 0; i < values.length; i++) {
          embed.addField(values[i], values[(i = i + 1)], true);
        }
        return interaction.reply({ embeds: [embed], ephemeral: true });
      }
    });
  },
};

export default command;
