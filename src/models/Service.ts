import { Schema, model, Types } from 'mongoose';

const ServiceSchema = new Schema({
  name: { type: String, requires: true },
  description: { type: String, requires: true },
  price: { type: Number, requires: true },
  cleaner: { type: Types.ObjectId, ref: 'Cleaner' }
})

export default model('Service', ServiceSchema);