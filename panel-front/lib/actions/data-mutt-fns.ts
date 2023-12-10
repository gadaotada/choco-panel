import axios from 'axios';

import { timeStampGen } from '@/lib/global-helper';
import type { Server } from '@/types';

const backendPoint = process.env.BACKEND_POINT || '';
const apiKey = process.env.API_FRONT_KEY || '';

export const createServer = async (serverInfo: Server) : Promise<number | null> => {
    'use server'
    try {
        const payload = serverInfo
        const res = await axios.post(`${backendPoint}/servers/create`, payload, {
            headers: {
                'choco-auth-key' : `${apiKey}`
            }
        })

        if (res.status === 200) {
            return res.data
        }

        return null
    } catch(error) {
        console.error(`${timeStampGen()} Error generated by func createServer in @/lib/actions/data-mutt-fns.ts: ${error}`)
        return null
    };
};