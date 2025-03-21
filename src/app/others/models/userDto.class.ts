export class UserDTO {

    constructor(public id: number, public firstname: string, public lastname: string, public email: string, public password: string, public authorities: {authority: string}[], public isOnline: boolean, public lastOnline: Date) {

    }

}