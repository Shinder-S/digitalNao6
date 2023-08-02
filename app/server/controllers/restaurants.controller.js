const db = require("../models");
const Restaurant = db.restaurants;

// Create and Save a new Restaurant
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const restaurant = new Restaurant(req.body);

  // Save Restaurant in the database
  restaurant
    .save(restaurant)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Restaurant."
      });
    });
};

// Retrieve all Restaurants from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  Restaurant.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving restaurants."
      });
    });
};

// Find a single Restaurant with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Restaurant.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Restaurant with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Restaurant with id=" + id });
    });
};

// Find Restaurant by name
exports.findByName = (req, res) => {
  
  const name = req.query.name;

  var condition_name = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

  Restaurant.find(condition_name)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving restaurants."
      });
    });
};

// Find Restaurant by name
exports.findByName = (req, res) => {
  
  const name = req.query.name;

  var condition_name = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

  Restaurant.find(condition_name)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving restaurants."
      });
    });
};

// Find Restaurant by cuisine
exports.findByCuisine = (req, res) => {

  const cuisine = req.query.cuisine;

  var condition_cuisine = cuisine ? { cuisine: { $regex: new RegExp(cuisine), $options: "i" } } : {};

  Restaurant.find(condition_cuisine)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving restaurants."
      });
    });
};

// Find Restaurant by name & cuisine
exports.findByNameAndCuisine = (req, res) => {
  
  const name = req.query.name;
  const cuisine = req.query.cuisine;

  var condition_name = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};
  var condition_cuisine = cuisine ? { cuisine: { $regex: new RegExp(cuisine), $options: "i" } } : {};

  Restaurant.find({$or:[condition_name,condition_cuisine]})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving restaurants."
      });
    });
};

// Update a Restaurant by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Restaurant.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Restaurant with id=${id}. Maybe Restaurant was not found!`
        });
      } else res.send({ message: "Restaurant was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Restaurant with id=" + id
      });
    });
};

// Delete a Restaurant with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Restaurant.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Restaurant with id=${id}. Maybe Restaurant was not found!`
        });
      } else {
        res.send({
          message: "Restaurant was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Restaurant with id=" + id
      });
    });
};

// Delete all Restaurants from the database.
exports.deleteAll = (req, res) => {
  Restaurant.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Restaurants were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all restaurants."
      });
    });
};

// Find all checked Restaurants
exports.findAllChecked = (req, res) => {
  Restaurant.find({ checked: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving restaurants."
      });
    });
};

// Find a Restaurants by name
exports.findByName = (req, res) => {
  const name = req.query.name;
  let condition = { "name": { $regex: '.*' + name + '.*' } };

  Restaurant.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving restaurants."
      });
    });
};