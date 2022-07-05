import { Schema, model, Types } from 'mongoose';

const ServiceSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  cleaner: { type: Types.ObjectId, ref: 'Cleaner' }
})

export default model('Service', ServiceSchema);