import { MongooseOptions } from "../types/types";
import mongoose, { ConnectOptions } from 'mongoose'

import { config_ as config } from "../configs/config-handler";

export class Database {
    constructor(private readonly options?: ConnectOptions) {}

    async connect() {
        mongoose.connect(config.mongoURI, {
            ...this.options
        });
    }
}