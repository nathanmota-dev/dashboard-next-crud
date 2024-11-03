import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import dotenv from 'dotenv';

dotenv.config();

interface AuthenticatedNextApiRequest extends NextApiRequest {
    user?: string | jwt.JwtPayload;
}

const authenticate = (handler: (req: AuthenticatedNextApiRequest, res: NextApiResponse) => void) => {
    return async (req: AuthenticatedNextApiRequest, res: NextApiResponse) => {
        const tokenHeader = req.headers.authorization;

        if (!tokenHeader) {
            return res.status(401).json({ msg: "Acesso negado! Nenhum token fornecido." });
        }

        const token = tokenHeader.replace('Bearer ', '');

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET || "");
            req.user = decoded;
            return handler(req, res);  // Chamamos o handler apenas se o token for válido
        } catch (error) {
            return res.status(401).json({ msg: "Token inválido." });
        }
    };
};

export default authenticate;
