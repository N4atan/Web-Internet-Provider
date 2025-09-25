import { Request, Response } from "express";
import { UserRepository } from "../repositories/UserRepository";

const userRepository = new UserRepository();

export class UserController {
    // Método para criar um novo usuário
    async createUser(req: Request, res: Response): Promise<Response> {
        try {
            const { email, password } = req.body;

            if( !email || !password ) {
                return res.status(400).json({ message: 'Email e Senha São Obrigatórios!' });
            }

            const user = await userRepository.createAndSave({ email, password });

            return res.status(201).json(user);

        } catch ( error ) {
            return res.status(500).json({ message: 'Erro do servido ao tentar criar usuário: ', error });
        }
    }

    // Método para obter todos os usuários
    async getAllUsers(req: Request, res: Response): Promise<Response> {
        try {
            const users = await userRepository.findAll();
            return res.status(200).json(users);
        } catch ( error ) {
            return res.status(500).json({ message: 'Erro do servido ao tentar buscar usuários: ', error });
        }
    }

    async deleteUser(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;

            if( !id ) {
                return res.status(400).json({ message: 'ID do usuário é obrigatório!' });
            }

            const user = await userRepository.findById(Number(id));
            
            if( !user ) {
                return res.status(404).json({ message: 'Usuário não encontrado!' });
            }

            await userRepository.remove(user);

            return res.status(200).json({ message: 'Usuário deletado com sucesso!' });

        }
        catch ( error ) {
            return res.status(500).json({ message: 'Erro do servido ao tentar deletar usuário: ', error });
        }
    }
}