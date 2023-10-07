/* eslint-disable no-console */
import mongoose from 'mongoose';
import app from './App';
import config from './config/index';
import { Server } from 'http';

process.on('uncaughtException', error => {
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

  const exitHandler = () => {
    if (server) {
      server.close(() => {
        console.info('Server closed');
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  };

  const unexpectedErrorHandler = (error: unknown) => {
    console.error(error);
    exitHandler();
  };

  process.on('uncaughtException', unexpectedErrorHandler);
  process.on('unhandledRejection', unexpectedErrorHandler);

  process.on('SIGTERM', () => {
    console.info('SIGTERM received');
    if (server) {
      server.close();
    }
  });
}
Connect();
