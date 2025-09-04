import serverless from "serverless-http";
import app from "../../server/src/index";  // import your express app

export const handler = serverless(app);
