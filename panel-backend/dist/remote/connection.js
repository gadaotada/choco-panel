"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.megaTestaBate = void 0;
const ssh2_1 = require("ssh2");
const conn = new ssh2_1.Client();
const sshConfig = {
    // Replace these with your server's details
    host: '37.27.8.118',
    port: 22, // Default SSH port
    username: 'gogo',
    password: 'miroslav922' // For password-based authentication
    // If you're using a private key
    // privateKey: require('fs').readFileSync('/path/to/private/key')
};
function megaTestaBate() {
    conn.on('ready', () => {
        console.log('SSH Client :: ready');
        conn.exec('uptime', (err, stream) => {
            if (err) {
                throw err;
            }
            if (stream) {
                stream.on('close', (code, signal) => {
                    console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
                    conn.end();
                }).on('data', (data) => {
                    console.log('STDOUT: ' + data.toString());
                }).stderr.on('data', (data) => {
                    console.log('STDERR: ' + data.toString());
                });
            }
        });
    }).connect(sshConfig);
}
exports.megaTestaBate = megaTestaBate;
