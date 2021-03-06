import { Intents } from "discord.js";
import "dotenv/config";

import { Bot } from "./structures/Bot";
import { Database } from "./structures/Database";

export const bot = new Bot({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_PRESENCES,
  ],
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
});

export const database = new Database(bot);

database.connect();

bot.start();
