import 'dotenv/config';
import { Deploy } from './client/deploy.js';

await new Deploy().run();
