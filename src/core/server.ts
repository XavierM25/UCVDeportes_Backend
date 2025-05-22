import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import sequelize from './database';
import authRoutes from '../routes/auth.routes';
//import proveedoresRoutes from '../routes/proveedoresRoutes';

class Server {
  private app: Application;
  private port: string;

  private apiPaths = {
    auth: '/api/auth',
    //proveedores: '/proveedores',

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
    this.app.use(this.apiPaths.auth, authRoutes);
    //this.app.use(this.apiPaths.proveedores, proveedoresRoutes);
    this.app.get('/api/ping', (req, res) => {
      console.log("✅ Frontend hizo ping al backend");
      res.json({ message: "Backend activo y respondiendo" });
    });
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