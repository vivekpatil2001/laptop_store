import express from "express";

import mongoose, { model, Schema } from "mongoose";

const app = express();

app.use(express.json());
import dotenv from "dotenv";
dotenv.config();

const PORT = 5000;

const connectMongoDB = async () => {
    const conn = await mongoose.connect(process.env.MONGODB_URI)

    if (conn) {
        console.log('MongoDB connected succesfully')
    }
}
connectMongoDB();

const productschema = new Schema({
    name: String,
    description: String,
    price: String, 
    brand: String
})
const Product = model('Product', productschema);

app.get('/products', async (req, res) => {

    const products = await Product.find();

    res.json({
        success: true,
        data: products,
        message: "succesfully fetch all products",
    })
});

app.post('/product', async (req, res) => {
    const { name,description,price,brand} = req.body;

    const prod = new Product({

        name: name,
        description: description,
        price: price,
         brand: brand,
    })
    const savedproduct = await prod.save();

    res.json({
        success:true,
        data:savedproduct,
        message:'succefully added all product'
    }) 
});

app.get('/product', async(req,res)=>{
    const {email} = req.query;

    const product = await Product.findOne({email: email})

    res,json({
        success:true,
        data:product,
        message:'succesfully find new product'
    })
})
 
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
});