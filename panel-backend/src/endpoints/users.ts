import { Router } from "express";
import * as Yup from 'yup';

import { validateAdminHeader } from '../validations';
import { validateData } from "../global-helper";
import { getUsers } from "./helpers/data-get";
import { handleUser } from './helpers/data-mutt';

const createNewUserSchema = Yup.object().shape({
    id: Yup.number().required('Id is required').max(10000, 'Max id reached, contact MVV bruh'),
    username: Yup.string().required('Name is required').min(3, 'Name has to include at least 3 characters').max(20, 'Name has to include at most 20 characters'),
    password: Yup.string().required('Password is required').min(6, 'Password has to include at least 6 characters'),
    role: Yup.string().required('Role is required').oneOf(['choco-admin', 'choco-user']),
    note: Yup.string().nullable()
});

const router = Router();

router.get('/', validateAdminHeader, async (req, res) => {
    const users = await getUsers();

    if (users) {
        return res.status(200).json(users)
    }

    return res.status(500).json('Server error, please try again later')
});

router.post('/create', validateAdminHeader, async (req, res) => {
    const { id, username, password, role, note } = req.body

    const newUser = await handleUser(id, username, password, role, note);

    const validation = validateData(createNewUserSchema, req.body)
    if (!validation.isValid) {
        return res.status(400).json(validation.error)
    }

    if (newUser) {
        return res.status(200).json('New User was created')
    } 

    return res.status(500).json('Server error, please try again later')
})

export default router;