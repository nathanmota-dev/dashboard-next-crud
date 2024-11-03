import { NextApiRequest, NextApiResponse } from 'next';
import * as userController from '../../src/api/controllers/userController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;

    if (!id || typeof id !== 'string') {
        return res.status(400).json({ msg: "ID inválido" });
    }

    switch (req.method) {
        case 'GET':
            await userController.getUserById(req, res);
            break;
        case 'PUT':
            req.body.id = id;
            await userController.updateUser(req, res);
            break;
        case 'DELETE':
            req.query.id = id;
            await userController.deleteUser(req, res);
            break;
        default:
            res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
