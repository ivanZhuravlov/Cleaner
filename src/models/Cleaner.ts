import { Schema, model, Types } from 'mongoose';

const UserSchema = new Schema({
  name: { type: String, requires: true },
  description: { type: String, requires: true },
  services: [{ type: Types.ObjectId, ref: 'Service' }],
  avatarSrc: { type: String, default: '' }
})

export default model('Cleaner', UserSchema);