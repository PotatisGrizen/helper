import { MessageActionRow, MessageButton, MessageButtonOptions } from "discord.js";
import configurationSchema from "../db/schemas/configuration.schema";
import { guildConfig } from "../types/guildConfigTypes";

export async function getSubjectButtons(guildId: string) {
  const guildConfig: guildConfig = await configurationSchema.findOne({ guildId: guildId }) as guildConfig;

  if (!guildConfig) return new MessageActionRow();

  const buttons = new MessageActionRow()

  if (!guildConfig.buttons.close.disabled) {
    buttons.addComponents(new MessageButton({
      customId: "close",
      label: guildConfig.buttons.close.text,
      emoji: guildConfig.buttons.close.emoji.name,
      type: 'BUTTON',
      style: guildConfig.buttons.close.style,
    } as MessageButtonOptions))
  }

  if (!guildConfig.buttons.claim.disabled) {
    buttons.addComponents(new MessageButton({
      customId: "claim",
      label: guildConfig.buttons.claim.text,
      emoji: guildConfig.buttons.claim.emoji.name,
      type: 'BUTTON',
      style: guildConfig.buttons.claim.style,
    } as MessageButtonOptions))
  }

  // if (!guildConfig.buttons.confirmClose.disabled) {
  //   buttons.addComponents(new MessageButton({
  //     customId: "confirmClose",
  //     label: guildConfig.buttons.confirmClose.text,
  //     emoji: guildConfig.buttons.confirmClose.emoji.name,
  //     type: 'BUTTON',
  //     style: guildConfig.buttons.confirmClose.style,
  //   } as MessageButtonOptions))
  // }

  // if (!guildConfig.buttons.cancelClose.disabled) {
  //   buttons.addComponents(new MessageButton({
  //     customId: "cancelClose",
  //     label: guildConfig.buttons.cancelClose.text,
  //     emoji: guildConfig.buttons.cancelClose.emoji.name,
  //     type: 'BUTTON',
  //     style: guildConfig.buttons.cancelClose.style,
  //   } as MessageButtonOptions))
  // }

  return buttons;
}