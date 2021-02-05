export class UserCredentials {
    username: string;
    password: string;
}

export class User extends UserCredentials {
    id: string;
    authdata?: string;
}