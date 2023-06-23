import { NextFunction, Request, Response } from 'express';
// import { HttpException } from '@exceptions/HttpException';
import ActivitiesService from '../services/activities.service';

class ActivitiesController {
  public activitiesService = new ActivitiesService();


  public addActivity = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const name: string | undefined = req.query.name?.toString();
        const category: string | undefined = req.query.category?.toString();
        const description: string | undefined = req.query.description?.toString();
        const activityData = await this.activitiesService.addActivity(name, category, description);
        res.status(200).json(activityData);
    } catch (error) {
      next(error);
    }
  };

  public updateActivity = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const name: string | undefined = req.query.name?.toString();
        const completed: boolean | undefined = (req.query.completed?.toString() == "true");
        const userData = await this.activitiesService.updateActivity(name, Boolean(completed));
        res.status(200).json(userData);
    } catch (error) {
      next(error);
    }
  };

  public deleteActivity = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const activity_id: number | undefined = Number(req.query.activity_id);
        const userData = await this.activitiesService.deleteActivity(activity_id);
        res.status(200).json(userData);
    } catch (error) {
      next(error);
    }
  };

}

export default ActivitiesController;
