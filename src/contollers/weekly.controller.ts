import { NextFunction, Request, Response } from 'express';
// import { HttpException } from '@exceptions/HttpException';
import WeeklyService from '../services/weekly.service';

class WeeklyController {
  public weeklyService = new WeeklyService();


  public addSteps = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const steps: number | undefined = Number(req.query.steps);
        const date: Date | undefined = new Date();
        const stepsData = await this.weeklyService.addSteps(steps, date);
        res.status(200).json(stepsData);
    } catch (error) {
      next(error);
    }
  };

  public addCalories = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const calories: number | undefined = Number(req.query.calories);
      const date: Date | undefined = new Date();
      const caloriesData = await this.weeklyService.addCalories(calories, date);
      res.status(200).json(calories);
    } catch (error) {
      next(error);
    }
  };
}

export default WeeklyController;
