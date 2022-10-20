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
app.use(express.static('public'));
app.use(cors({origin:['https://new-aiycashier.netlify.app','http://localhost:8080']}))

// router
const regRouter = require('./router/register');
const logRouter = require('./router/login');
const transRouter = require('./router/transaksi');
const itemRouter = require('./router/Item');
const employRouter = require('./router/employe');
const shopRouter = require('./router/shop');
const tokenRouter = require('./router/Token');
const userRouter = require('./router/user');
const chartRouter = require('./router/chart');
const uploadRouter = require('./router/upload');

app.use('/register',regRouter)
app.use('/login',logRouter)
app.use('/transaksi',transRouter)
app.use('/items',itemRouter)
app.use('/employe',employRouter)
app.use('/shop',shopRouter)
app.use('/chart',chartRouter)
app.use('/user',userRouter)
app.use('/upload',uploadRouter)
app.use('/',tokenRouter)

app.listen(port,() => console.log(`server is running on port ${port}`))