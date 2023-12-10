import { Router } from "express";
import * as Yup from 'yup';

import { timeStampGen, validateData } from '../global-helper';
import { getServers } from "./helpers/data-get";
import { createServer } from "./helpers/data-mutt";


const router = Router();

router.get('/', async (req, res) => {
    const servers = await getServers();

    if (!servers) {
        return res.status(500).json('Server error, please try again later')
    }

    return res.status(200).json(servers)
});

router.post('/create', async (req, res) => {
    const {id, server_name, server_host, server_port, server_username, server_password, server_note} = req.body
    const server = await createServer(id, server_name, server_host, server_port, server_username, server_password, server_note);

    if (!server) {
        return res.status(500).json('Server error, please try again later')
    }

    return res.status(200).json(server)
});

export default router;