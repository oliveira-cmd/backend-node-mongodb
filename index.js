const express = require('express');
const app = express();
const {createTokenMiddleware, headersVerificationMiddleware} = require("./middleware/middleware");
const {saveUser, findUserById, findAllUsers, updateUserById, deleteUserById} = require('./controller/User');
const {saveProduct, getProductById, getAllProduct, updateProductById, deleteProductById} = require('./controller/Product');
const {saveStock, getStockById, getAllStock, updateStockById, deleteStockById} = require('./controller/Stock');
const {saveCustomer, findCustomerById, findAllCustomers, updateCustomerById, deleteCustomerById} = require('./controller/Customer');
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
});

app.post('/stock', async (req, res) => {
    const {product_sku, name, qtde, userLog} = req.body;
    const stock = await saveStock({product_sku,name, qtde, userLog});
    res.status(201).json(stock);
});

app.get('/stock/:id', async(req, res) =>{
    const id = req.params.id;
    const stock = await getStockById(id);
    res.status(201).json(stock);
});

app.get('/stock', async (req, res) => {
    const stock = await getAllStock();
    res.status(201).json(stock);
});


app.put('/stock/:id', async (req, res) => {
    const id = req.params.id;
    const {qtde, userLog} = req.body;
    const stock = await updateStockById(id,{qtde, userLog});
    res.status(201).json(stock);
});

app.delete('/stock/:id', async (req, res) => {
    const id = req.params.id;
    const stock = await deleteStockById(id);
    res.status(201).json(stock)
});

app.post('/customer', async (req, res) => {
    const {firstName, lastName, email, password,cellphone, typePerson, cpf,postcode,address,numberHome} = req.body;
    const customer = await saveCustomer({firstName, lastName, email, password,cellphone, typePerson, cpf,postcode,address,numberHome});
    res.status(201).json(customer);
});

app.get('/customer/:id', async(req, res) =>{
    const id = req.params.id;
    const customer = await findCustomerById(id);
    res.status(201).json(customer);
});

app.get('/customer', async (req, res) => {
    const customer = await findAllCustomers();
    res.status(201).json(customer);
});


app.put('/customer/:id', async (req, res) => {
    const id = req.params.id;
    const {firstName, lastName, email, password,cellphone, typePerson, cpf,postcode,address,numberHome} = req.body;
    const customer = await updateCustomerById(id,{firstName, lastName, email, password,cellphone, typePerson, cpf,postcode,address,numberHome});
    res.status(201).json(customer);
});

app.delete('/customer/:id', async (req, res) => {
    const id = req.params.id;
    const customer = await deleteCustomerById(id);
    res.status(201).json(customer)
});
app.listen(3000);