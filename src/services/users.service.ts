import express from "express";
import knex from "knex";
import { User } from "../interfaces/user.interface";

  class UserService {
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
    public async getUserData(): Promise<any> {
        const [
            UserData,
            WeightData,
            DailyActivities,
        ]:
        [
            any,
            any,
            any,
        ] 
        =[ 
            await this.db('users'),
            await this.db('weights').orderBy("record_date", "asc"),
            await this.db('daily_activities')
        ];
        return {UserData, WeightData, DailyActivities};
    }
  }
  
  export default UserService;
  