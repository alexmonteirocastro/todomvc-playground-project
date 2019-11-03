import app from "./app";
import { gracefulShutdownOptions } from './shutdown_handler'
const gracefulShutdown = require('http-graceful-shutdown');

const PORT = 3000;

export const server = app.listen(PORT, () => {
    console.log('Express server listening on port ' + PORT);
})

gracefulShutdown(server, gracefulShutdownOptions)
