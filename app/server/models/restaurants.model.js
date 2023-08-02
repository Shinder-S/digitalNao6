module.exports = mongoose => {
  let schema = mongoose.Schema({
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

  schema.method("toJSON", function() {
    const { __v, _id,...object } = this.toObject();
    object._id = _id;
    return object;
  });

  const Restaurants = mongoose.model("restaurants", schema);
  return Restaurants;
};