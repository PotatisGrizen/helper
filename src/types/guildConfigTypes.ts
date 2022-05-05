export type subject = {
  messages: {
    openMessage: String;
    closeMessage: String;
  };
  staffRoles: Array<String>;
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