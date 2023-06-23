import { Router } from 'express';
import { Routes } from '../interfaces/routes.interface';
import WeightController from '../contollers/weight.controller';

class WeightRoute implements Routes {
  public path = '/weight';
  public router = Router();
  public weightController = new WeightController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // GET data to populate a politician's dashboard.
    this.router.get(`${this.path}/add`, this.weightController.addWeight);
    this.router.get(`${this.path}/update`, this.weightController.updateWeight);


  }
}

export default WeightRoute;
