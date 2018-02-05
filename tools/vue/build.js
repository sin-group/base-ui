/**
 * @author KylesLight
 * @date 19/10/2017-12:44 AM
 * @file build
 */

// our modules
import run from '../run.function';
import clean from './clean';
import copy from './copy';
import bundle from './bundle';

/**
 * Compiles the project from source files into a distributable
 * format and copies it to the output (build) folder.
 */

async function build(opt) {
    await run(clean, opt);
    await run(copy, opt);
    await run(bundle, opt);
}

export default build;
