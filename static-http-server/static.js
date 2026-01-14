import express from 'express';
import fs from 'fs/promises';

const app = express();

app.use('/', express.static('.'));

app.get('/', async (req, res) => {
  const content = await fs.readFile('./index.html');
  const html = content.toString();
  res.send(html);
});

app.get('/', async(req, res) => {
    const content = await fs.readFile('./member-page.html');
    res.send(html);
});


app.get('/style.css', async (req, res) => {
  const content = await fs.readFile('./main.css');
  const css = content.toString();
  res.setHeader('content-type', 'text/css');
  res.send(css);
});


app.listen(5080);