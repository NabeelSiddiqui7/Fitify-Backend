import { Router } from 'express';
import { Routes } from '../interfaces/routes.interface';
import WeeklyController from '../contollers/weekly.controller';

class WeeklyRoute implements Routes {
  public stepsPath = '/weekly/steps';
  public caloriesPath = '/weekly/calories';
  public router = Router();
  public weeklyController = new WeeklyController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // GET data to populate a politician's dashboard.
    this.router.get(`${this.stepsPath}/add`, this.weeklyController.addSteps);
    this.router.get(`${this.caloriesPath}/add`, this.weeklyController.addCalories);


  }
}

export default WeeklyRoute;
