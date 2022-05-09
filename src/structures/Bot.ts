import { Client, ClientOptions, Collection } from "discord.js";
import { config_ as config } from "../configs/config-handler";
import { eventFiles } from "../files";
import Logger from "../logger/Logger";
import { IBotCommand, IBotEvent } from "../types/types";

export class Bot extends Client<true> {
  commands = new Collection<string, IBotCommand>();
  logger = new Logger({ level: config.logLevel || "info" });

  constructor(options: ClientOptions) {
    super(options);
  }

  async start() {
    await this.initModules();
    await this.login(config.token!);
  }

  private async initModules() {
    for await (const file of eventFiles) {
      const event = (await import(file)).default as IBotEvent<any>;
      if (!event) {
        this.logger.console.error(
          `File at path ${file} seems incorrectly be importing an event.`
        );
        continue;
      }

      if (event.once) this.once(event.eventName, event.run.bind(null, this));
      else this.on(event.eventName, event.run.bind(null, this));

      this.logger.console.debug(`Registered event ${event.eventName}`);
    }

    this.logger.console.info("Registring slash commands");
  }
}
