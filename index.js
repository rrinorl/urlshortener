'use strict';

require('dotenv').config()
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const {nanoid} = require('nanoid');
const {Url} = require('./models');

const port = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(morgan("short"));
app.use(express.json());
app.disable('x-powered-by');

app.get('/', (req, res)=> res.send('hello world!'));
app.post('/url', async (req, res) => {
    const url = req.body.url;
    if(!url) return res.status(400).json({error: 'Url field required'});
    let id = nanoid(5);
    if(!url.startsWith('http')){
        return res.status(400).json({error: 'Url must start with protocol.'});
    }
    const created = await Url.create({
        hash: id,
        url
    });
    // TODO: save to DB
    res.status(201).json({created});
});

app.get('/:hash', async (req, res) =>{
    let hash = req.params.hash;
    let url = await Url.findOne({where: {hash}});
    console.log(JSON.stringify(url, null, 2));
    if(!url) return res.status(404).send("Not Found");
    res.redirect(url.url);
});

app.listen(port, ()=>{
    console.log(`Example app listening at http://localhost:${port}`);
});

