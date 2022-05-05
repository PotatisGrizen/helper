import { subject } from "../../types/guildConfigTypes";

export const defaultGuildConfig = {
  guildId: "",
  enabled: true,
  premiumTime: 0,
  language: "ENGLISH",
  automation: {
    autoClose: {
      bumpTime: 6,
      closeTime: 3,
      timeUnit: "HOURS",
    },
    autoTag: true,
    autoTagStaff: false,
    closeTicketOnLeave: true,
    closeTime: 1800,
    changeStateWhenStaffMentionStaff: false,
  },
  buttons: {
    close: {
      style: "DANGER",
      text: "Close",
      emoji: {
        name: "🔒",
        id: "0",
        animated: false,
      },
      link: null,
      disabled: false,
    },
    claim: {
      style: "SECONDARY",
      text: "Claim",
      emoji: {
        name: "📥",
        id: "0",
        animated: false,
      },
      link: null,
      disabled: false,
    },
    confirmClose: {
      style: "DANGER",
      text: "Close now",
      emoji: {
        name: "⚠️",
        id: "0",
        animated: false,
      },
      link: null,
      disabled: false,
    },
    cancelClose: {
      style: "PRIMARY",
      text: "Cancel Close",
      emoji: {
        name: "⛔",
        id: "0",
        animated: false,
      },
      link: null,
      disabled: false,
    },
  },
  logging: {
    channelId: "",
    webhook: "", // Set this to a webhook to log to a channel
    ticketClaimed: true,
    ticketCreated: true,
    ticketDeleted: true,
    ticketMemberAdded: true,
    ticketMemberRemoved: true,
    ticketSubjectChanged: true,
  },
  ticketLimitation: {
    neededCloseRole: "TICKET_OWNER",
    globalMax: 400,
    perUser: -1,
    perSubject: 1,
    globalCooldownTime: 5,
    subjectCooldownTime: 5,
    cooldownFormat: "SECONDS",
  },
  whitelist: {
    roles: {
      snowflakes: {
        type: [],
      },
      inverted: false,
    },
    channels: {
      snowflakes: {
        type: [],
      },
      inverted: false,
    },
  },
  categories: {
    answeredTickets: [],
    unansweredTickets: [],
    subject: [
      {
        name: "Subject",
        messages: {
          openMessage: "Open",
          closeMessage: "Close",
        },
        staffRoles: [],
        ticketName: "{subject}-{author.discriminator}",
        mentionStaffOnCreation: false,
      } as subject,
    ],
    answeredCategoryName: "---  Tickets (Answered) ---",
    unansweredCategoryName: "---  Tickets (Unanswered) ---",
  },
  flags: {
    partner: false,
  },
};

export const defaultPanelConfig = {
  buttons: [
    {
      button: {
        emoji: {
          name: "❓",
          id: "0",
          animated: false,
      },
      style: "SUCCESS",
      text: "Subject",
      },
      subject: "Subject",
    }
  ],
  channelId: '',
  message: '{\"content\": \"Hello!\\n\\nPlease select a subject from the list below.\"}',
  guildId: '',
  messageId: '',
};
