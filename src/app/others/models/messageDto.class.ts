export class MessageDTO {

    constructor(public id: number, public userSenderId: number, public userReceiverId: number, public messageContent: string, public timeCreated: string) {
        
    }

}