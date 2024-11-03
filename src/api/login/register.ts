import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import User from '../models/userModel';
import dotenv from 'dotenv';

dotenv.config();

export default async function registerHandler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ msg: "Método não permitido" });
    }

    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password || !confirmPassword) {
        return res.status(422).json({ msg: "Insira todos os dados!" });
    }

    if (password !== confirmPassword) {
        return res.status(422).json({ msg: "As senhas não conferem!" });
    }

    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(422).json({ msg: "Usuário já cadastrado!" });
        }

        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);

        const user = new User({
            name,
            email,
            password: passwordHash,
        });

        const newUser = await user.save();
        return res.status(201).json({ user: newUser, msg: "Usuário cadastrado com sucesso!" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Erro ao cadastrar usuário!", error });
    }
}
