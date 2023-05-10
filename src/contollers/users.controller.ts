import { NextFunction, Request, Response } from 'express';
// import { HttpException } from '@exceptions/HttpException';
import IndustryService from '../services/users.service';

class UserController {
  public IndustryService = new IndustryService();


  public getIndustries = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const sortField: string | undefined = req.query.sortField?.toString();
      const order: string | undefined = req.query.order?.toString();
      const userData = await this.IndustryService.getIndustryData(sortField, order);
      res.status(200).json(userData);
    } catch (error) {
      next(error);
    }
  };

}

export default UserController;
