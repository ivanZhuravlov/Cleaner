import express from 'express';
import { Express } from 'express';
import bodyParser from 'body-parser';
import DatabaseService from './services/db-service';
import UserRouter from './routes/userRoutes';
import ServiceRouter from './routes/serviceRoutes';
import CleanerRouter from './routes/cleanerRoutes';
import passport from 'passport';
import strategy from './middleware/passport';
import BookingRouter from './routes/bookingRoutes';

const port = process.env.PORT || 8000

export default class Server {
  private app: Express;
  private dbService: DatabaseService;
  private userRouter: UserRouter;
  private cleanerRouter: CleanerRouter;
  private serviceRouter: ServiceRouter;
  private bookingRouter: BookingRouter;

  run() {
    this.initService();
    this.initRoutes()
    this.createApp();
    this.start();
  }

  createApp() {
    console.log('createApp. work')
    this.app = express();
    this.app.use(bodyParser.json());
    this.app.use('/src/uploads', express.static('src/uploads'));
    this.app.use(this.userRouter.getUserRoutes());
    this.app.use(this.cleanerRouter.getCleanerRoutes());
    this.app.use(this.serviceRouter.getServiceRoutes());
    this.app.use(this.bookingRouter.geBookingRoutes());
    this.app.use(passport.initialize());
    strategy(passport);
  }

  start() {
    this.app.listen(port, () => {
      console.log(`App listen on port ${port}`)
    })
  }

  initRoutes() {
    this.userRouter = new UserRouter();
    this.cleanerRouter = new CleanerRouter();
    this.serviceRouter = new ServiceRouter();
    this.bookingRouter = new BookingRouter();
  }

  async initService() {
    this.dbService = new DatabaseService;
    await this.dbService.createDBConnection();
  }
}