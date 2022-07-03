import { Router } from 'express';
import CleanerController from '../controller/cleanerController';
import passport from 'passport';
import uploader from '../middleware/uploader'
import validator from '../middleware/validator';
import { createCleanerValidationSchema } from '../validation/cleaner';
import admin from '../middleware/admin';

export default class CleanerRouter {
  private router: Router;
  private cleanerController: CleanerController;

  constructor() {
    this.router = Router();
    this.cleanerController = new CleanerController();
  }

  getCleanerRoutes() {
    console.log('getCleanerRoutes');
    this.router.use(passport.authenticate('jwt', { session: false }));
    this.router.post('/api/v1/cleaner', admin, validator(createCleanerValidationSchema), this.cleanerController.createCleaner);
    this.router.put('/api/v1/cleaner/:id', admin, uploader.single('image'), this.cleanerController.uploadAvatar);
    this.router.get('/api/v1/cleaner', this.cleanerController.getCleaners);
    this.router.get('/api/v1/cleaner/:id', this.cleanerController.getCleaner);


    return this.router
  }
}