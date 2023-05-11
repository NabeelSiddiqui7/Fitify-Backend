import { Router } from 'express';
import { Routes } from '../interfaces/routes.interface';
import UserController from '../contollers/users.controller';

class UserRoute implements Routes {
  public path = '/';
  public router = Router();
  public userController = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // GET data to populate a politician's dashboard.
    this.router.get(`${this.path}`, this.userController.getUserData);


  }
}

export default UserRoute;
