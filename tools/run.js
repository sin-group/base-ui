import minimist from 'minimist';

// our modules
import run from './run.function';

// 提供命令行接口
const args = minimist(process.argv.slice(2));
const module = process.argv[2];

console.log(`NODE_ENV=${process.env.NODE_ENV}`);

run(require(`./${module}.js`), args).catch(err => console.error(err.stack)); // eslint-disable import/no-dynamic-require

