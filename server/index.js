const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
const conn = require("./conn");
// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
// mongoose.connect('mongodb://0.0.0.0:27017/mydatabase34', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
conn();

const ItemSchema = new mongoose.Schema({
  name: String,
  description: String,
});

const Item = mongoose.model('Item', ItemSchema);

// API endpoint to save data
app.post('/api/items', async (req, res) => {
  try {
    const newItem = new Item(req.body);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: 'Error saving item' });
  }
});

// API endpoint to retrieve data
app.get('/api/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving items' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});