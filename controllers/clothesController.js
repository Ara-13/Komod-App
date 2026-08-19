const { Clothes } = require('../models');

exports.addCloth = async (req, res) => {
  try {
    const { type, link, image } = req.body;
    const { id, role } = req.auth;

    if (!type) {
      return res.status(400).json({ message: 'Type of clothing is required' });
    }

    let clothData = { type, link, image };

    if (role === 'user') {
      clothData.userId = id;
    } else if (role === 'shop') {
      clothData.shopId = id;
    } else {
      return res.status(403).json({ message: 'Unauthorized role' });
    }

    const cloth = await Clothes.create(clothData);
    return res.status(201).json({ message: 'Cloth added successfully', cloth });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.getCloset = async (req, res) => {
  try {
    const { id, role } = req.auth;
    let clothes;

    if (role === 'user') {
      clothes = await Clothes.findAll({ where: { userId: id } });
    } else if (role === 'shop') {
      clothes = await Clothes.findAll({ where: { shopId: id } });
    } else {
      return res.status(403).json({ message: 'Unauthorized role' });
    }

    return res.json({ clothes });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.incrementWear = async (req, res) => {
  try {
    const { id } = req.params;
    const { id: userId, role } = req.auth;

    if (role !== 'user') {
      return res.status(403).json({ message: 'Only users can wear clothes' });
    }

    const cloth = await Clothes.findOne({ where: { id, userId } });
    if (!cloth) {
      return res.status(404).json({ message: 'Cloth not found in your closet' });
    }

    cloth.wearCount += 1;
    await cloth.save();

    return res.json({ message: 'Wear count incremented', wearCount: cloth.wearCount });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
