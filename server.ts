import 'dotenv/config';
// import '@/index';
import App from './app';
import UserRoute from './src/routes/users.route';
import ActivitiesRoute from './src/routes/activities.route';

const app = new App([new UserRoute(), new ActivitiesRoute()]);

app.listen();

// Export instantiate app so it's properties (e.g., db) can be accessed
export { app };
