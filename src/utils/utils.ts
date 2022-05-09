import { CommandInteraction, Guild, GuildMember, Interaction } from "discord.js";
import { subject } from "../types/guildConfigTypes";

export const timeout = (seconds: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(undefined);
    }, seconds * 1000);
  });
};


export const convertPlaceholders = (string: String, guild: Guild, member: GuildMember, subject: subject) => {
  return string.replace(/{guild.name}/g, guild.name)
    .replace(/{guild.id}/g, guild.id)
    .replace(/{user.username}/g, member.user.username)
    .replace(/{user.mention}/g, member.user.tag)
    .replace(/{user.discriminator}/g, member.user.discriminator)
    .replace(/{subject.subject}/g, subject.name);
}