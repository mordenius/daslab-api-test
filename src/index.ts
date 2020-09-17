// import { APIGatewayProxyHandler } from 'aws-lambda';
// import * as ServerlessHttp from 'serverless-http';
import * as winston from 'winston';

import { createServer } from './bootstrap/server'

// run
let server;
// let serverless;
const boot = async () => {
    server = await createServer();
    server.listen(process.env.PORT || 8000);
    winston.info(`[Express] Server has started on port: ${process.env.PORT || 8000}`);
    // serverless = ServerlessHttp(server);

}
boot();

// export const hello: APIGatewayProxyHandler = serverless;
