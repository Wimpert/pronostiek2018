import * as express from "express";


console.log("Hello client");

const app  =  express();

app.use(express.static('./client/dist'));
app.get('/api/', (req, res) => res.send('hello there!'));

app.listen(3000, () => console.log('Example app listening on port 3000!'))