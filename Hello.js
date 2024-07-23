export default function Hello(app) {
    app.get('/hello', (req, res) => {res.send('hello')});
    app.get('/', (req,res) => {res.send("aoligei")});
}

