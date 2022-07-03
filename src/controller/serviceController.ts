import { Request, Response } from 'express';
import Service from "../models/Service";
import errors from '../errors/errors';



export default class ServiceController {
  async createService(request: Request, response: Response) {
    const data = { ...request.body }
    let service;

    try {
      service = new Service(data);
      await service.save();
    } catch (e) {
      response.status(500)
      return response.json(errors.DB_ERROR);
    }

    response.status(201);
    response.json({
      service,
    })
  }

  async getServices(request: Request, response: Response) {
    const data = { ...request.body }
    let services;

    try {
      services = await Service.find({ cleaner: request.params.id });
    } catch (e) {
      response.status(500)
      return response.json(errors.DB_ERROR);
    }

    response.status(201);
    response.json({
      services,
    })
  }

}