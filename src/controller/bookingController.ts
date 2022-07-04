import { Request, Response } from 'express';
import Booking from '../models/Booking';
import Service from '../models/Service';
import User from '../models/User';
import errors from '../errors/errors';
import BookingStatus from '../enums/BookingStatus';
import IGetUserInfoRequest from '../core/IGetUserInfoRequest';

export default class BookingController {
  async createBooking(request: IGetUserInfoRequest, response: Response) {
    let booking;
    try {
      const service = await Service.findById(request.body.id);

      if (!service) {
        response.status(404);
        return response.json(errors.BAD_REQUEST_NOT_FOUND);
      }

      const userBalance = request.user.balance;
      const servicePrice = service.price;
      const newUserBalance = userBalance - servicePrice;

      if (userBalance < servicePrice) {
        return response.json({ balance: 'low' });
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
        const user = await User.findById(request.user.id);
        await user.updateOne({ balance: newUserBalance });
      }

    } catch (e) {
      response.status(500)
      return response.json(errors.DB_ERROR);
    }

    response.status(201);
    response.json({
      booking,
    })
  }

  async getUserBookings(request: IGetUserInfoRequest, response: Response) {
    let bokings;

    try {
      bokings = await Booking.find({ owner: request.user.id });
    } catch (e) {
      response.status(500)
      return response.json(errors.DB_ERROR);
    }

    response.status(201);
    response.json({
      bokings,
    })
  }

  async getAdminBookings(request: Request, response: Response) {
    let bokings;

    try {
      bokings = await Booking.find();
    } catch (e) {
      response.status(500)
      return response.json(errors.DB_ERROR);
    }

    response.status(201);
    response.json({
      bokings,
    })
  }
}