import { Pool } from 'pg';

import config from '../../config';

console.log(config.database);

export const pool = new Pool(config.database);
