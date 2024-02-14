const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const WishlistSchema = new Schema({
    name: String,
    place: [String],
})

const WishListSchema = new mongoose.Schema({
    user: {type:mongoose.Schema.Types.ObjectId, required: true},
    board: [WishlistSchema]
});

const WishListModel = mongoose.model('wish_list', WishListSchema);

module.exports = WishListModel;