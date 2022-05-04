import { IConfig } from "../types/configtypes";

const config: IConfig = {
  token: process.env.TOKEN!,

  // Use info (Won't show debug logs), or Debug (Shows EVERYTHING)
  logLevel: "debug",

  guildId: "784786918318931979",
};

export default config;
