/* eslint-disable no-console */
import mongoose from 'mongoose';
import app from './App';
import config from './config/index';
import { Server } from 'http';

process.on('uncaughtException', (error) => {
  console.log('uncaughtException detected');
  console.error(error);
  process.exit(1);
});

let server: Server;
async function Connect() {
  try {
    await mongoose.connect(config.mongoURI as string);
    console.log('Database connection established');
    app.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }

  process.on('unhandledRejection', (error) => {
    console.log('unhandledRejection detected. closing server...');
    if (server) {
      server.close();
      console.log('server is closed');
      console.log(error);
      console.error(error);
      process.exit(1);
    } else {
      console.log('server is closed');
      process.exit(1);
    }
  });
}
Connect().catch((err) => {
  console.error('Failed to connect database', err);
});
process.on('SIGTERM', () => {
  console.log('SIGTERM is received');
  if (server) {
    server.close();
  }
});

