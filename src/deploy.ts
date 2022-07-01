import 'dotenv/config';
import { Deploy } from './client/deploy.js';
import logger from './utils/logger.js';

await new Deploy().run();

process.on(`rejectionHandled`, (error) => logger.error(error));
process.on(`unhandledRejection`, (error) => logger.error(error));
process.on(`uncaughtException`, (error) => logger.error(error));
