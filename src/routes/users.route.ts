import { Router } from 'express';
import { Routes } from '../interfaces/routes.interface';
import IndustryController from '../contollers/users.controller';

class UserRoute implements Routes {
  public path = '/';
  public router = Router();
  public recController = new IndustryController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // GET data to populate a politician's dashboard.
    this.router.get(`${this.path}`, this.recController.getIndustries);


  }
}

export default UserRoute;
