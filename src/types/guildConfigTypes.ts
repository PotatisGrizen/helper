export type subject = {
    messages: {
        openMessage: String,
        closeMessage: String
    },
    staffRoles: Array<String>,
    name: string,
    ticketName: string,
    mentionStaffOnCreation: boolean,
}