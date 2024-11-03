import { NextApiRequest, NextApiResponse } from 'next';
import * as userController from '../../src/api/controllers/userController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET':
            await userController.getUsers(req, res);
            break;
        case 'POST':
            await userController.createUser(req, res);
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
