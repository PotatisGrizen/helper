export type subject = {
  messages: {
    openMessage: string;
    closeMessage: string;
  };
  staffRoles: Array<string>;
  name: string;
  ticketName: string;
  mentionStaffOnCreation: boolean;
};

export type panelButton = {
  button: {
    emoji: {
      name: string;
      id: string;
      animated: boolean;
    };
    style: string;
    text: string;
  };
  subject: string;
};


export interface panel {
    buttons: Array<panelButton>,
    channelId: string,
    guildId: string,
    message: string,
    messageId: string,
}

export interface guildConfig {
  _id: any,
  guildId: string,
  enabled: Boolean,
  premiumTime: number,
  language: string,
  automation: {
    autoClose: {
      bumpTime: number,
      closeTime: number,
      timeUnit: string,
    },
    autoTag: Boolean,
    autoTagStaff: Boolean,
    closeTicketOnLeave: Boolean,
    closeTime: number,
    changeStateWhenStaffMentionStaff: Boolean,
  },
  buttons: {
    close: {
      style: string,
      text: string,
      emoji: {
        name: string,
        id: string,
        animated: Boolean,
      },
      link: string,
      disabled: Boolean,
    },
    claim: {
      style: string,
      text: string,
      emoji: {
        name: string,
        id: string,
        animated: Boolean,
      },
      link: string,
      disabled: Boolean,
    },
    confirmClose: {
      style: string,
      text: string,
      emoji: {
        name: string,
        id: string,
        animated: Boolean,
      },
      link: string,
      disabled: Boolean,
    },
    cancelClose: {
      style: string,
      text: string,
      emoji: {
        name: string,
        id: string,
        animated: Boolean,
      },
      link: string,
      disabled: Boolean,
    },
  },
  logging: {
    channelId: string,
    webhook: string,
    ticketClaimed: Boolean,
    ticketCreated: Boolean,
    ticketDeleted: Boolean,
    ticketMemberAdded: Boolean,
    ticketMemberRemoved: Boolean,
    ticketSubjectChanged: Boolean,
  },
  ticketLimitation: {
    neededCloseRole: string,
    globalMax: number,
    perUser: number,
    perSubject: number,
    globalCooldownTime: number,
    subjectCooldownTime: number,
    cooldownFormat: string,
  },
  whitelist: {
    roles: {
      snowflakes: {
        type: Array<string>,
      },
      inverted: Boolean,
    },
    channels: {
      snowflakes: {
        type: Array<string>,
      },
      inverted: Boolean,
    },
  },
  categories: {
    answeredTickets: Array<string>,
    unansweredTickets: Array<string>,
    subject: Array<subject>,
    answeredCategoryName: string,
    unansweredCategoryName: string,
    answeredCategoryId: string,
    unansweredCategoryId: string,
  },
  flags: {
    partner: Boolean,
  },
}