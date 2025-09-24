import {Router } from "express";
import { UserController } from "../controllers/UserController";


const UserRouter = Router();
const userController = new UserController();

// Rota para criar um novo usuário
UserRouter.post('/users', userController.createUser);

// Rota para obter todos os usuários
UserRouter.get('/users', userController.getAllUsers);

export { UserRouter };