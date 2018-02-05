/**
 * @author KylesLight
 * @date 2/16/17-1:55 PM
 * @file webpack.config
 */

import genClientConfig from './webpack.client.config';
import genServerConfig from './webpack.server.config';

export default opt => [genClientConfig(opt), genServerConfig(opt)];
