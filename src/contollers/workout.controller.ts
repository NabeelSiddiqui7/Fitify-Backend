import { NextFunction, Request, Response } from 'express';
// import { HttpException } from '@exceptions/HttpException';
import WorkoutService from '../services/workout.service';

class WorkoutController {
  public workoutService = new WorkoutService();


  public addWorkout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const name: string | undefined = req.query.name?.toString();
        const date: Date | undefined = new Date();
        const addFoodData = await this.workoutService.addWorkout(name, date);
        res.status(200).json(addFoodData);
    } catch (error) {
      next(error);
    }
  };

  public deleteWorkout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const name: string | undefined = req.query.name?.toString();
        const userData = await this.workoutService.deleteWorkout(name);
        res.status(200).json(userData);
    } catch (error) {
      next(error);
    }
  };
}

export default WorkoutController;
