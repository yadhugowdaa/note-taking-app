import app from '../../server/src/index';
import serverless from 'serverless-http';

// This handler is what Netlify will run for all API requests
export const handler = serverless(app);