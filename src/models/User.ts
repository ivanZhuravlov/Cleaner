import { Schema, model, Types } from 'mongoose';

const UserSchema = new Schema({
  firstName: { type: String, requires: true },
  lastName: { type: String, requires: true },
  role: { type: Number, default: 0, requires: true },
  password: { type: String, requires: true },
  login: { type: String, requires: true },
  balance: { type: Number, required: true },
  bookings: [{ type: Types.ObjectId, ref: 'Booking' }],
})

export default model('User', UserSchema);