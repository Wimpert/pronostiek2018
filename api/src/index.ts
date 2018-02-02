import * as express from "express";


console.log("heldsfdsfsdfsqdfqsdlo");

const app  =  express();
app.get('/api/', (req, res) => res.send('hello there!'));

app.listen(3000, () => console.log('Example app listening on port 3000!'))