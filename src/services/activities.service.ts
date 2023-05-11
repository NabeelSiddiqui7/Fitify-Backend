import express from "express";
import knex from "knex";
import { User } from "../interfaces/user.interface";

  class ActivitiesService {
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

    public async addActivity(description: any): Promise<any> {
        await this.db('daily_activities').insert({id:1, description: description, completed: false});
    }
    public async updateActivity(description: any, completed:any): Promise<any> {
        await this.db('daily_activities').where({description:description}).update({completed: completed}).orderBy("activity_id", "asc").then();
    }
    public async deleteActivity(description: any): Promise<any> {
        await this.db('daily_activities').where({description:description}).del().then();
    }
  }
  
  export default ActivitiesService;
  