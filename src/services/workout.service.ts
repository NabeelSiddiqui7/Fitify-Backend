import express from "express";
import knex from "knex";
import { User } from "../interfaces/user.interface";

  class WorkoutService {
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

    public async addWorkout(name:any, date: any): Promise<any> {
        await this.db('daily_workout').insert({name:name, date:date});
    }

    public async deleteWorkout(name: any): Promise<any> {
      await this.db('daily_workout').where({name:name}).del().then();
    }
  }
  
  export default WorkoutService;
  