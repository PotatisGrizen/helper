import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, MessageActionRow, MessageButton, MessageEmbed, TextChannel } from "discord.js";
import { MessageButtonStyles } from "discord.js/typings/enums";
import panelsSchema from "../../db/schemas/panels.schema";
import { panelLang } from "../../lang/defaultLang";
import { Bot } from "../../structures/Bot";
import { panel } from "../../types/guildConfigTypes";
import { IBotCommand } from "../../types/types";
import { timeout } from "../../utils";

const command: IBotCommand = {
  name: "Send Embed",
  desc: "Send the embed with all info of creating a ticket",
  timeout: 2000,
  data: new SlashCommandBuilder()
    .setName("panel")
    .setDescription("Send the embed with all info of creating a ticket"),
  async execute(interaction: CommandInteraction<"cached">, client: Bot) {

    const panelConfig: panel = await panelsSchema.findOne({ guildId: interaction.guildId }) as panel;

    const embedData = JSON.parse(panelConfig.message);

    interaction.deferReply({ ephemeral: true})

    const embed = new MessageEmbed()
      .setTitle(embedData.title || panelLang.title)
      .setDescription(embedData.content || panelLang.description)
      .setFooter({text: embedData.footer || panelLang.footer, iconURL: embedData.footerIcon || panelLang.footerIcon || null});

    const componentData = new MessageActionRow();

      panelConfig.buttons.forEach(buttonsData => {
        const { button } = buttonsData;
        const buttonData = new MessageButton()
          .setLabel(button.text)
          .setEmoji(button.emoji.name)
          .setCustomId(buttonsData.subject)
          .setStyle(button.style as unknown as MessageButtonStyles || MessageButtonStyles.SUCCESS)
        componentData.addComponents(buttonData);
      });


    await timeout(0.5);

    const channel = await client.channels.fetch(panelConfig.channelId) as TextChannel;

    if (!channel) return;
    channel.send({ embeds: [embed], components: [ componentData ] });

    interaction.editReply({ content: "Sent the embed" });
  },
};

export default command;
