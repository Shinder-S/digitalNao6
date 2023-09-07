const db = require("../models");
const Restaurant = db.restaurants;

// Function to handle common error responses
function handleError(res, err) {
  res.status(500).send({
    message: err.message || "Some error occurred.",
  });
}

// Create and Save a new Restaurant
exports.create = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).send({ message: "Content can not be empty!" });
    }

    const restaurant = new Restaurant(req.body);
    const data = await restaurant.save();

    res.send(data);
  } catch (err) {
    handleError(res, err);
  }
};

// Retrieve all Restaurants from the database.
exports.findAll = async (req, res) => {
  try {
    const title = req.query.title;
    const condition = title
      ? { title: { $regex: new RegExp(title), $options: "i" } }
      : {};

    const data = await Restaurant.find(condition);
    res.send(data);
  } catch (err) {
    handleError(res, err);
  }
};

// Find a single Restaurant with an id
exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Restaurant.findById(id);

    if (!data) {
      return res.status(404).send({ message: "Not found Restaurant with id " + id });
    }

    res.send(data);
  } catch (err) {
    handleError(res, err);
  }
};

// Find Restaurant by name
exports.findByName = async (req, res) => {
  try {
    const name = req.query.name;
    const condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

    const data = await Restaurant.find(condition);
    res.send(data);
  } catch (err) {
    handleError(res, err);
  }
};

// Find Restaurant by cuisine
exports.findByCuisine = async (req, res) => {
  try {
    const cuisine = req.query.cuisine;
    const condition = cuisine
      ? { cuisine: { $regex: new RegExp(cuisine), $options: "i" } }
      : {};

    const data = await Restaurant.find(condition);
    res.send(data);
  } catch (err) {
    handleError(res, err);
  }
};

// Find Restaurant by name & cuisine
exports.findByNameAndCuisine = async (req, res) => {
  try {
    const name = req.query.name;
    const cuisine = req.query.cuisine;
    const condition_name = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};
    const condition_cuisine = cuisine
      ? { cuisine: { $regex: new RegExp(cuisine), $options: "i" } }
      : {};

    const data = await Restaurant.find({ $or: [condition_name, condition_cuisine] });
    res.send(data);
  } catch (err) {
    handleError(res, err);
  }
};

// Update a Restaurant by the id in the request
exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const { body } = req;

    if (!body) {
      return res.status(400).send({ message: "Data to update can not be empty!" });
    }

    const data = await Restaurant.findByIdAndUpdate(id, body, { useFindAndModify: false });

    if (!data) {
      return res.status(404).send({ message: `Cannot update Restaurant with id=${id}. Maybe Restaurant was not found!` });
    }

    res.send({ message: "Restaurant was updated successfully." });
  } catch (err) {
    handleError(res, err);
  }
};

// Find restaurants near a specific location
exports.findNearbyRestaurants = async (req, res) => {
  try {
    const { latitude, longitude, maxDistance } = req.query;

    if (!latitude || !longitude) {
      return res.status(400).send({ message: "Latitude and longitude are required!" });
    }

    // Parse coordinates and max distance from the request
    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);
    const distance = parseInt(maxDistance) || 5; // Default to 5 km if maxDistance is not provided

    // Perform the geospatial query to find nearby restaurants
    const data = await Restaurant.aggregate([
      {
        $geoNear: {
          near: { type: 'Point', coordinates: [lon, lat] },
          distanceField: 'distance',
          maxDistance: distance * 1000, // Convert distance to meters
          spherical: true,
        },
      },
    ]);

    res.send(data);
  } catch (err) {
    handleError(res, err);
  }
};

// Delete a Restaurant with the specified id in the request
exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Restaurant.findByIdAndRemove(id, { useFindAndModify: false });

    if (!data) {
      return res.status(404).send({ message: `Cannot delete Restaurant with id=${id}. Maybe Restaurant was not found!` });
    }

    res.send({ message: "Restaurant was deleted successfully!" });
  } catch (err) {
    handleError(res, err);
  }
};

// Delete all Restaurants from the database.
exports.deleteAll = async (req, res) => {
  try {
    const data = await Restaurant.deleteMany({});
    res.send({ message: `${data.deletedCount} Restaurants were deleted successfully!` });
  } catch (err) {
    handleError(res, err);
  }
};
