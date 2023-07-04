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
    this.router.post(`${this.path}register`, this.userController.register);
    this.router.post(`${this.path}login`, this.userController.login);
    this.router.post(`${this.path}logout`, this.userController.logout);
    this.router.post(`${this.path}refresh_token`, this.userController.getAccessToken);

    


  }
}

export default UserRoute;
