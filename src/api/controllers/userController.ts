import { NextApiRequest, NextApiResponse } from 'next';
import * as userService from '../services/userService';

export const createUser = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const user = await userService.createUser(req.body);
        res.status(201).json({ user, msg: "Usuário cadastrado com sucesso!" });
    } catch (error) {
        res.status(500).json({ msg: "Erro ao cadastrar usuário", error });
    }
};

export const getUsers = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ msg: "Erro ao buscar usuários", error });
    }
};

export const getUserById = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const user = await userService.getUserById(req.query.id as string);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ msg: "Erro ao buscar usuário", error });
    }
}

export const updateUser = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const user = await userService.updateUser(req.query.id as string, req.body);
        res.status(200).json({ user, msg: "Usuário atualizado com sucesso!" });
    } catch (error) {
        res.status(500).json({ msg: "Erro ao atualizar usuário", error });
    }
}

export const deleteUser = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        await userService.deleteUser(req.query.id as string);
        res.status(200).json({ msg: "Usuário deletado com sucesso!" });
    } catch (error) {
        res.status(500).json({ msg: "Erro ao deletar usuário", error });
    }
}