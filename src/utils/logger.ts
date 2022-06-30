import { pino } from 'pino';
import config from './config.js';

const logger = pino({
	transport: {
		target: `pino-pretty`,
		options: {
			colorize: true,
			translateTime: true,
		},
	},
	level: config.env === `production` ? `info` : `debug`,
	name: process.env.APP_NAME,
});

export default logger;
