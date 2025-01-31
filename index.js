const express = require('express');
const app = express();
const {createTokenMiddleware, headersVerificationMiddleware} = require("./middleware/middleware");
const {saveUser, findUserById, findAllUsers, updateUserById, deleteUserById} = require('./controller/User');
app.use(express.json()); // Para JSON
const {runDatabase} = require('./db/index');
runDatabase();


app.post('/user', async (req, res) =>{
    const {username, password, email} = req.body;
    const user = await saveUser({username, password, email})
    res.status(201).send(user)
});

app.post('/getToken', (req, res) => {
    let token = createTokenMiddleware(req.body);
    res.status(201).send({"success":"true", "token":token, "message": "The token is valid for only 1 hour"})
});
app.use(headersVerificationMiddleware);

app.get('/user/:id', async (req, res) => {
    const id = req.params.id;
    const user = await findUserById(id);
    res.status(201).json(user)
});

app.get('/users', async (req, res) => {
    const users = await findAllUsers();
    res.status(201).send(users);
});

app.put('/user/:id', async (req, res) => {
    const id = req.params.id;
    const {username, password, email} = req.body;
    const user = await updateUserById(id, {username, password, email});
    res.status(201).json(user);
});

app.delete('/user/:id', async (req, res) => {
    const id = req.params.id;
    const user = await deleteUserById(id);
    res.status(201).json(user)
})

app.listen(3000);