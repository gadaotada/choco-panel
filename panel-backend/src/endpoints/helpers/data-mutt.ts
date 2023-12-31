import type { RowDataPacket, ResultSetHeader } from 'mysql2';

import pool from "../../database/connection";
import { timeStampGen } from '../../global-helper';
import type { User } from "../../types";

export const handleUser = async (id: number, username: string, password: string, note: string | null, role: 'choco-admin' | 'choco-user'): Promise<boolean | null> => {

    const poolConn = await pool.getConnection();
    try {
        const query = 'INSERT ON DUBLICAT KEY UPDATE'

        const [rows] = await poolConn.execute<ResultSetHeader>(query, [id, username, password, note, role]);

        return rows.affectedRows >= 1;
        
    } catch (error) {
        console.error(`${timeStampGen()} Error generated by func handleUser at /src/endpoints/helpers/data-mutt.ts: ${error}`)
        return null
    } finally {
        poolConn.release();
    };
}

export const createServer = async (
    id: number, 
    server_name: string,
    server_host: string, 
    server_port: number, 
    server_username: string, 
    server_password: string, 
    server_note: string
    ) : Promise <number | null> => {

    const poolConn = await pool.getConnection();
    try {
        const query = `INSERT INTO servers (server_name, server_host, server_port, server_username, server_password, server_note)
                                            VALUES(?, ?, ?, ?, ?, ?)
        `

        const [rows] = await poolConn.execute<ResultSetHeader>(query, [server_name, server_host, server_port, server_username, server_password, server_note]);

        return rows.insertId
        
    } catch (error) {
        console.error(`${timeStampGen()} Error generated by func createServer at /src/endpoints/helpers/data-mutt.ts: ${error}`)
        return null
    } finally {
        poolConn.release();
    };
}