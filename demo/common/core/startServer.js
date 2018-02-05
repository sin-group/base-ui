/**
 * @author panezhang
 * @date 2017/10/24-下午7:29
 * @file startServer
 */
/* eslint-disable no-console */

// system modules
import http from 'http';

export default (app, port) => {
    app.set('port', port);

    // Create Server
    const server = http.createServer(app);
    server.listen(port);

    // On Listening
    server.on('listening', () => {
        const address = server.address();
        const bind = typeof address === 'string' ? `${address}` : `${address.port}`;
        console.log(`The server is running at http://localhost:${bind}/`);
    });

    // On Error
    server.on('error', (error) => {
        if (error.syscall !== 'listen') {
            throw error;
        }

        const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

        switch (error.code) {
            case 'EACCES':
                console.error(`${bind} requires elevated privileges`);
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error(`${bind} is already in use`);
                process.exit(1);
                break;
            default:
                throw error;
        }
    });
};
