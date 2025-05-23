import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import sequelize from './database';
import Sesion from '../routes/Sesion';
import Profile from '../routes/Profile';

class Server {
  private app: Application;
  private port: string;

  private apiPaths = {
    sesion: '/sesion',
    profile: '/profile',

  };

  constructor() {
    this.app = express();
    this.port = process.env.PORT || '3000';

    this.middlewares();
    this.routes();
    this.databaseConnection();
  }


  private middlewares() {
    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(morgan("tiny"));
  }

  private routes() {
    this.app.use(this.apiPaths.sesion, Sesion);
    this.app.use(this.apiPaths.profile, Profile);    
  }

  private async databaseConnection() {
    try {
      await sequelize.authenticate();
      console.log('✅ Conexión exitosa a la base de datos');
    } catch (error) {
      console.error('Error al conectar a la base de datos:', error);
    }
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en http://localhost:${this.port}`);
    });
  }
}

export default Server;