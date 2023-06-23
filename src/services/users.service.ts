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
            WeeklySummary,
            DailyFood,
            DailyWorkout,
        ]:
        [
            any,
            any,
            any,
            any,
            any,
            any,
        ] 
        =[ 
            await this.db('users'),
            await this.db('weights').orderBy("record_date", "desc").limit(7),
            await this.db('daily_activities'),
            await this.db('weekly_summary'),
            await this.db('daily_food'),
            await this.db('daily_workout')
        ];
        return {UserData, WeightData, DailyActivities, WeeklySummary, DailyFood, DailyWorkout};
    }
  }
  
  export default UserService;
  