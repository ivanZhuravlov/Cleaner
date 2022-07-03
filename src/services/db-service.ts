const mongoose = require('mongoose');
import { config } from '../config/config';


export default class DatabaseService {

  async createDBConnection() {
    try {
      await mongoose.connect(config.get('database.URI'), {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
    } catch (e) {
      console.log(`databaseService.createDBConnection ${e.message}`);
      process.exit(1);
    }
  }
}