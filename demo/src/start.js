/**
 * @author Kyles Light
 * @email kuilin@yangqianguan.com
 * @date 2017-12-28 16:28:40.980
 */

// node modules
import config from 'config';

// our modules
import startServer from '../common/core/startServer';
import server from './server';

const port = config.get('run.port');
startServer(server, port);
