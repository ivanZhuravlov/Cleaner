import { Schema, model, Types } from 'mongoose';

const BookingSchema = new Schema({
  name: { type: String, requires: true },
  date: { type: Date, default: Date.now },
  price: { type: Number, requires: true },
  services: [{ type: Types.ObjectId, ref: 'Service' }],
  status: { type: Number, default: 0, requires: true },
  owner: [{ type: Types.ObjectId, ref: 'User' }],
})

export default model('Booking', BookingSchema);