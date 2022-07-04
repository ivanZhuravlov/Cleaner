import { Request, Response, NextFunction } from 'express';
import Cleaner from "../models/Cleaner";
import ServerExeption from '../errors/ServerExeption';

export default class CleanerController {
  async createCleaner(request: Request, response: Response, next: NextFunction) {
    const data = { ...request.body }
    let cleaner;

    try {
      cleaner = new Cleaner({});
      await cleaner.save();
    } catch (e) {
      next(new ServerExeption(404, 'failed to create user'))
      return
    }

    response.status(201);
    response.json({
      cleaner,
    })
  }

  async uploadAvatar(request: Request, response: Response, next: NextFunction) {
    const cleaner = await Cleaner.findById(request.params.id)

    if (!cleaner) {
      next(new ServerExeption(404, 'cleaner not found'))
      return
    }

    await cleaner.updateOne({
      avatarSrc: request.file ? request.file.path : '',
    })
    response.status(201).json(cleaner);
  }

  async getCleaners(request: Request, response: Response, next: NextFunction) {
    const cleaners = await Cleaner.find();

    if (!cleaners) {
      next(new ServerExeption(404, 'cleaner not found'));
      return;
    }

    response.status(200).json(cleaners);
  }

  async getCleaner(request: Request, response: Response, next: NextFunction) {
    const cleaner = await Cleaner.findById(request.params.id);

    if (!cleaner) {
      next(new ServerExeption(404, 'cleaner not found'));
      return;
    }

    response.status(201).json(cleaner);
  }
}