import { NextFunction, Request, Response } from 'express';
// import { HttpException } from '@exceptions/HttpException';
import UserService from '../services/users.service';

class UserController {
  public UserService = new UserService();


  public getUserData = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData = await this.UserService.getUserData();
      res.status(200).json(userData);
    } catch (error) {
      next(error);
    }
  };

}

export default UserController;
