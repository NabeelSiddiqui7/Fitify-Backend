import { Routes } from './src/interfaces/routes.interface';
import cors from 'cors';
import express from 'express';
const cookieParser = require('cookie-parser');
class App {
  public app: express.Application;
  public port: string | number;
  public env: string;
//   public db: PrismaClient;

  constructor(routes: Routes[]) {
    this.app = express();
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(cookieParser());
    // CORS implemented so that we don't get errors when trying to access the server from a different server location
    this.app.use(cors({
      origin: 'http://localhost:3000',
      credentials: true,
    }));

    this.port = process.env.PORT || 5000;
    this.env = process.env.NODE_ENV || 'development';

    this.initializeRoutes(routes);
  }

  public listen() {
    this.app.listen(this.port, () => {
    //   logger.info(`=================================`);
    //   logger.info(`======= ENV: ${this.env} ========`);
    //   logger.info(`🚀 App listening on the port ${this.port}`);
    //   logger.info(`=================================`);
    console.log("Running");
    });
  }

  public getServer() {
    return this.app;
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach((route) => {
      this.app.use('/', route.router);
    });
  }
}

export default App;
