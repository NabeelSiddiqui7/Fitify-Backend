import 'dotenv/config';
// import '@/index';
import App from './app';
import UserRoute from './src/routes/users.route';
import ActivitiesRoute from './src/routes/activities.route';
import WeightRoute from './src/routes/weight.route';
import WeeklyRoute from './src/routes/weekly.route';
import FoodRoute from './src/routes/food.route';
import WorkoutRoute from './src/routes/workout.route';

const app = new App([new UserRoute(), new ActivitiesRoute(), new WeightRoute(), new WeeklyRoute(), new FoodRoute(), new WorkoutRoute()]);

app.listen();

// Export instantiate app so it's properties (e.g., db) can be accessed
export { app };
