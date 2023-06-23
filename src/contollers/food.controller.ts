import { NextFunction, Request, Response } from 'express';
// import { HttpException } from '@exceptions/HttpException';
import FoodService from '../services/food.service';

class FoodController {
  public foodService = new FoodService();


  public addFood = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const name: string | undefined = req.query.name?.toString();
        const date: Date | undefined = new Date();
        const calories: number | undefined = Number(req.query.calories);
        const protein: number | undefined = Number(req.query.protein);
        const fat: number | undefined = Number(req.query.fat);
        const carbs: number | undefined = Number(req.query.carbs);
        const addFoodData = await this.foodService.addFood(name, date, calories, protein, fat, carbs);
        res.status(200).json(addFoodData);
    } catch (error) {
      next(error);
    }
  };

  public deleteFood = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const name: string | undefined = req.query.name?.toString();
        const userData = await this.foodService.deleteFood(name);
        res.status(200).json(userData);
    } catch (error) {
      next(error);
    }
  };
}

export default FoodController;
