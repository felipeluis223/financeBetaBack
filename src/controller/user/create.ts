import { Request, Response } from "express";
import User from "../../database/models/User";

const createUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;

        // Verifica se o e-mail já está cadastrado
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ message: "Usuário já cadastrado com este e-mail." });
        }

        // Cria um novo usuário
        const newUser = await User.create({ name, email, password });
        return res.status(201).json(newUser);
    } catch (error) {
        return res.status(500).json({ message: "Falha! Verifique suas informações e tente novamente." });
    }
};

export default createUser;
