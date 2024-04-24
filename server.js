import express from 'express';
import path from 'path';

const app = express();
const PORT = 3000;
const __dirname = path.resolve();

app.use(express.static('./dist'));

app.listen(PORT);

app.get('*', (_, res) => {
    res.sendFile(path.join(__dirname, '/dist/index.html'));
});
