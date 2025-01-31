var jwt = require('jsonwebtoken');
require('dotenv').config();

function createTokenMiddleware(data){
    try{
        let token = jwt.sign({exp: Math.floor(Date.now() / 1000 * (60*60)), data }, process.env.PRIVATE_KEY); // token valido por 1h
        return token;
    } catch(e){
        console.log(e)
    }

}


function headersVerificationMiddleware(req, res, next) {
    if (!req.headers.token) {
        return res.status(401).json({ auth: "failed", message: "Invalid Request" });
    }

    try {
        jwt.verify(req.headers.token, process.env.PRIVATE_KEY);
        next();
    } catch (e) {
        console.error("Erro na verificação do token:", e.message);
        return res.status(401).json({ auth: "failed", message: "Invalid Token" });
    }
}
  
module.exports = {createTokenMiddleware,headersVerificationMiddleware};