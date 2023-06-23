import { Router } from 'express';
import { Routes } from '../interfaces/routes.interface';
import FoodController from '../contollers/food.controller';

class FoodRoute implements Routes {
  public path = '/food';
  public router = Router();
  public foodController = new FoodController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // GET data to populate a politician's dashboard.
    this.router.get(`${this.path}/add`, this.foodController.addFood);
    this.router.get(`${this.path}/delete`, this.foodController.deleteFood);


  }
}

export default FoodRoute;
