const express =require("express");
const dotenv =require("dotenv");
const mongoose = require("mongoose");
dotenv.config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const UserModel=require("./model/UserModel");
const ProductModel=require("./model/ProductModel")
const OrderModel=require("./model/OrderModel")
const app=express();
const{PORT,DB_USER,DB_PASSWORD,JWT_SECRET} =process.env;
const dbURL=`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.htqbu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
mongoose.connect(dbURL).then(function(connection){
    console.log("Connection Succesful")
})

app.use(express.json())
app.use(cors());

app.post('/dummy', async (req, res) => {
    try {
      const products = [
        {
          "name": "Men's T-Shirt",
          "description": "Comfortable cotton t-shirt for everyday wear.",
          "price": 19.99,
          "rating": 4.5,
          "image": "https://api.deepai.org/job-view-file/61f8b1c8-c3c3-4710-83c6-d65bf71704ab/outputs/output.jpg",
          "stocks": 100,
          "category": "clothing"
        },
        {
          "name": "Laptop - 15.6 inch",
          "description": "High-performance laptop with 8GB RAM and 512GB SSD.",
          "price": 899.99,
          "rating": 4.7,
          "image": "https://images.deepai.org/art-image/5e158e517d7c4ddf84c122bd8bedda35/laptop-15-6-inch.jpg",
          "stocks": 50,
          "category": "electronics"
        },
        {
          "name": "Electric Kettle",
          "description": "1.7L electric kettle with automatic shut-off feature.",
          "price": 29.99,
          "rating": 4.3,
          "image": "https://images.deepai.org/art-image/2fdcd6e7f89f4bb29c0eaad03d0dc31b/electric-kettle-76c07e.jpg",
          "stocks": 75,
          "category": "home appliances"
        },
        {
          "name": "Yoga Mat",
          "description": "Non-slip yoga mat for comfort and support during workouts.",
          "price": 39.99,
          "rating": 4.8,
          "image": "https://images.deepai.org/art-image/2e233bfb624641849c89d9acb447a853/yoga-mat-f87ec7.jpg",
          "stocks": 150,
          "category": "sports"
        },
        {
          "name": "Women's Hoodie",
          "description": "Soft fleece hoodie for chilly days.",
          "price": 49.99,
          "rating": 4.6,
          "image": "https://images.deepai.org/art-image/6a3213083bbf4ef090ef8cc843127d64/women-s-hoodie.jpg",
          "stocks": 120,
          "category": "clothing"
        },
        {
          "name": "Smartphone - 128GB",
          "description": "Latest smartphone with 6.5-inch screen, 128GB storage.",
          "price": 499.99,
          "rating": 4.5,
          "image": "https://images.deepai.org/art-image/8819682e9199462ba57e8b4f1d13bc78/smartphone-f8adef.jpg",
          "stocks": 200,
          "category": "electronics"
        },
        {
          "name": "Blender",
          "description": "300W blender with multiple speed settings and a 1.5L jar.",
          "price": 29.99,
          "rating": 4.4,
          "image": "https://images.deepai.org/art-image/853914c7fa694f9299e2e6c40b8ffa4d/blender-cd21da.jpg",
          "stocks": 80,
          "category": "home appliances"
        },
        {
          "name": "Baseball Bat",
          "description": "Durable baseball bat made from high-quality wood.",
          "price": 59.99,
          "rating": 4.7,
          "image": "https://images.deepai.org/art-image/759b4f0e91b64b22a70b0da2ed04e730/only-baseball-bat-b04fe3.jpg",
          "stocks": 50,
          "category": "sports"
        },
        {
          "name": "Men's Jeans",
          "description": "Stylish denim jeans with a slim fit design.",
          "price": 39.99,
          "rating": 4.6,
          "image": "https://images.deepai.org/art-image/c5bd3b40d7c24490b434869f7081ee8e/only-men-s-jeans.jpg",
          "stocks": 200,
          "category": "clothing"
        },
        {
          "name": "Wireless Headphones",
          "description": "Bluetooth wireless headphones with noise cancellation.",
          "price": 79.99,
          "rating": 4.8,
          "image": "https://images.deepai.org/art-image/19104609c8ce476b87dd31dd6e414647/only-wireless-headphones.jpg",
          "stocks": 60,
          "category": "electronics"
        },
        {
          "name": "Microwave Oven",
          "description": "700W microwave oven with auto cook settings.",
          "price": 89.99,
          "rating": 4.3,
          "image": "https://images.deepai.org/art-image/1a1ee2a2a70340d6b832f8f4bff5a1e5/only-microoven.jpg",
          "stocks": 40,
          "category": "home appliances"
        },
        {
          "name": "Tennis Racket",
          "description": "Lightweight tennis racket with a comfortable grip.",
          "price": 49.99,
          "rating": 4.6,
          "image": "https://images.deepai.org/art-image/51f7c316e58d4583bc2465301281b755/only-tennis-racket.jpg",
          "stocks": 80,
          "category": "sports"
        },
        {
          "name": "Women's Dress",
          "description": "Elegant evening dress for formal occasions.",
          "price": 59.99,
          "rating": 4.7,
          "image": "https://images.deepai.org/art-image/2afc13704e3c4ef2b2d935c3bb395c28/only-women-dress-b3becd.jpg",
          "stocks": 100,
          "category": "clothing"
        },
        {
          "name": "Smartwatch",
          "description": "Fitness tracker with heart rate monitor and GPS.",
          "price": 149.99,
          "rating": 4.5,
          "image": "https://images.deepai.org/art-image/d183c2bb158b4850a1bf67e1826d42f2/smart-watch-118395.jpg",
          "stocks": 120,
          "category": "electronics"
        },
        {
          "name": "Air Purifier",
          "description": "HEPA air purifier with 3-stage filtration system.",
          "price": 199.99,
          "rating": 4.7,
          "image": "https://images.deepai.org/art-image/58de82c1f6e54e6d8d342b001825ac32/air-purifier-0ec5b5.jpg",
          "stocks": 30,
          "category": "home appliances"
        },
        {
          "name": "Boxing Gloves",
          "description": "Premium leather boxing gloves for intense training.",
          "price": 69.99,
          "rating": 4.6,
          "image": "https://images.deepai.org/art-image/2d98d572cf144419a0550b5f5a2a3ad2/boxing-gloves-964850.jpg",
          "stocks": 70,
          "category": "sports"
        },
        {
          "name": "Men's Jacket",
          "description": "Waterproof jacket for outdoor adventures.",
          "price": 89.99,
          "rating": 4.4,
          "image": "https://images.deepai.org/art-image/835b64e810604ffa85dd0ec5fdef8ae6/men-s-jacket-9e4e10.jpg",
          "stocks": 150,
          "category": "clothing"
        },
        {
          "name": "4K Smart TV",
          "description": "55-inch 4K Ultra HD Smart TV with streaming apps.",
          "price": 499.99,
          "rating": 4.9,
          "image": "https://images.deepai.org/art-image/116475d70ecd4be186136157f44651db/smart-tv-44491b.jpg",
          "stocks": 50,
          "category": "electronics"
        },
        {
          "name": "Coffee Maker",
          "description": "Programmable coffee maker with a 12-cup capacity.",
          "price": 39.99,
          "rating": 4.5,
          "image": "https://images.deepai.org/art-image/efb8157c0fe84c94a1efa23aab05de8c/coffe-maker-80c695.jpg",
          "stocks": 60,
          "category": "home appliances"
        },
        {
          "name": "Running Shoes",
          "description": "Lightweight running shoes with cushion support.",
          "price": 69.99,
          "rating": 4.8,
          "image": "https://images.deepai.org/art-image/961da8643a534b71b13b5e11411f54e9/running-shoes-pair.jpg",
          "stocks": 100,
          "category": "sports"
        }
      ]
      
  
      // Insert products into the database
      await ProductModel.insertMany(products);
      res.status(201).json({ message: 'Dummy products added successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

// Signup API
app.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new UserModel({ name, email, password: hashedPassword });

    try {
        await user.save();
        res.status(201).json({ 
            status:"User registered successfully",
            message: user });
    } catch (err) {
        res.status(400).json({ error: 'Email already exists' });
    }
});

// Login API
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) return res.status(400).json({ error: 'User not found' });

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) return res.status(400).json({ error: 'Invalid email or password' });

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '9h' });
    res.json({ message: user, token });
});

// Products API
app.get('/products', async (req, res) => {
  try {
    const products = await ProductModel.find(); // Fetch all products
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching products: ' + error.message });
  }
});

//Single Product API
app.get('/product/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const product = await ProductModel.findById(id); // Fetch product by ID
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching product: ' + error.message });
  }
});

//Add orders
app.post('/orders', async (req, res) => {
  try {
    const { userId, products, totalAmount } = req.body;
    
    // Find the user to make sure they exist
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create a new order
    const order = new OrderModel({
      userId,
      products,
      totalAmount,
    });

    await order.save();
    res.status(201).json({ message: 'Order placed successfully', order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error placing order' });
  }
});

// API to fetch order details for a user
app.get('/orders/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Find all orders for the given user
    const orders = await OrderModel.find({ userId });

    if (!orders) {
      return res.status(404).json({ error: 'No orders found for this user' });
    }

    res.status(200).json({ orders });
  } catch (error) {
    console.error('Error fetching order details:', error);
    res.status(500).json({ error: 'Failed to fetch order details' });
  }
});

app.listen(PORT,function(req,res){
    console.log(`Server is running at this port ${PORT}`);
})