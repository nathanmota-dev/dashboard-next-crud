import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import User from '../../src/api/models/userModel';
import { connectToDB } from '../../src/api/database/db';

export default async function profileHandler(req: NextApiRequest, res: NextApiResponse) {
    await connectToDB();

    if (req.method !== 'GET') {
        return res.status(405).json({ msg: "Método não permitido" });
    }

    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ msg: "Token não fornecido" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "") as { id: string };

        const user = await User.findById(decoded.id).select('name');
        if (!user) {
            return res.status(404).json({ msg: "Usuário não encontrado" });
        }

        res.status(200).json({ name: user.name });
    } catch (error) {
        res.status(401).json({ msg: "Token inválido" });
    }
}