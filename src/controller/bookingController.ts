import { NextFunction, Request, Response } from 'express';
import Booking from '../models/Booking';
import Service from '../models/Service';
import User from '../models/User';
import errors from '../errors/errors';
import BookingStatus from '../enums/BookingStatus';
import IGetUserInfoRequest from '../core/IGetUserInfoRequest';
import ServerExeption from '../errors/ServerExeption';

export default class BookingController {
  async createBooking(request: IGetUserInfoRequest, response: Response, next: NextFunction) {
    let booking;
    try {
      const service = await Service.findById(request.body.id);

      if (!service) {
        next(new ServerExeption(404, 'service not found'));
        return
      }

      const userBalance = request.user.balance;
      const servicePrice = service.price;
      const newUserBalance = userBalance - servicePrice;

      if (userBalance < servicePrice) {
        next(new ServerExeption(402, 'Payment Required '));
        return
      }

      const bookingData = {
        name: service.name,
        price: service.price,
        service: service.id,
        status: BookingStatus.Pending,
        owner: request.user.id
      }

      booking = new Booking(bookingData);
      const result = await booking.save();


      if (result.owner) {
        await User.findOneAndUpdate({ login: request.user.login }, { balance: newUserBalance })
      }

    } catch (e) {
      next(new ServerExeption(500, 'Server Error'));
      return
    }

    response.status(201);
    response.json({
      booking,
    })
  }

  async getUserBookings(request: IGetUserInfoRequest, response: Response, next: NextFunction) {
    let bokings;

    try {
      bokings = await Booking.find({ owner: request.user.id });
    } catch (e) {
      next(new ServerExeption(500, 'Server Error'));
      return
    }

    response.status(201);
    response.json({
      bokings,
    })
  }

  async getAdminBookings(request: Request, response: Response, next: NextFunction) {
    let bokings;

    try {
      bokings = await Booking.find();
    } catch (e) {
      next(new ServerExeption(500, 'Server Error'));
      return
    }

    response.status(201);
    response.json({
      bokings,
    })
  }
}