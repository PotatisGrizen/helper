import { MongooseOptions } from "../types/types";
import mongoose, { ConnectOptions } from "mongoose";

import { config_ as config } from "../configs/config-handler";
import { Bot } from "./Bot";

export class Database {
  constructor(
    private readonly client: Bot,
    private readonly options?: ConnectOptions
  ) {}

  async connect() {
    mongoose
      .connect(config.mongoURI, {
        ...this.options,
      })
      .then(() => {
        this.client.logger.console.info(
          `Connected to database ${config.mongoURI}`
        );
      })
      .catch((err) => {
        this.client.logger.console.error(
          `Failed to connect to database ${config.mongoURI}`
        );
        this.client.logger.console.error(err);
      });
  }
}
