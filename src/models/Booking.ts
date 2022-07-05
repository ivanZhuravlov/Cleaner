import { Schema, model, Types } from 'mongoose';

const BookingSchema = new Schema({
  name: { type: String, required: true },
  date: { type: Date, default: Date.now },
  price: { type: Number, required: true },
  service: { type: Types.ObjectId, ref: 'Service' },
  status: { type: Number, default: 0, required: true },
  owner: { type: Types.ObjectId, ref: 'User' },
})

export default model('Booking', BookingSchema);