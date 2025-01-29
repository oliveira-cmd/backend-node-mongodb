const express = require('express');
const app = express();
const {createTokenMiddleware, headersVerificationMiddleware} = require("./middleware/middleware");
app.use(express.json()); // Para JSON

app.post('/getToken', (req, res) => {
    let token = createTokenMiddleware(req.body);
    res.send({"success":"true", "token":token, "message": "The token is valid for only 1 hour"})
});
app.use(headersVerificationMiddleware);

app.get('/', (req, res) => {
    res.send('Hello World')
});

app.listen(3000);