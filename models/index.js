const sequelize = require('../config/database');
const User = require('./User');
const Shop = require('./Shop');
const Clothes = require('./Clothes');
const Category = require('./Category');
const Theme = require('./Theme');
const Meeting = require('./Meeting');
const Suggest = require('./Suggest');

// ==========================================
// 1. User & Clothes (Closet / Owner)
// ==========================================
User.hasMany(Clothes, { foreignKey: 'userId', as: 'closet' });
Clothes.belongsTo(User, { foreignKey: 'userId', as: 'userOwner' });

// ==========================================
// 2. Shop & Clothes (Shop Catalog)
// ==========================================
Shop.hasMany(Clothes, { foreignKey: 'shopId', as: 'clothes' });
Clothes.belongsTo(Shop, { foreignKey: 'shopId', as: 'shopOwner' });

// ==========================================
// 3. User & Category (Interests - Many to Many)
// ==========================================
User.belongsToMany(Category, { 
  through: 'UserInterests', 
  as: 'interests', 
  foreignKey: 'user_id', 
  otherKey: 'category_id' 
});
Category.belongsToMany(User, { 
  through: 'UserInterests', 
  as: 'interestedUsers', 
  foreignKey: 'category_id', 
  otherKey: 'user_id' 
});

// ==========================================
// 4. User Self-referencing (Friends - Many to Many)
// ==========================================
User.belongsToMany(User, { 
  through: 'UserFriends', 
  as: 'friends', 
  foreignKey: 'user_id', 
  otherKey: 'friend_id' 
});

// ==========================================
// 5. Clothes & Category (Many to Many)
// ==========================================
Clothes.belongsToMany(Category, { 
  through: 'ClothesCategories', 
  as: 'categories', 
  foreignKey: 'clothes_id', 
  otherKey: 'category_id' 
});
Category.belongsToMany(Clothes, { 
  through: 'ClothesCategories', 
  as: 'clothes', 
  foreignKey: 'category_id', 
  otherKey: 'clothes_id' 
});

// ==========================================
// 6. Clothes & Theme (Many to Many)
// ==========================================
Clothes.belongsToMany(Theme, { 
  through: 'ClothesThemes', 
  as: 'themes', 
  foreignKey: 'clothes_id', 
  otherKey: 'theme_id' 
});
Theme.belongsToMany(Clothes, { 
  through: 'ClothesThemes', 
  as: 'clothes', 
  foreignKey: 'theme_id', 
  otherKey: 'clothes_id' 
});

// ==========================================
// 7. Clothes Seen-By Users (Many to Many)
// ==========================================
Clothes.belongsToMany(User, { 
  through: 'ClothesSeenBy', 
  as: 'seenBy', 
  foreignKey: 'clothes_id', 
  otherKey: 'user_id' 
});
User.belongsToMany(Clothes, { 
  through: 'ClothesSeenBy', 
  as: 'seenClothes', 
  foreignKey: 'user_id', 
  otherKey: 'clothes_id' 
});

// ==========================================
// 8. Theme & Category (Many to Many)
// ==========================================
Theme.belongsToMany(Category, { 
  through: 'ThemeCategories', 
  as: 'categories', 
  foreignKey: 'theme_id', 
  otherKey: 'category_id' 
});
Category.belongsToMany(Theme, { 
  through: 'ThemeCategories', 
  as: 'themes', 
  foreignKey: 'category_id', 
  otherKey: 'theme_id' 
});

// ==========================================
// 9. Meeting & Theme (One to Many)
// ==========================================
Meeting.belongsTo(Theme, { foreignKey: 'themeId', as: 'theme' });
Theme.hasMany(Meeting, { foreignKey: 'themeId', as: 'meetings' });

// ==========================================
// 10. Meeting & User (Friends Attending - Many to Many)
// ==========================================
Meeting.belongsToMany(User, { 
  through: 'MeetingFriends', 
  as: 'friends', 
  foreignKey: 'meeting_id', 
  otherKey: 'user_id' 
});
User.belongsToMany(Meeting, { 
  through: 'MeetingFriends', 
  as: 'meetings', 
  foreignKey: 'user_id', 
  otherKey: 'meeting_id' 
});

// ==========================================
// 11. Suggest & User (One to Many)
// ==========================================
Suggest.belongsTo(User, { foreignKey: 'userId', as: 'user' });
User.hasMany(Suggest, { foreignKey: 'userId', as: 'suggestions' });

// ==========================================
// 12. Suggest & Meeting (One to Many)
// ==========================================
Suggest.belongsTo(Meeting, { foreignKey: 'meetingId', as: 'meeting' });
Meeting.hasMany(Suggest, { foreignKey: 'meetingId', as: 'suggestions' });

// ==========================================
// 13. Suggest & Clothes (Clothes IDs - Many to Many)
// ==========================================
Suggest.belongsToMany(Clothes, { 
  through: 'SuggestClothes', 
  as: 'clothes', 
  foreignKey: 'suggest_id', 
  otherKey: 'clothes_id' 
});
Clothes.belongsToMany(Suggest, { 
  through: 'SuggestClothes', 
  as: 'suggestions', 
  foreignKey: 'clothes_id', 
  otherKey: 'suggest_id' 
});

module.exports = {
  sequelize,
  User,
  Shop,
  Clothes,
  Category,
  Theme,
  Meeting,
  Suggest
};
