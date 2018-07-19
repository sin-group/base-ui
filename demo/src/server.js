/**
 * @author Kyles Light
 * @email kuilin@yangqianguan.com
 * @date 2017-12-28 16:28:40.980
 */

import path from 'path';

import compression from 'compression';
import express from 'express';

const resolveIndex = () => path.resolve(__dirname, './public/static/index.html');
const app = express();

app.use(compression());
app.use(express.static(path.resolve(__dirname, './public')));

app.use((req, res) => {
    const index = resolveIndex();

    res.sendFile(index);
});

export default app;
