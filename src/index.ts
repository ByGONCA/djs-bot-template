import 'dotenv/config';
import { Twiistrz } from './client/twiistrz.js';
import logger from './utils/logger.js';

await new Twiistrz().start();

process.on(`rejectionHandled`, (error) => logger.error(error));
process.on(`unhandledRejection`, (error) => logger.error(error));
process.on(`uncaughtException`, (error) => logger.error(error));
