import { ChannelType } from "discord-api-types/v10";
import { GuildChannel, Interaction, MessageEmbed } from "discord.js";
import configurationSchema from "../db/schemas/configuration.schema";

import { Bot } from "../structures/Bot";
import { guildConfig } from "../types/guildConfigTypes";
import { TypedEvent } from "../types/types";
import { openMessageEmbedBuilder } from "../utils/embedBuilder";
import { getSubjectButtons } from "../utils/subjectButtons";
import { convertPlaceholders, timeout } from "../utils/utils";

export default TypedEvent({
  eventName: "interactionCreate",
  run: async (client: Bot, interaction: Interaction) => {
    if (!interaction.inCachedGuild()) return;
    if (interaction.isCommand()) {
      const command = client.commands.get(interaction.commandName);
      if (!command) return;

      if (
        command.requiredPerms &&
        !interaction.member.permissions.has(command.requiredPerms)
      ) {
        const invalidPermissionsEmbed = new MessageEmbed()
          .setColor("RED")
          .setTitle("Command Failed")
          .setDescription(
            "You have insufficient permissions to use this command."
          );
        interaction.reply({
          embeds: [invalidPermissionsEmbed],
          ephemeral: true,
        });
        return;
      }

      try {
        await command.execute(interaction, client);
      } catch (e) {
        console.error(e);

        const errorEmbed = new MessageEmbed()
          .setColor("RED")
          .setDescription("❌ An error occurred while executing the command.");

        if (interaction.deferred || interaction.replied) {
          await interaction.editReply({
            content: " ",
            embeds: [errorEmbed],
          });
        } else {
          await interaction.reply({
            content: " ",
            embeds: [errorEmbed],
            ephemeral: true,
          });
        }
      }
    } else if (interaction.isButton()) {


      if (interaction.customId === 'close') {

        interaction.deferReply({ ephemeral: true });

        // UPDATE TICKET INFO!

        interaction.channel?.delete();
        return;
      }

      if (interaction.customId === 'claim') {
          
          interaction.deferReply({ ephemeral: true });

          // UPDATE TICKET INFO!
      }

      const config: guildConfig = await configurationSchema.findOne({
        guildId: interaction.guildId,
      }) as guildConfig;

      const subject = config.categories.subject.find(subject => subject.name == interaction.customId);

      // Check if categories exist
      if (!config.categories.answeredCategoryId) {
        interaction.guild.channels.create(config.categories.answeredCategoryName, {
          type: "GUILD_CATEGORY",
        }).then(async (channel) => {
          config.categories.answeredCategoryId = channel.id;
          await configurationSchema.findByIdAndUpdate(config._id, {
            ...config,
          });
        })
      }

      // Check if categories exist.
      if (!config.categories.unansweredCategoryId) {
        interaction.guild.channels.create(config.categories.unansweredCategoryName, {
          type: "GUILD_CATEGORY",
        }).then(async (channel) => {
          config.categories.unansweredCategoryId = channel.id;
          await configurationSchema.findByIdAndUpdate(config._id, {
            ...config,
          });
        })
      }
      
      timeout(0.5)

      interaction.guild.channels.create(convertPlaceholders(subject!!.ticketName, interaction.guild, interaction.member, subject!!) as string, {
        type: "GUILD_TEXT",
        parent: config.categories.unansweredCategoryId,
        permissionOverwrites: [
          {
            id: interaction.user.id,
            allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
          }
          // Add permissions for staff roles
        ]
      }).then(async (channel) => {
        const embed = openMessageEmbedBuilder();
        const buttons = await getSubjectButtons(interaction.guildId);

        channel.send({ embeds: [embed], components: [buttons] });
      })
    
    }// IF OTHER
  },
});
