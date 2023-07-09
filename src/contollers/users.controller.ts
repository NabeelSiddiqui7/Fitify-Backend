import { NextFunction, Request, Response } from 'express';
// import { HttpException } from '@exceptions/HttpException';
import UserService from '../services/users.service';

class UserController {
  public UserService = new UserService();


  public getUserData = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id: number | undefined = Number(req.query.id?.toString());
      const userData = await this.UserService.getUserData(id);
      res.status(200).json(userData);
    } catch (error) {
      next(error);
    }
  };

  public register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const email: string | undefined = req.query.email?.toString();
      const password: string | undefined = req.query.password?.toString();
      const username: string | undefined = req.query.username?.toString();
      const userData = await this.UserService.register(res, req, email, password, username);
      res.status(200).json(userData);
    } catch (error) {
      next(error);
    }
  };

  public login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const email: string | undefined = req.query.email?.toString();
      const password: string | undefined = req.query.password?.toString();
      const userData = await this.UserService.login(res, req, email, password);
      res.status(200).json(userData);
    } catch (error) {
      next(error);
    }
  };

  public logout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData = await this.UserService.logout(res, req);
      res.status(200).json(userData);
    } catch (error) {
      next(error);
    }
  };

  public getAccessToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData = await this.UserService.getAccessToken(res, req);
      res.status(200).json(userData);
    } catch (error) {
      next(error);
    }
  };

}

export default UserController;
