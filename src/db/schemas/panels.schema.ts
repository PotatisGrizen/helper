import { model, Schema } from "mongoose";
import { panelButton } from "../../types/guildConfigTypes";

const schema = new Schema({
  buttons: Array<panelButton>(),
  channelId: String,
  guildId: String,
  message: String,
  messageId: String,
});

export default model("Panels", schema);
