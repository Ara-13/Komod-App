const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User, Shop } = require('../models');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_jwt_key_here';

exports.registerUser = async (req, res) => {
  try {
    const { phoneNumber, password, name } = req.body;

    if (!phoneNumber || !password) {
      return res.status(400).json({ message: 'Phone number and password are required' });
    }

    const existingUser = await User.findOne({ where: { phoneNumber } });
    if (existingUser) {
      return res.status(400).json({ message: 'Phone number already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      phoneNumber,
      password: hashedPassword,
      name
    });

    const userResponse = { id: user.id, phoneNumber: user.phoneNumber, name: user.name };

    return res.status(201).json({ message: 'User registered successfully', user: userResponse });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;

    const user = await User.findOne({ where: { phoneNumber } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, role: 'user' }, JWT_SECRET, { expiresIn: '7d' });
    return res.json({ token, user: { id: user.id, phoneNumber: user.phoneNumber, name: user.name } });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.registerShop = async (req, res) => {
  try {
    const { name, address, info } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Shop name is required' });
    }

    const shop = await Shop.create({ name, address, info });
    
    // Generate token for shop and store it as login_token
    const token = jwt.sign({ id: shop.id, role: 'shop' }, JWT_SECRET);
    shop.loginToken = token;
    await shop.save();

    return res.status(201).json({ message: 'Shop registered successfully', shop, token });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
