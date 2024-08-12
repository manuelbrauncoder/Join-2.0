export class User{
    id: string;
    name: string;
    email: string;
    password: string;
    phone: string;
    color: string;

    constructor(obj?: Partial<User>){
        this.id = obj?.id ?? '';
        this.name = obj?.name ?? '';
        this.email = obj?.email ?? '';
        this.password = obj?.password ?? '';
        this.phone = obj?.phone ?? '';
        this.color = obj?.color ?? '#9747FF';
    }
}

export class LetterGroup{
    letter: string;
    users: User[];

    constructor(obj?: Partial<LetterGroup>){
        this.letter = obj?.letter ?? '';
        this.users = obj?.users ?? [];
    }
}