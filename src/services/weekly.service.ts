import express from "express";
import knex from "knex";
import { User } from "../interfaces/user.interface";

  class WeeklyService {
    db = knex({
            client: 'pg',
            connection: {
                host: process.env.DATABASE_HOST,
                user: process.env.DATABASE_USERNAME,
                password: process.env.DATABASE_PASSWORD,
                database: process.env.DATABASE,
            },
        });
        app = express();

    public async addSteps(steps:any, date: any): Promise<any> {
        await this.db('weekly_summary').insert({id: 1, steps:steps, day:date}).onConflict(['id','day']).merge(['steps']);
    }
    public async addCalories(calories:any, date:any ): Promise<any> {
        await this.db('weekly_summary').insert({id: 1, calories:calories, day:date}).onConflict(['id','day']).merge(['calories']);
    }
  }
  
  export default WeeklyService;
  