import { Schema, model, Types } from 'mongoose';

const UserSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  role: { type: Number, default: 0, required: true },
  password: { type: String, required: true },
  login: { type: String, required: true },
  balance: { type: Number, required: true },
})

export default model('User', UserSchema);