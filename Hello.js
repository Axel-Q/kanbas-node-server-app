export default function Hello(app) {
    app.get('/hello', (req, res) => {res.send('fuck off')});
    app.get('/', (req,res) => {res.send("aoligei")});
}

