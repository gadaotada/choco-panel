export type User = {
    id : number;
    name : string;
    role: 'choco-admin' | 'choco-user'
    note?: string;
}
