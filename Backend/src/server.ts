import express, { Application } from 'express';
import { UserRouter } from './routers/UserRouter';
import { AppDataSource } from './config/data-source'; 
import * as dotenv from 'dotenv'; 
import cors from 'cors';


const app: Application = express();  // Tipando 'app' como 'Application'
const PORT: number = 3000;  // Tipagem da porta como número


// Carregando variáveis de ambiente do arquivo .env
dotenv.config();


// Middleware para permitir que o Express interprete JSON
app.use(express.json());

app.use(cors());


// Configurando a rota base para os usuários
app.use('/api', UserRouter);


// Inicializando a conexão com o banco de dados
AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');

    // Iniciando o servidor
    app.listen(PORT, (): void => {
      console.log(`🔥 Servidor rodando em http://localhost:${PORT}`);
    });

  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });