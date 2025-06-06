import { Request, Response } from 'express';
import User from '../../database/models/User';

const updateUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, email } = req.body;

        if (!id) {
            return res.status(400).json({ message: "ID do usuário é obrigatório na URL." });
        }

        // Buscar o usuário no banco pelo ID:
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado." });
        }

        // Atualizar apenas os campos enviados:
        if (name !== undefined) user.name = name;
        if (email !== undefined) user.email = email;

        // Salvar as alterações no banco:
        await user.save();
        return res.status(200).json({ message: "Usuário atualizado com sucesso.", user });
        
    } catch (error) {
        return res.status(500).json({ message: "Erro interno do servidor." });
    }
};

export default updateUser;
