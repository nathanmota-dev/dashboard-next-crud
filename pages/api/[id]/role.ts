import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDB } from '../../../src/api/database/db';
import User from '../../../src/api/models/userModel';

export default async function updateRoleHandler(req: NextApiRequest, res: NextApiResponse) {
    await connectToDB();

    if (req.method !== 'PUT') {
        return res.status(405).json({ msg: "Método não permitido" });
    }

    const { id } = req.query; 
    const { role } = req.body; 

    if (!role) {
        return res.status(400).json({ msg: "Role é obrigatória" });
    }

    try {
        const user = await User.findByIdAndUpdate(id, { role }, { new: true });
        if (!user) {
            return res.status(404).json({ msg: "Usuário não encontrado" });
        }

        res.status(200).json({ msg: "Role atualizada com sucesso", user });
    } catch (error) {
        res.status(500).json({ msg: "Erro ao atualizar role", error });
    }
}
