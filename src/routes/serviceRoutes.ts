import { Router } from 'express';
import passport from 'passport';
import validator from '../middleware/validator';
import { serviceValidationSchema } from '../validation/service';
import admin from '../middleware/admin';
import ServiceController from '../controller/serviceController';

export default class ServiceRouter {
  private router: Router;
  private serviceController: ServiceController;

  constructor() {
    this.router = Router();
    this.serviceController = new ServiceController();
  }

  getServiceRoutes() {
    console.log('getServiceRoutes');
    this.router.use(passport.authenticate('jwt', { session: false }));
    this.router.post('/api/v1/service', admin, validator(serviceValidationSchema), this.serviceController.createService);
    this.router.get('/api/v1/cleaner/services/:id', this.serviceController.getServices);

    return this.router
  }
} 