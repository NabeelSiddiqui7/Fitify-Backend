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

    public async addActivity(name: any, category:any, description:any): Promise<any> {
        await this.db('daily_activities').insert({id:1, name: name, completed: false, category:category, description:description});
    }
    public async updateActivity(name: any, completed:any): Promise<any> {
        await this.db('daily_activities').where({name:name}).update({completed: completed}).orderBy("activity_id", "asc").then();
    }
    public async deleteActivity(activity_id: any): Promise<any> {
        await this.db('daily_activities').where({activity_id:activity_id}).del().then();
    }
  }
  
  export default ActivitiesService;
  