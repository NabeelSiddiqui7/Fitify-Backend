import express from "express";
import knex from "knex";
import { User } from "../interfaces/user.interface";

  class FoodService {
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

    public async addFood(name:any, date: any, calories:any, protein:any, fat:any, carbs:any): Promise<any> {
        await this.db('daily_food').insert({id: 1, name:name, date:date, calories:calories, protein_g:protein, fat_g:fat, carbs_g:carbs});
    }

    public async deleteFood(name: any): Promise<any> {
      await this.db('daily_food').where({name:name}).del().then();
    }
  }
  
  export default FoodService;
  