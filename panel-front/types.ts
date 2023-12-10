export type User = {
    id : number;
    name : string;
    role: 'choco-admin' | 'choco-user';
    note?: string;
}

export type Server = {
    id: number;
    server_name: string;
    server_host: string;
    server_port: number;
    server_username: string;
    server_password: string;
    server_note?: string;
}
