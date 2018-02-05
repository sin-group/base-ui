/**
 * @author KylesLight
 * @date 19/10/2017-12:44 AM
 * @file copy
 */

import fs from 'fs-extra';
import replace from 'replace';

async function copy() {
    try {
        await Promise.all([
            fs.copy('config', 'build/config'),
            fs.copy('src/public', 'build/public'),
            fs.copy('../package.json', 'build/package.json')
        ]);
    } catch (err) {
        console.error(err);
        throw err;
    }

    // 替换package.json中的start选项
    replace({
        regex: '"scripts": {(.|\n)*?}',
        replacement: '"scripts": {\n    "start": "node server.js"\n  }',
        paths: ['build/package.json'],
        recursive: false,
        silent: false
    });
}

export default copy;
