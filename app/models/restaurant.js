module.exports = mongoose => {
    let schema = mongoose.Schema(
      {
        title: String,
        description: String,
        checked: Boolean
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Restaurant = mongoose.model("restaurants", schema);
    return Restaurant;
};