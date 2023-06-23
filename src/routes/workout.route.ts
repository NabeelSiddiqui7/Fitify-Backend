import { Router } from 'express';
import { Routes } from '../interfaces/routes.interface';
import WorkoutController from '../contollers/workout.controller';

class WorkoutRoute implements Routes {
  public path = '/workout';
  public router = Router();
  public workoutController = new WorkoutController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/add`, this.workoutController.addWorkout);
    this.router.get(`${this.path}/delete`, this.workoutController.deleteWorkout);


  }
}

export default WorkoutRoute;
