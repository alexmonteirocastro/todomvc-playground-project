import app from "./app";
import { gracefulShutdownOptions } from './shutdown_handler'
const gracefulShutdown = require('http-graceful-shutdown');
import { SERVER_PORT } from './utils/config'

const PORT = SERVER_PORT || 9000;

export const server = app.listen(PORT, () => {
  console.log('Express server listening on port ' + PORT);
})

gracefulShutdown(server, gracefulShutdownOptions)
