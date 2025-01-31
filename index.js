const express = require('express');
const app = express();
const {createTokenMiddleware, headersVerificationMiddleware} = require("./middleware/middleware");
const {saveUser, findUserById, findAllUsers, updateUserById, deleteUserById} = require('./controller/User');
const {saveProduct, getProductById, getAllProduct, updateProductById, deleteProductById} = require('./controller/Product');
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
});

app.post('/product', async (req, res) => {
    const {name, sku, description, price, urlImage, userLog} = req.body;
    const product = await saveProduct({name, sku, description, price, urlImage, userLog});
    res.status(201).send(product);
});

app.get('/product/:id', async(req, res) => {
    const id = req.params.id;
    const product = await getProductById(id);
    res.status(201).json(product);
});

app.get('/product', async(req, res) => {
    const product = await getAllProduct();
    res.status(201).json(product);
});

app.put('/product/:id', async (req, res) => {
    const id = req.params.id;
    const {name, sku, description, price, urlImage, userLog} = req.body;
    const newProduct = await updateProductById(id, {name, sku, description, price, urlImage, userLog});
    res.status(201).json(newProduct);
});

app.delete('/product/:id', async (req, res) => {
    const id = req.params.id;
    const product = await deleteProductById(id);
    res.status(201).json(product);
})

app.listen(3000);