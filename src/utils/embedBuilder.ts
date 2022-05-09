import { MessageEmbed, MessageEmbedOptions } from "discord.js"
import { panelLang } from "../lang/defaultLang"

const openMessageEmbed = {
  color: "GREEN",
  title: 'Ticket information',
  description: 'Please explain what you need help with.',
  footer: {
    text: 'Helper Support',
  }
}

export function openMessageEmbedBuilder(options?: MessageEmbedOptions) {
  return new MessageEmbed({
    ...openMessageEmbed,
    ...options
  } as MessageEmbedOptions) 
}

const panelEmbed = {
  color: "GREEN",
  title: panelLang.title,
  description: panelLang.description,
  footer: {
    text: panelLang.footer,
  }
}

export function panelEmbedBuilder(options?: MessageEmbedOptions) {
  return new MessageEmbed({
    ...panelEmbed,
    ...options
  } as MessageEmbedOptions)
}