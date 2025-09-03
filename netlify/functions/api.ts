import server from '../../server/src/index';
import serverless from 'serverless-http';

export const handler = serverless(server);