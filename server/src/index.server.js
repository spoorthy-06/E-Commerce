const env = require('dotenv')
env.config()
const express = require('express');
const app = express();

const mongoose = require('mongoose');

const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin/auth');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const cartRoutes = require('./routes/cart');
const path = require('path');
const cors = require('cors');


mongoose.connect(

    `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.xguyy.mongodb.net/ecommerce?retryWrites=true&w=majority`,

    {
        useNewUrlParser: true,
        useUnifiedTopology: true,

    }
).then(() => {
    console.log('Database Connected');
});


env.config();

app.use(cors());
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'uploads')));
app.use('/api', authRoutes);
app.use('/api', adminRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use('/api', cartRoutes);



app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});