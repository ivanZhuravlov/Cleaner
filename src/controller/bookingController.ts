import { Request, Response } from 'express';
import Booking from '../models/Booking';
import Service from '../models/Service';
import errors from '../errors/errors';
import BookingStatus from '../enums/BookingStatus';
import IGetUserInfoRequest from '../core/IGetUserInfoRequest';


export default class BookingController {
  async createBooking(request: IGetUserInfoRequest, response: Response) {
    let booking;
    try {
      const service = await Service.findById(request.body.id);
      const userBalance = request.user.balance;

      if (userBalance < service.price) {
        response.status(500)
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

      await booking.save();
    } catch (e) {
      response.status(500)
      return response.json(errors.DB_ERROR);
    }

    response.status(201);
    response.json({
      booking,
    })
  }
}