import 'dotenv/config';
import { Twiistrz } from './client/twiistrz.js';

await new Twiistrz().start();

process.on(`rejectionHandled`, (error) => console.error(error));
process.on(`unhandledRejection`, (error) => console.error(error));
process.on(`uncaughtException`, (error) => console.error(error));
