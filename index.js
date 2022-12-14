const express = require('express')
const mongoose = require('mongoose')
const authRouter = require('./routes/authRouter')
const productRouter = require('./routes/productRouter')
const brandsRouter = require('./routes/brandsRouter')
const categoriesRouter = require('./routes/categoriesRouter')
const reviewRouter = require('./routes/reviewRouter')
const orderRouter = require('./routes/orderRouter')
const bodyParser = require('body-parser')
const cors = require('cors')
const PORT = process.env.PORT || 2000

const app = express()
app.use(bodyParser.raw({limit: '200mb', extended: true}));
app.use(bodyParser.json({limit: '200mb'}));
app.use(bodyParser.urlencoded({extended: true,  limit: '200mb', parameterLimit: 200000}));

app.use(cors())
app.use(express.json())
app.use(express.static('static'))
app.use('/authUser', authRouter)
app.use('/products', productRouter)
app.use('/brands', brandsRouter)
app.use('/categories', categoriesRouter)
app.use('/review', reviewRouter)
app.use('/order', orderRouter)

const start = async () => {
    try {
        await mongoose.connect(`mongodb+srv://PomPushka:zx12zx12@cloza.6sbglbk.mongodb.net/authUser?retryWrites=true&w=majority`)
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (error) {
        console.log(error);
    }
}

start()