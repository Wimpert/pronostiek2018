import * as express from "express";


console.log("hello");

const app  =  express();
app.get('/api/', (req, res) => res.send('Hello !'));

app.listen(3000, () => console.log('Example app listening on port 3000!'))