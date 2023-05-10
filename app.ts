// const express = require('express');
// const cors = require('cors');
// const knex = require('knex');
// require('dotenv').config();

// const db = knex({
//     client: 'pg',
//     connection: {
//         host: process.env.DATABASE_HOST,
//         user: process.env.DATABASE_USERNAME,
//         password: process.env.DATABASE_PASSWORD,
//         database: process.env.DATABASE,
//     },
// });
// const app = express();
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());
// // CORS implemented so that we don't get errors when trying to access the server from a different server location
// app.use(cors());
// // GET: Fetch all movies from the database
// app.get('/', (req, res) => {
//     db.select('*')
//         .from('users')
//         .then((data) => {
//             console.log(data);
//             res.json(data);
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// });
// const port = process.env.PORT || 5000;
// app.listen(port, () => console.log(`Server running on port ${port}, http://localhost:${port}`));

// import '@/index';
import { Routes } from './src/interfaces/routes.interface';
import cors from 'cors';
import express from 'express';
class App {
  public app: express.Application;
  public port: string | number;
  public env: string;
//   public db: PrismaClient;

  constructor(routes: Routes[]) {
    this.app = express();
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(express.json());
    // CORS implemented so that we don't get errors when trying to access the server from a different server location
    this.app.use(cors());

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
