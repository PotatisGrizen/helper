import mongoose, { Model, Schema, SchemaDefinition } from "mongoose";
import { setFlagsFromString } from "v8";
import { threadId } from "worker_threads";
import { subject } from "../../types/guildConfigTypes";

const schema = new Schema({
  guildId: String,
  enabled: Boolean,
  premiumTime: Number,
  language: String,
  automation: {
    autoClose: {
      bumpTime: Number,
      closeTime: Number,
      timeUnit: String,
    },
    autoTag: Boolean,
    autoTagStaff: Boolean,
    closeTicketOnLeave: Boolean,
    closeTime: Number,
    changeStateWhenStaffMentionStaff: Boolean,
  },
  buttons: {
    close: {
      style: String,
      text: String,
      emoji: {
        name: String,
        id: String,
        animated: Boolean,
      },
      link: String,
      disabled: Boolean,
    },
    claim: {
      style: String,
      text: String,
      emoji: {
        name: String,
        id: String,
        animated: Boolean,
      },
      link: String,
      disabled: Boolean,
    },
    confirmClose: {
      style: String,
      text: String,
      emoji: {
        name: String,
        id: String,
        animated: Boolean,
      },
      link: String,
      disabled: Boolean,
    },
    cancelClose: {
      style: String,
      text: String,
      emoji: {
        name: String,
        id: String,
        animated: Boolean,
      },
      link: String,
      disabled: Boolean,
    },
  },
  logging: {
    channelId: String,
    webhook: String,
    ticketClaimed: Boolean,
    ticketCreated: Boolean,
    ticketDeleted: Boolean,
    ticketMemberAdded: Boolean,
    ticketMemberRemoved: Boolean,
    ticketSubjectChanged: Boolean,
  },
  ticketLimitation: {
    neededCloseRole: String,
    globalMax: Number,
    perUser: Number,
    perSubject: Number,
    globalCooldownTime: Number,
    subjectCooldownTime: Number,
    cooldownFormat: String,
  },
  whitelist: {
    roles: {
      snowflakes: {
        type: Array<String>(),
      },
      inverted: Boolean,
    },
    channels: {
      snowflakes: {
        type: Array<String>(),
      },
      inverted: Boolean,
    },
  },
  categories: {
    answeredTickets: Array<String>(),
    unansweredTickets: Array<String>(),
    subject: Array<subject>(),
    answeredCategoryName: String,
    unansweredCategoryName: String,
    answeredCategoryId: String,
    unansweredCategoryId: String,
  },
  flags: {
    partner: Boolean,
  },
});

export default mongoose.model("configuration", schema);
