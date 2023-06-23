import { NextFunction, Request, Response } from 'express';
// import { HttpException } from '@exceptions/HttpException';
import WeightService from '../services/weight.service';

class WeightController {
  public weightService = new WeightService();


  public addWeight = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const weight: number | undefined = Number(req.query.weight);
        const date: Date | undefined = new Date();
        const weightData = await this.weightService.addWeight(weight, date);
        res.status(200).json(weightData);
    } catch (error) {
      next(error);
    }
  };

  public updateWeight = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const id: number | undefined = Number(req.query.id);
        const weight: number | undefined = Number(req.query.weight);
        const date: Date | undefined = new Date();
        const weightData = await this.weightService.updateWeight(id, weight, date);
        res.status(200).json(weightData);
    } catch (error) {
      next(error);
    }
  };
}

export default WeightController;
