import express from "express";
import knex from "knex";
import { User } from "../interfaces/user.interface";
import path from "path";
const {
    createAccessToken,
    createRefreshToken,
    sendAccessToken,
    sendRefreshToken
} = require("../tokens");
const { verify } = require('jsonwebtoken');

class UserService {
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

    public async register(res: any, req: any, email: string | undefined, password: string | undefined, username: string | undefined): Promise<any> {
        try {
            await this.db('users').insert({ email: email, password: password, username: username });
        } catch (error: any) {
            res.send({
                error: `${error.message}`
            })

        }
    }


    public async login(res: any, req: any, email: string | undefined, password: string | undefined): Promise<any> {
        try {
            const user: any = (await this.db('users').where({ email: email })).at(0);
            if (!user) {
                throw new Error("User does not exist");
            }
            if (user.password != password) {
                throw new Error("Password does not match");
            }

            console.log(typeof (user.id));

            //Otherwise create Refresh and Access token
            const accessToken = createAccessToken(user.id);
            const refreshToken = createRefreshToken(user.id);
            //Add to database
            user.refreshToken = refreshToken;
            await this.db('users').where({ id: user.id }).update('refreshtoken', refreshToken);
            await this.db('users').where({ id: user.id }).update('accesstoken', accessToken);
            //Send tokens
            sendRefreshToken(res, refreshToken);
            sendAccessToken(res, req, accessToken);
        } catch (error: any) {
            res.send({
                error: `${error.message}`
            })

        }
    }

    public async logout(res: any, req: any): Promise<any> {
        try {
            res.clearCookie('refreshtoken', { path: '/refresh_token' });
            return res.message({
                message: 'Logged out',
            })

        } catch (error: any) {
            res.send({
                error: `${error.message}`
            })

        }
    }

    public async getAccessToken(res: any, req: any): Promise<any> {
        const token = req.cookies.refreshtoken;
        if (!token) {
            console.log("error1")
            res.send({
                accesstoken: ""
            });
            return;
        };

        let payload: any = null;
        try {
            payload = verify(token, process.env.REFRESH_TOKEN_SECRET);
        } catch (error: any) {
            console.log("error2")
            res.send({
                accesstoken: ""
            });
            return;

        }
        let user: any;

        await this.db('users').where({ id: payload.id }).then((res) => {
            user = res.at(0);
        });

        if (!user) {
            console.log("error3")
            res.send({
                accesstoken: ""
            });
            return;
        }
        // if (user.refreshtoken !== token) {
        //     console.log("error4")
        //     res.send({
        //         accesstoken: ""
        //     });
        //     return;
        // }
        console.log("cum");
        console.log(typeof (user.id));

        const accesstoken = createAccessToken(user.id);
        const refreshToken = createRefreshToken(user.id);
        await this.db('users').where({ id: user.id }).update('refreshtoken', refreshToken).then(() => {
            sendRefreshToken(res, refreshToken);
            res.send({ accesstoken, id: user.id, email: user.email, username: user.username });
            return;
        });

    }

    public async getUserData(id: any): Promise<any> {
        console.log("pee")
        console.log(typeof (id));
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
            = [
                await this.db('users').where({ id: id }),
                await this.db('weights').where({ id: id }).orderBy("record_date", "desc").limit(7),
                await this.db('daily_activities').where({ id: id }),
                await this.db('weekly_summary').where({ id: id }),
                await this.db('daily_food').where({ id: id }),
                await this.db('daily_workout').where({ id: id })
            ];
        return { UserData, WeightData, DailyActivities, WeeklySummary, DailyFood, DailyWorkout };
    }
}

export default UserService;
