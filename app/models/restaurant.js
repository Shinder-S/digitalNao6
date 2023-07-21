const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  adress: {
    building: { type: String },
    coord: { type: [Number] },
    street: { type: String },
    zipcode: { type: String }
  },  
  borough: { type: String },
  cuisine: { type: String },
  image: { type: String },
  schedule: { type: String },
  grades: [{
    date: { type: Date },
    score: { type: Number }
  }],
  comments: [{
    date: { type: Date },
    comment: { type: String }
  }]
});

module.exports = mongoose.model('Restaurant', restaurantSchema);