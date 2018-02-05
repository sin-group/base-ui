/**
 * @author KylesLight
 * @date 19/10/2017-12:44 AM
 * @file clean
 */

// node modules
import fs from 'fs-extra';

async function clean() {
    await fs.remove('build');

    // create folders
    await fs.ensureDir('build/public');
}

export default clean;
