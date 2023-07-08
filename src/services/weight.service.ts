import express from "express";
import knex from "knex";
import { User } from "../interfaces/user.interface";

class WeightService {
    db = knex({
        client: 'pg',
        connection: {
            host: process.env.DATABASE_HOST,
            user: process.env.DATABASE_USERNAME,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE,
            ssl: true
        },
    });
    app = express();

    public async addWeight(weight: any, date: any): Promise<any> {
        await this.db('weights').insert({ id: 1, weight: weight, record_date: date });
    }
    public async updateWeight(id: any, weight: any, date: any): Promise<any> {
        await this.db('weights').where({ id: 1, record_date: date }).update({ weight: weight }).then();
    }
}

export default WeightService;
