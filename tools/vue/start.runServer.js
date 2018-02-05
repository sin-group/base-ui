/**
 * @author KylesLight
 * @date 19/10/2017-1:27 AM
 * @file start.runServer
 */

// system modules
import cp from 'child_process';

// Should match the text string used in `src/server.js/server.listen(...)`
const RUNNING_REGEXP = /The server is running at http:\/\/(.*?)\//;
let server;

// Launch or restart the Node.js server
function runServer(serverPath) {
    return new Promise((resolve) => {
        const onStdOut = (data) => {
            const time = new Date().toTimeString();
            const match = data.toString('utf8').match(RUNNING_REGEXP);

            process.stdout.write(time.replace(/.*(\d{2}:\d{2}:\d{2}).*/, '[$1] '));
            process.stdout.write(data);

            if (match) {
                server.stdout.removeListener('data', onStdOut);
                server.stdout.on('data', x => process.stdout.write(x));
                resolve(match[1]);
            }
        };

        if (server) {
            server.kill('SIGTERM');
        }

        server = cp.spawn('node', [serverPath], {
            env: Object.assign({NODE_ENV: 'development'}, process.env),
            silent: false
        });

        server.stdout.on('data', onStdOut);
        server.stderr.on('data', x => process.stderr.write(x));
    });
}

process.on('exit', () => {
    if (server) {
        server.kill('SIGTERM');
    }
});

export default runServer;
