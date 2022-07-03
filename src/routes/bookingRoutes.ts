import { Router } from 'express';
import passport from 'passport';
import validator from '../middleware/validator';
import { bookingValidationSchema } from '../validation/booking';
import BookingController from '../controller/bookingController';

export default class BookingRouter {
  private router: Router;
  private bookingController: BookingController;

  constructor() {
    this.router = Router();
    this.bookingController = new BookingController();
  }

  geBookingRoutes() {
    console.log('getBookingRoutes');
    this.router.use(passport.authenticate('jwt', { session: false }));
    this.router.post('/api/v1/booking', validator(bookingValidationSchema), this.bookingController.createBooking);

    return this.router
  }
} 