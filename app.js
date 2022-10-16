const express = require('express');
const app = express();
const cors = require('cors')

// port
require('dotenv').config()
const port = process.env.PORT

// db
require('./config/db')

// middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({origin:'https://new-aiycashier.netlify.app'}))

// router
const regRouter = require('./router/register');
const logRouter = require('./router/login');
const transRouter = require('./router/transaksi');
const itemRouter = require('./router/Item');
const employRouter = require('./router/employe');
const shopRouter = require('./router/shop');
const tokenRouter = require('./router/Token');
const userRouter = require('./router/user');

app.use('/register',regRouter)
app.use('/login',logRouter)
app.use('/transaksi',transRouter)
app.use('/items',itemRouter)
app.use('/employe',employRouter)
app.use('/shop',shopRouter)
app.use('/',tokenRouter)
app.use('/user',userRouter)

app.listen(port,() => console.log(`server is running on port ${port}`))