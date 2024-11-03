import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userModel';
import dotenv from 'dotenv';

dotenv.config();

export default async function loginHandler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ msg: "Método não permitido" });
    }

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(422).json({ msg: "Insira todos os dados!" });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ msg: "Usuário não encontrado!" });
        }

        const passMatch = await bcrypt.compare(password, user.password);
        if (!passMatch) {
            return res.status(401).json({ msg: "Senha não corresponde!" });
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET || "",
            { expiresIn: '1h' }
        );

        return res.status(200).json({
            msg: "Login realizado com sucesso!",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (error) {
        console.error(error);
        const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
        return res.status(500).json({
            msg: "Erro ao processar a solicitação. Tente mais tarde!",
            error: errorMessage
        });
    }
}
