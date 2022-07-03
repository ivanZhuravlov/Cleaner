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

  getUserRoutes() {
    console.log('getCleanerRoutes');
    this.router.use(passport.authenticate('jwt', { session: false }));
    this.router.use(admin);
    this.router.post('/api/v1/cleaner', validator(createCleanerValidationSchema), this.cleanerController.createCleaner);
    this.router.put('/api/v1/cleaner/:id', uploader.single('image'), this.cleanerController.uploadAvatar);
    return this.router
  }
}