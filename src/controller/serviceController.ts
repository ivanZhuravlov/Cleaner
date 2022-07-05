import { Request, Response, NextFunction } from 'express';
import Service from "../models/Service";
import errors from '../errors/errors';
import ServerExeption from '../errors/ServerExeption';

export default class ServiceController {
  async createService(request: Request, response: Response, next: NextFunction) {
    const data = { ...request.body }
    let service;

    try {
      service = new Service(data);
      await service.save();
    } catch (e) {
      next(new ServerExeption(404, 'failed to create service'))
      return
    }

    response.status(201);
    response.json({
      service,
    })
  }

  async getServices(request: Request, response: Response, next: NextFunction) {
    let services;

    try {
      services = await Service.find({ cleaner: request.params.id });
    } catch (e) {
      next(new ServerExeption(404, 'service not found'))
      return
    }

    response.status(201);
    response.json({
      services,
    })
  }

}