import { Request, Response, NextFunction } from 'express';

const apiKey = process.env.API_FRONT_KEY
const adminKey = process.env.API_FRONT_KEY

export async function validateSecretHeader(req: Request, res: Response, next: NextFunction) {
    const secretHeader = req.get('choco-auth-key');

    if (!secretHeader) {
        return res.status(401).send('Unauthorized'); 
    }

    if (!apiKey) {
        return res.status(500).send('Issue with auth server, please try again later')
    }

    if (apiKey && secretHeader !== apiKey) {
        return res.status(401).send('Unauthorized');
    }

    next();
}

export async function validateAdminHeader(req: Request, res: Response, next: NextFunction) {
    const adminHeader = req.get('choco-admin-key');

    if (!adminHeader) {
        return res.status(401).send('Unauthorized'); 
    }

    if (!adminKey) {
        return res.status(500).send('Issue with auth server, please try again later')
    }

    if (adminKey && adminHeader !== adminKey) {
        return res.status(401).send('Unauthorized');
    }

    next();
}