import convict from 'convict';

export const config = convict({
  server: {
    PORT: {
      doc: 'server port',
      format: 'port',
      default: 8000,
      env: 'SERVER_PORT',
    },
  },
  database: {
    URI: {
      doc: 'mongo URI',
      default: 'mongodb+srv://ivan:1q2w3e4r5t@cluster0.xphicda.mongodb.net/?retryWrites=true&w=majority',
      env: 'MONGO_URI',
    },
  },
});