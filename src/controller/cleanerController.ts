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
      response.json({
        code: 'BAD_REQUEST_ERROR',
        errors: 'USER_NOT_FOUND',
      })
    }
    console.log(request.file)
    await cleaner.updateOne({
      avatarSrc: request.file ? request.file.path : '',
    })
    response.status(201).json(cleaner);
  }

}