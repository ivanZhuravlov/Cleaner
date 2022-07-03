import { Request, Response } from 'express';
import Cleaner from "../models/Cleaner";
import errors from '../errors/errors';

export default class CleanerController {
  async createCleaner(request: Request, response: Response) {
    const data = { ...request.body }
    let cleaner;

    try {
      cleaner = new Cleaner(data);
      await cleaner.save();
    } catch (e) {
      return response.json(errors.DB_ERROR);
    }

    response.status(201);
    response.json({
      cleaner,
    })
  }

  async uploadAvatar(request: Request, response: Response) {
    const cleaner = await Cleaner.findById(request.params.id)

    if (!cleaner) {
      response.status(404)
      response.json(errors.BAD_REQUEST_CLEANER_NOT_FOUND)
    }

    await cleaner.updateOne({
      avatarSrc: request.file ? request.file.path : '',
    })
    response.status(201).json(cleaner);
  }

  async getCleaners(request: Request, response: Response) {
    const cleaners = await Cleaner.find();

    if (!cleaners) {
      response.status(404)
      response.json(errors.BAD_REQUEST_CLEANER_NOT_FOUND)
      return;
    }

    response.status(201).json(cleaners);
  }

  async getCleaner(request: Request, response: Response) {
    const cleaner = await Cleaner.findById(request.params.id);

    if (!cleaner) {
      response.status(404)
      response.json(errors.BAD_REQUEST_CLEANER_NOT_FOUND)
      return;
    }

    response.status(201).json(cleaner);
  }
}