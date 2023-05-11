import { Router } from 'express';
import { Routes } from '../interfaces/routes.interface';
import ActivitiesController from '../contollers/activities.controller';

class ActivitiesRoute implements Routes {
  public path = '/activities';
  public router = Router();
  public activitiesController = new ActivitiesController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // GET data to populate a politician's dashboard.
    this.router.get(`${this.path}`, this.activitiesController.addActivity);
    this.router.get(`${this.path}/update`, this.activitiesController.updateActivity);
    this.router.get(`${this.path}/delete`, this.activitiesController.deleteActivity);


  }
}

export default ActivitiesRoute;
