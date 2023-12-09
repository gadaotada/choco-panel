import { Client, ConnectConfig, ClientChannel } from 'ssh2';

const conn: Client = new Client();

const sshConfig: ConnectConfig = {
    // Replace these with your server's details
    host: 'YOUR_SERVER_IP',
    port: 22, // Default SSH port
    username: 'YOUR_USERNAME',
    password: 'YOUR_PASSWORD' // For password-based authentication
    // If you're using a private key
    // privateKey: require('fs').readFileSync('/path/to/private/key')
};

conn.on('ready', () => {
    console.log('SSH Client :: ready');
    conn.exec('uptime', (err: Error | undefined, stream: ClientChannel | undefined) => {
        if (err) {
            throw err;
        }
        if (stream) {
            stream.on('close', (code: number, signal: string) => {
                console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
                conn.end();
            }).on('data', (data: Buffer) => {
                console.log('STDOUT: ' + data.toString());
            }).stderr.on('data', (data: Buffer) => {
                console.log('STDERR: ' + data.toString());
            });
        }
    });
}).connect(sshConfig);
